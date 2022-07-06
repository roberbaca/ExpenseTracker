require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');

app.use( bodyParser.urlencoded( {extended: true }));
app.use( bodyParser.json() );
app.use( cors() );

const expensesRouter = require("./routes/expense");
const categoriesRouter = require("./routes/category");
const authRouter = require("./routes/auth");

app.use("/api/expenses", expensesRouter);
app.use("/api/category", categoriesRouter);
app.use("/api/auth", authRouter);

app.use( (req, res) => {
    res.statusCode = 404;
    res.send();    
});

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
    console.log(`🚀 Server ready at: http://localhost:${PORT} ⭐️`);
});