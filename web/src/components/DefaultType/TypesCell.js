import SingleType from 'src/components/DefaultType/SingleType'
import { defaultIcons } from 'src/components/DefaultType/Static'

export const QUERY = gql`
  query EXPENSETYPES {
    expenseTypes {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return <div className="rw-text-center">{'No expenses yet. '}</div>
}

export const Success = ({ expenseTypes }) => {
  return <div>ASD</div>
}
