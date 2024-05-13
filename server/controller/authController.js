const DataTable = require('../data-query.js');
const nodemailer = require('nodemailer');
const MailGen = require('mailgen');
const { EMAIL, PASSWORD } = require('../env.js');
const {connection} = require("../database.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = (password, callback) => {
    bcrypt.hash(password, saltRounds, (error, hash) => {
        if(error) throw error;
        return callback(hash);
    })
}

const login = async (req, res) => {
    const {email, password} = req.body;
    let table = new DataTable(connection, "voters");
    table.findOne({email}, (result) => {
        if(!result) {
            return res.json({
                status: false,
                message: "GSuite not registered"
            });
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
    const { student_id, firstname, lastname, course, year, email, password, department } = req.body;
    let table = new DataTable(connection, "voters");

    table.findOne({email}, (result) => {
        // Check if email already exist
        if(result) {
            return res.json({status: false, message: "GSuite was already registered"});
        }

        let datas = {student_id ,firstname, lastname, course, year, email, password, department};

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

const verification = async (req, res) => {

    const {email} = req.body;

    let config = {
        service: "gmail",
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    const otp = Math.floor(100000 + Math.random() * 900000);

    let message = {
        from: EMAIL,
        to: `iamkbejjjr@gmail.com, iamkbej@gmail.com, ${email}`,
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
        return res.status(500).json({ error });
    });
}

module.exports = { login, signup, register, verification }