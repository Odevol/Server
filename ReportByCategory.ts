interface ReportByCategory {

	// Общая сумма транзакций
	sum: number

	// Массив категорий
	sumsByCategory: Array<{
		
		// Сумма по категории
		sum: number

		// Название категории
		category: string

	}>
	
}