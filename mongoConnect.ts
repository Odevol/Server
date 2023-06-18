import { PaymentTransaction } from "./PaymentTransaction";

const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient("mongodb://127.0.0.1:27017/");

async function addTransactionToDB(transaction: PaymentTransaction){
    try {
        await client.connect();
        const db = client.db("TransactionsDB");
        const collection = db.collection("TransactionsCollection");
        await collection.insertOne(transaction);
    }catch(err){
        console.log(err);
    } finally{
        await client.close();
    };
}

export {addTransactionToDB}