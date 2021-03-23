const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

export const Summary = (props) => {
  const { chartData } = props
  const arrChartData = Object.entries(chartData || {})
  return (
    <div className="rw-segment rw-table-wrapper-responsive m-20">
      <p className="rw-segment text-center">Expense Breakdown</p>
      <table className="rw-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>Type</th>
            <th style={{ textAlign: 'center' }}>Amount</th>
            <>&nbsp;</>
          </tr>
        </thead>
        <tbody>
          {arrChartData.length &&
            arrChartData.map((expense, index) => (
              <tr key={index}>
                <td style={{ textAlign: 'center' }}>{expense[0]}</td>
                <td style={{ textAlign: 'center' }}>
                  {Math.round(expense[1])}
                </td>
                <>&nbsp;</>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
