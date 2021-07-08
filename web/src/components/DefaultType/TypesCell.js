import SingleType from 'src/components/DefaultType/SingleType'
import { iconTypes } from 'src/components/DefaultType/Static'

import DefaultTypes from 'src/components/DefaultType/DefaultTypes'

export const QUERY = gql`
  query EXPENSETYPES {
    expenseTypes {
      id
      description
      newName
      user
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return <div className="rw-text-center">{'No expenses yet. '}</div>
}

export const Success = ({ expenseTypes, setIconType, currentId }) => {
  // console.log(test)
  // return <DefaultTypes setIconType={setIconType} currentType={currentType} />

  return expenseTypes.map((oneType) => (
    <SingleType
      id={oneType.id}
      currentId={currentId}
      key={oneType.id}
      icon={iconTypes[oneType.description]}
      description={oneType.description}
      index={oneType.id}
      parentClass="w-max justify-self-center cursor-pointer"
      iconClass={
        currentId === oneType.id
          ? 'w-8 h-8 sm:h-12 sm:w-12 md:w-16 md:h-16 bg-gray-100 rounded-full p-2 mx-auto bg-green-300'
          : 'w-8 h-8 sm:h-12 sm:w-12 md:w-16 md:h-16 bg-gray-100 rounded-full p-2 mx-auto'
      }
      setIconType={setIconType}
      newName={oneType.newName}
    />
  ))
}

/*

{
    "__typename": "ExpenseType",
    "id": 4,
    "description": "CREDIT_CARD",
    "newName": "debit buy",
    "user": "fakeuser2.expinsight@gmail.com"
}

*/
