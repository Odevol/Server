import { saveTransaction } from "./SaveTransactionService";

const express = require("express");

const app = express();
const jsonParser = express.json();

const urlencodedParser = express.urlencoded({extended: false});

app.post("/api/transaction", jsonParser, (req,res)=>{
    saveTransaction({value: req.body.value, category: req.body.category});
    console.log(req.body);
    res.sendStatus(200);
})
app.listen(3000);