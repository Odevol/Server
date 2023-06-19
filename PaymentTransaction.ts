import { CreatePaymentTransactionRequestPayload } from "./CreatePaymentTransactionRequestPayload";

export class PaymentTransaction {

	// Идентификатор транзакции
	id: number;

	// Сумма транзакции
	value: number;

	// Категория транзакции. Произвольная строка с клиента
	category: string;

	// Строковое представление даты создания
	createAt: string;

	constructor (request: CreatePaymentTransactionRequestPayload,){
        this.value = request.value;
        this.category = request.category;
        this.createAt = PaymentTransaction.createDate();
    };

	private static createDate(): string{
        let date: Date = new Date();
        let dateString: string =  date.getFullYear() + "-" + (date.getMonth().toString().length===1 ? "0"+date.getMonth():date.getMonth()) + "-" + date.getDate();
        return dateString;
    }
}