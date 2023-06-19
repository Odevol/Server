import { deleteTransaction, findTransaction, getReportByCategory, saveTransaction, sortByDate } from "./PaymentTransactionService";

const express = require("express");

const app = express();
const jsonParser = express.json();

const urlencodedParser = express.urlencoded({extended: false});

app.post("/api/transaction", jsonParser, (req,res)=>{
    saveTransaction({value: req.body.value, category: req.body.category});
    res.sendStatus(200);
})

app.delete("/api/transaction", jsonParser, async (req, res)=>{
    const result = await deleteTransaction(req.body.id);
    if(result) res.sendStatus(200);
    else {
        res.status(200).send("Transaction is not found");
    }
})

app.get("/api/transaction", jsonParser, async (res, req)=> {
    const result = await findTransaction(res.body.id);
    if(result) req.status(200).send(result);
    else {
        req.status(200).send("Transaction is not found");
    }
})

app.get("/api/sortByDate", jsonParser, async (res, req)=>{
    const result = await sortByDate({dateFrom: res.body.dateFrom, dateTo: res.body.dateTo});
    req.status(200).send(result);
})

app.get("/api/reportByCategory", jsonParser, async (res, req)=>{
    const result = await getReportByCategory({dateFrom: res.body.dateFrom, dateTo: res.body.dateTo});
    req.status(200).send(result);
})
app.listen(3000);