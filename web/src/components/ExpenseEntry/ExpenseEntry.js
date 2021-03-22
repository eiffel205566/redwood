import {
  Form,
  TextField,
  TextAreaField,
  Submit,
  FieldError,
  Label,
  FormError,
} from '@redwoodjs/forms'
import { useMutation, useQuery } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useForm } from 'react-hook-form'

const CREATE_EXPENSE = gql`
  mutation CreateExpenseMutation($input: CreateExpenseInput!) {
    createExpense(input: $input) {
      id
    }
  }
`

const ExpenseEntry = ({ currentUser }) => {
  const formMethods = useForm({ mode: 'onBlur' })

  const [create, { loading, error }] = useMutation(CREATE_EXPENSE, {
    onComplete: () => {
      formMethods.reset()
    },
  })

  const onSubmit = async (data) => {
    try {
      await create({
        variables: { input: { ...data, user: currentUser?.email } },
      })
      toast.success('success!!!')
    } catch (error) {
      console.log(error)
    }
    console.log(data)
  }

  return (
    <>
      <Toaster timeout={2000} />
      <Form
        onSubmit={onSubmit}
        validation={{ mode: 'onBlur' }}
        formMethods={formMethods}
      >
        <FormError
          error={error}
          wrapperStyle={{ color: 'red', backgroundColor: 'lavenderblush' }}
        />
        <Label name="type" errorClassName="error">
          Expense Type
        </Label>
        <TextField
          name="type"
          validation={{ required: true }}
          errorClassName="error"
        />
        <FieldError name="type" className="error" />

        <Label name="amount" errorClassName="error">
          Amount
        </Label>
        <TextAreaField
          name="amount"
          validation={{ required: true }}
          errorClassName="error"
        />
        <FieldError name="amount" className="error" />

        <Submit disabled={loading}>Save</Submit>
      </Form>
    </>
  )
}

export default ExpenseEntry
