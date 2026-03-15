
const BrigadeTable = ({ brigadeCards, loading }: { brigadeCards: any[]; loading: boolean }) => {
  return (
    <div>
          {loading && brigadeCards.length === 0 && (
        <p className="text-center mt-10 text-gray-500 italic">Yüklənir...</p>
      )}

      {!loading && brigadeCards?.length === 0 && (
        <p className="text-center mt-10 text-gray-500 italic">
          Nəticə tapılmadı
        </p>
      )}
    </div>
  )
}

export default BrigadeTable