import { addTransactionToDB } from "./mongoConnect";

interface CreatePaymentTransactionRequestPayload {
	
	// Сумма транзакции
	value: number

	// Категория транзакции. Произвольная строка с клиента
	category: string

}

export {CreatePaymentTransactionRequestPayload}