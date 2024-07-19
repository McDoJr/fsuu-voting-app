const DataTable = require('../data-query.js');
const nodemailer = require('nodemailer');
const MailGen = require('mailgen');
const { EMAIL, PASSWORD } = require('../env.js');
const {connection} = require("../database.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const crypto = require('crypto');

const hashPassword = (password, callback) => {
    bcrypt.hash(password, saltRounds, (error, hash) => {
        if(error) throw error;
        return callback(hash);
    })
}

const login = async (req, res) => {
    const {email, password, is_google} = req.body;
    let table = new DataTable(connection, "voters");
    table.findOne({email}, (result) => {
        if(!result) {
            return res.json({
                status: false,
                message: "Gmail not registered"
            });
        }
        // If using google signin
        if(is_google) {
            return res.json({status: true, data: result, message: "Login successfully"});
        }else if(result.is_google === 'yes') { // If account was registered using google sign in but login manually
            return res.json({status: false, message: "Failed to login!"});
        }

        bcrypt.compare(password, result.password, (error, data) => {
            if(error) throw error;
            let form = {
                status: false,
                message: "Invalid Password"
            }
            if(data) {
                form = {status: true, data: result, message: "Login successfully"};
            }
            return res.json(form);
        })
    })
}

const register = async (req, res) => {
    const { student_id, firstname, lastname, course, year, email, password, department, is_google, picture } = req.body;
    let table = new DataTable(connection, "voters");

    table.findOne({email}, (result) => {
        // Check if email already exist
        if(result) {
            return res.json({status: false, message: "Gmail was already registered"});
        }

        let datas = {student_id ,firstname, lastname, course, year, email, password, department, is_google, picture};

        hashPassword(password, (hash) => {
            table.insert({...datas, password: hash}, (result) => {
                return res.json({status: true, message: "Registration success", data: result});
            })
        })
    })
}

const signup = async (req, res) => {
    const { email } = req.body;
    let table = new DataTable(connection, "voters");
    table.findOne({email}, result => {
        if(result) {
            return res.json({status: false, message: "GSuite was already registered"});
        }
        return res.json({status: true, message: "Proceed to verification"});
    })
}

const updateProfile = async (req, res) => {
    const {email, student_id, course, year, department} = req.body;
    let table = new DataTable(connection, "voters");
    table.update({student_id, course, year, department}, {email}, result => {
        if(result.changedRows > 0) {
            return res.json({status: true, message: "Profile updated successfully"});
        }else{
            return res.json({status: false, message: "Update failed!"});
        }
    })
}

const deleteData = async (req, res) => {
    const { signed_request } = req.body;

    if (!signed_request) {
        return res.status(400).send('Bad Request');
    }
    const [encoded_sig, payload] = signed_request.split('.');
    const sig = Buffer.from(encoded_sig, 'base64').toString('hex');
    const data = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'));

    const expected_sig = crypto
        .createHmac('sha256', APP_SECRET)
        .update(payload)
        .digest('hex');

    if (sig !== expected_sig) {
        return res.status(400).send('Bad Request');
    }

    // Handle the deletion of user data from your system
    // You would typically delete the user's data from your database here

    const response = {
        url: 'http://localhost:8081/data-deletion-status', // URL to show deletion status
        confirmation_code: data.user_id // Unique code to confirm the deletion request
    };
    res.json(response);
}

const verification = async (req, res) => {

    const {email} = req.body;


    let config = {
        service: "gmail",
        auth: {
            user: EMAIL,
            pass: PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    }

    let transporter = nodemailer.createTransport(config);

    const otp = Math.floor(100000 + Math.random() * 900000);

    let message = {
        from: EMAIL,
        to: `${email}`,
        subject: "OTP VerificationPage",
        html: `<b>${otp} <br/>Use this OTP to create your account @fsuu-voting-system.com.</b>`
    }

    transporter.sendMail(message).then((info) => {
        return res.status(201).json({
            data: "You should received an email!",
            otp: `${otp}`,
            info: info.messageId,
            preview: nodemailer.getTestMessageUrl(info)
        })
    }).catch(error => {
        console.log("Error", error.message);
        return res.status(500).json({ error });
    });
}

module.exports = { login, signup, register, verification, updateProfile, deleteData }