import { CreatePaymentTransactionRequestPayload } from "./CreatePaymentTransactionRequestPayload";
import { PaymentTransaction } from "./PaymentTransaction";
import { addTransactionToDB} from "./mongoConnect";

function saveTransaction(request: CreatePaymentTransactionRequestPayload){
    const transaction = new PaymentTransaction(request)
    addTransactionToDB(transaction);
}

export{saveTransaction}