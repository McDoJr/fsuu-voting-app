const DataTable = require('../data-query.js');
const {connection} = require("../database.js");

const registerNominee = async (req, res) => {
    const { student_id, firstname, lastname, year, type, department, position } = req.body;
    let table = new DataTable(connection, "nominees");

    table.findOne({student_id}, (result) => {
        // Check if student id already exist
        if(result) {
            return res.json({status: false, message: "Student ID was already registered"});
        }

        let datas = {firstname, lastname, student_id, type, position, department, year, votes: 0};

        table.insert(datas, (result) => {
            return res.json({status: true, message: "Registration success", data: result});
        })
    })
}

const getExecutives = async (req, res) => {
    let table = new DataTable(connection, "nominees");

    table.findSome({type: "executive"}, (result) => {
        return res.json({status: true, message: "Executives has been fetched!", data: result});
    })
}

const getLocal = async (req, res) => {
    const {department} = req.body;
    let table = new DataTable(connection, "nominees");

    table.findSome({type: "local", department}, (result) => {
        return res.json({status: true, message: "Locals has been fetched!", data: result});
    })
}

const getAllLocal = async (req, res) => {
    let table = new DataTable(connection, "nominees");

    table.findSome({type: "local"}, (result) => {
        return res.json({status: true, message: "Locals has been fetched!", data: result});
    })
}

const getAll = async (req, res) => {
    let table = new DataTable(connection, "nominees");

    table.findAll((result) => {
        return res.json({status: true, message: "Locals has been fetched!", data: result});
    })
}

const registerExecutive = async (req, res) => {
    const { student_id, firstname, lastname, year, position } = req.body;
    let table = new DataTable(connection, "executive");

    table.findOne({student_id}, (result) => {
        // Check if student id already exist
        if(result) {
            return res.json({status: false, message: "Student ID was already registered"});
        }

        let datas = {firstname, lastname, student_id, position, year};

        table.insert(datas, (result) => {
            return res.json({status: true, message: "Registration success", data: result});
        })
    })
}

const registerLocal = async (req, res) => {
    const { student_id, firstname, lastname, year, position, department } = req.body;
    let table = new DataTable(connection, "local");

    table.findOne({student_id}, (result) => {
        // Check if student id already exist
        if(result) {
            return res.json({status: false, message: "Student ID was already registered"});
        }

        let datas = {firstname, lastname, student_id, position, department, year};

        table.insert(datas, (result) => {
            return res.json({status: true, message: "Registration success", data: result});
        })
    })
}

const updateNominee = async (req, res) => {
    const {result, student_id, department, date} = req.body;
    const list = [];
    const condition = [];
    for(const data of result) {
        list.push({uid: data.uid, votes: data.votes})
        condition.push({uid: data.uid})
    }
    let table = new DataTable(connection, "nominees");
    table.updateVotes(list, condition, (result) => {
        if(result) {
            table.setTable("history");
            table.insert({student_id, department, date}, (s) => {
                if(s) return res.json({status: true, message: "Registration success", data: result});
            })
        }
    })
}

const getAllVoters = async (req, res) => {
    let table = new DataTable(connection, "voters");
    table.findAll((result) => {
        return res.json({status: true, message: "Voters has been fetched!", data: result});
    })
}

const addHistory = async (req, res) => {
    const {student_id, type, department, position, uid} = req.body;
    let table = new DataTable(connection, "history");
    table.insert({student_id, type, department, position, uid}, (result) => {
        return res.json({status: true, message: "History has been updated!", data: result});
    })
}

const getHistory = async (req, res) => {
    let table = new DataTable(connection, "history");
    table.findAll((result) => {
        return res.json({status: true, message: "History has been fetched!", data: result});
    })
}

module.exports = {registerExecutive, registerLocal, registerNominee, getExecutives, getLocal, getAllLocal, getAll, updateNominee, getAllVoters, getHistory, addHistory}