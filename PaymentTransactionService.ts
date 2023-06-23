import { CreatePaymentTransactionRequestPayload } from "./CreatePaymentTransactionRequestPayload";
import { PaymentTransaction } from "./PaymentTransaction";
import { PaymentTransactionListRequestPayload } from "./PaymentTransactionListRequestPayload";
import { ReportByCategoryRequestPayload } from "./ReportByCategoryRequestPayload";
import { addTransactionToDB, getLastId, deleteTransactionFromDB, findInMongoDB, getAllDocsFromDB } from "./mongoConnect";

async function saveTransaction(request: CreatePaymentTransactionRequestPayload){
    const transaction = new PaymentTransaction(request);
    // РЕВЬЮ. Немного архитектуры. Здесь из уровня работы с базой данных импортируется функция для определения ID
    // Однако это может и должно определятся "внутри" уровня работы с базой данных.
    // Этот сервис это бизнес-логика приложения. Ее задача аркестрировать другие уровни и реализовывать бизнес правила
    // Формирование идентификатора относится к слою хранения данных и должно быть в этом слое
    const lastId =(await getLastId()).id;
    transaction.id=lastId + 1;
    addTransactionToDB(transaction);
}

async function deleteTransaction(id: number) {
    const result = (await deleteTransactionFromDB(id)).value;

    // РЕВЬЮ. Можно упростить выражение
    // return result !== null

    if(result === null) return false;
    else return true;
}

async function findTransaction(id: number) {
    const result = await findInMongoDB(id);

    // РЕВЬЮ. Можно упростить выражение
    // return result !== null ? result : null

    if(result === null) return false;
    return result;
}


async function sortByDate(request: PaymentTransactionListRequestPayload) {
    // РЕВЬЮ. Нужно объявлять через `let`, только тогда когда переменная точно будет переназначена
    // Тут, `from` и `to` не переназначаются
    let from = Date.parse(request.dateFrom);
    let to = Date.parse(request.dateTo);
    const allDocs = await getAllDocsFromDB();
    const result = allDocs.filter(item=>((Date.parse(item.createAt) - from >= 0) && (to - Date.parse(item.createAt) > 0)));
    return result;
}

async function getReportByCategory(request: ReportByCategoryRequestPayload) {
    const listSortByDate = await sortByDate(request);
    let totalSum = 0;
    let categorySum = new Map<string, number>();
    // РЕВЬЮ. Переделай плз с использованием `reduce`. И так тоже нормально, но
    // для таких действий более естественно использовать `reduce`
    listSortByDate.forEach(transaction => {
        let value = transaction.value;
        let category = transaction.category;
        totalSum += value;
        if(!categorySum.has(category)) categorySum.set(category, value);
        else {
            let newValue = categorySum.get(category) + value;
            categorySum.set(category, newValue);
        }
    });
    // РЕВЬЮ. Гораздо более распространено объявлять массив вот так `let arrayCategorySum = []`
    // Также можно объявить переменную через `const`, поскольку `.push` не переписывает значение по ссылке
    let arrayCategorySum = new Array;
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