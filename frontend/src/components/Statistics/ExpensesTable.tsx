
const ExpensesTable = ({ cards, loading }: { cards: any[]; loading: boolean }) => {
  return (
    <div>
          {loading && cards.length === 0 && (
        <p className="text-center mt-10 text-gray-500 italic">Yüklənir...</p>
      )}

      {!loading && cards.length === 0 && (
        <p className="text-center mt-10 text-gray-500 italic">
          Nəticə tapılmadı
        </p>
      )}
    </div>
  )
}

export default ExpensesTable