import { CreatePaymentTransactionRequestPayload } from "./CreatePaymentTransactionRequestPayload";
import { PaymentTransaction } from "./PaymentTransaction";
import { addTransactionToDB, getLastId} from "./mongoConnect";

async function saveTransaction(request: CreatePaymentTransactionRequestPayload){
    const transaction = new PaymentTransaction(request);
    const lastId =(await getLastId()).id;
    transaction.id=lastId + 1;
    addTransactionToDB(transaction);
}

export{saveTransaction}