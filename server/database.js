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
    const sql = (
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

    connection.query(sql, (error) => {
       if(error) throw error;
    });
}

module.exports = {
    connection,
    initTables,
    connect
}