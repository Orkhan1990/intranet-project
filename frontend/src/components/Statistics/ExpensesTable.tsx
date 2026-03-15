
const ExpensesTable = ({ expenseCards, loading }: { expenseCards: any[]; loading: boolean }) => {
  return (
    <div>
          {loading && expenseCards?.length === 0 && (
        <p className="text-center mt-10 text-gray-500 italic">Yüklənir...</p>
      )}

      {!loading && expenseCards?.length === 0 && (
        <p className="text-center mt-10 text-gray-500 italic">
          Nəticə tapılmadı
        </p>
      )}
    </div>
  )
}

export default ExpensesTable