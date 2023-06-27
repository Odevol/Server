import { PaymentTransaction } from "./PaymentTransaction";
import {v4 as uuidv4} from 'uuid';

const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient("mongodb://127.0.0.1:27017/");

async function addTransactionToDB(transaction: PaymentTransaction){
    try {
        transaction._id = uuidv4();
        await (await getColletion()).insertOne(transaction);
        return transaction._id;
    } catch(err){
        console.log(err);
    } 
}

async function deleteTransactionFromDB(transactionid: number){
    try {
        const result = (await getColletion()).findOneAndDelete({id: transactionid});
        return result;
    }catch(err){
        console.log(err);
    }
}

async function getLastId(){
    try{
        const result = await (await getColletion()).find().sort({id: -1}).limit(1).toArray();
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
        const result = await (await getColletion()).findOne({id: transactionId});
        return result;
}

async function getAllDocsFromDB() {
    try{
        const allDocs = await (await getColletion()).find().toArray();
        return allDocs;
    }catch(err){
        console.log(err);
    }
}

async function getColletion() {
    try {
        if(!client) connectToMongoDB();
        const db = client.db("TransactionsDB");
        const collection = db.collection("TransactionsCollection");
        return collection;
    } catch (err){
        console.log(err);
    }
}

export {addTransactionToDB, getLastId, deleteTransactionFromDB, findInMongoDB, getAllDocsFromDB}