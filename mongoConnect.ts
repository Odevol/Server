import { PaymentTransaction } from "./PaymentTransaction";

const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient("mongodb://127.0.0.1:27017/");

async function addTransactionToDB(transaction: PaymentTransaction){
    try {
        if(!client) connectToMongoDB();
        const db = client.db("TransactionsDB");
        const collection = db.collection("TransactionsCollection");
        await collection.insertOne(transaction);
    } catch(err){
        console.log(err);
    } 
}

async function deleteTransactionFromDB(transactionid: number){
    try {
        if(!client) connectToMongoDB();
        const db = client.db("TransactionsDB");
        const collection = db.collection("TransactionsCollection");
        const result = collection.findOneAndDelete({id: transactionid});
        return result;
    }catch(err){
        console.log(err);
    }
}

async function getLastId(){
    try{
        if(!client) connectToMongoDB();
        const db = client.db("TransactionsDB");
        const collection = db.collection("TransactionsCollection");
        const result = await collection.find().sort({id: -1}).limit(1).toArray();
        //console.log(result);
        if(Object.keys(result).length==0) return {id: 0};
        return result[0];
    } catch(err){
        console.log(err);
    }
}

async function connectToMongoDB() {
    try{
        await client.connect();
        return client;
    }
    catch(err){
        console.log(err);
    }
}

async function findInMongoDB(transactionId: number) {
    if(!client) connectToMongoDB();
        const db = client.db("TransactionsDB");
        const collection = db.collection("TransactionsCollection");
        const result = await collection.findOne({id: transactionId});
        return result;
}

async function getAllDocsFromDB() {
    try{
        if(!client) connectToMongoDB();
        const db = client.db("TransactionsDB");
        const collection = db.collection("TransactionsCollection");
        const allDocs = await collection.find().toArray();
        return allDocs;
    }catch(err){
        console.log(err);
    }
}

export {addTransactionToDB, getLastId, deleteTransactionFromDB, findInMongoDB, getAllDocsFromDB}