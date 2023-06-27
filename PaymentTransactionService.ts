import { CreatePaymentTransactionRequestPayload } from "./CreatePaymentTransactionRequestPayload";
import { PaymentTransaction } from "./PaymentTransaction";
import { PaymentTransactionListRequestPayload } from "./PaymentTransactionListRequestPayload";
import { ReportByCategoryRequestPayload } from "./ReportByCategoryRequestPayload";
import { addTransactionToDB, getLastId, deleteTransactionFromDB, findInMongoDB, getAllDocsFromDB } from "./mongoConnect";

async function saveTransaction(request: CreatePaymentTransactionRequestPayload){
    const transaction = new PaymentTransaction(request);
    //const lastId =(await getLastId()).id;
    //transaction.id=lastId + 1;
    return await addTransactionToDB(transaction);
}

async function deleteTransaction(id: number) {
    const result = (await deleteTransactionFromDB(id)).value;
    return result !== null;
}

async function findTransaction(id: number) {
    const result = await findInMongoDB(id);
    return result !== null ? result : null;
}


async function sortByDate(request: PaymentTransactionListRequestPayload) {
    const from = Date.parse(request.dateFrom);
    const to = Date.parse(request.dateTo);
    const allDocs = await getAllDocsFromDB();
    const result = allDocs.filter(item=>((Date.parse(item.createAt) - from >= 0) && (to - Date.parse(item.createAt) > 0)));
    return result;
}

async function getReportByCategory(request: ReportByCategoryRequestPayload) {
    const listSortByDate = await sortByDate(request);

    let categorySum = new Map<string, number>();
    let totalSum = listSortByDate.reduce((sum, transaction)=>{
        let value = transaction.value;
        let category = transaction.category;
        sum += value;
        if(!categorySum.has(category)) categorySum.set(category, value);
        else {
            let newValue = categorySum.get(category) + value;
            categorySum.set(category, newValue);
        }
        return sum;
    }, 0);

    const arrayCategorySum = [];
    categorySum.forEach((key, value)=>{
        let transaction = {sum: value, category: key};
        arrayCategorySum.push(transaction);
    });
    let report: ReportByCategory = {
        sum: totalSum,
        sumsByCategory: arrayCategorySum
    }
    return report;
}

export{saveTransaction, deleteTransaction, findTransaction, sortByDate, getReportByCategory}