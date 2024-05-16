const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'voters'
});

const connect = () => {
    connection.connect(error => {
        if(error) throw error;
        initTables();
        console.log('Connected to database!')
    });
}

const initTables = () => {
    const voters = (
        `CREATE TABLE IF NOT EXISTS voters (
            student_id varchar(255) not null,
            firstname varchar(255) not null,
            lastname varchar(255) not null,
            course varchar(255) not null,
            year varchar(255) not null,
            email varchar(255) not null,
            password varchar(255) not null,
            department varchar(255) not null,
            PRIMARY KEY (student_id)
         )`
    )

    const executive = (
        `CREATE TABLE IF NOT EXISTS executive (
            uid int not null AUTO_INCREMENT,
            firstname varchar(255) not null,
            lastname varchar(255) not null,
            student_id varchar(255) not null,
            position varchar(255) not null,
            year varchar(255) not null,
            PRIMARY KEY (uid)
         )`
    )

    const local = (
        `CREATE TABLE IF NOT EXISTS local (
            uid int not null AUTO_INCREMENT,
            firstname varchar(255) not null,
            lastname varchar(255) not null,
            student_id varchar(255) not null,
            position varchar(255) not null,
            department varchar(255) not null,
            year varchar(255) not null,
            PRIMARY KEY (uid)
         )`
    )

    const nominees = (
        `CREATE TABLE IF NOT EXISTS nominees (
            uid int not null AUTO_INCREMENT,
            firstname varchar(255) not null,
            lastname varchar(255) not null,
            student_id varchar(255) not null,
            type varchar(255) not null,
            position varchar(255) not null,
            department varchar(255) not null,
            year varchar(255) not null,
            votes int not null,
            PRIMARY KEY (uid)
         )`
    )

    const history = (
        `CREATE TABLE IF NOT EXISTS history (
            id int not null AUTO_INCREMENT,
            student_id varchar(255) not null,
            department varchar(255) not null,
            date varchar(255) not null,
            PRIMARY KEY (id)
         )`
    )

    connection.query(voters, (error) => {
       if(error) throw error;
    });
    connection.query(history, (error) => {
        if(error) throw error;
    });
    connection.query(nominees, (error) => {
        if(error) throw error;
    });
}

module.exports = {
    connection,
    initTables,
    connect
}