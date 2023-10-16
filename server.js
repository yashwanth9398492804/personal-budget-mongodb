const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const mongoose = require("mongoose");

const budgetSchema = require("./models/budget_schema");

let url = 'mongodb://127.0.0.1:27017/personal_budget';

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("connected to database");
            budgetSchema.find({})
                .then((data) => {
                    // console.log(data);
                    res.send(data);
                    mongoose.connection.close();
                })
                .catch((connectionError) => {
                    console.log(connectionError)
                })
        })
        .catch((connectionError) => {
            console.log(connectionError);
        })
});

app.post("/insertBudget", (req, res) => {

    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            // Insert
            console.log("connected to database to insert data");
            let newData = new budgetSchema(req.body);
            budgetSchema.insertMany(newData)
                .then((data) => {
                    res.send("Data Inserted into database Successfully")
                    mongoose.connection.close();
                })
                .catch((connectionError) => {
                    console.log("1", connectionError)
                    res.send(connectionError.message)
                })
        })
        .catch((connectionError) => {
            console.log("2", connectionError)
            res.send(connectionError);
        })
})


app.listen(port, () => {
    console.log('Example app listening at http://localhost:3000');
});