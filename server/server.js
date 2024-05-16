const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/authRouter.js');
const adminRouter = require('./routes/adminRouter.js');
const database = require('./database.js');

const app = express();
app.use(cors());
app.use(express.json());

database.connect();

app.use('/api/users', authRouter);
app.use('/api/admin', adminRouter);

app.listen(8081, () => console.log("Server has been enabled!"));