import {
  Form,
  TextField,
  TextAreaField,
  Submit,
  FieldError,
  Label,
} from '@redwoodjs/forms'
import BlogLayout from 'src/layouts/BlogLayout'

const ContactPage = () => {
  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <BlogLayout>
      <Form onSubmit={onSubmit} validation={{ mode: 'onBlur' }}>
        <Label name="name" errorClassName="error">
          Name
        </Label>
        <TextField
          name="name"
          validation={{ required: true }}
          errorClassName="error"
        />
        <FieldError name="name" className="error" />

        <Label name="email" errorClassName="error">
          Email
        </Label>
        <TextField
          name="email"
          validation={{
            required: true,
            pattern: {
              value: /[^@]+@[^.]+\..+/,
              message: 'Please enter a valid email address',
            },
          }}
          errorClassName="error"
        />
        <FieldError name="email" className="error" />

        <Label name="message" errorClassName="error">
          Message
        </Label>
        <TextAreaField
          name="message"
          validation={{ required: true }}
          errorClassName="error"
        />
        <FieldError name="message" className="error" />

        <Submit>Save</Submit>
      </Form>
    </BlogLayout>
  )
}

// const ContactPage = () => {
//   const [state, setState] = useState({
//     name: null,
//     email: null,
//     message: null,
//   })

//   const { name, email, message } = state

//   const onSubmit = (e) => {
//     e.preventDefault()
//     console.log(state)
//     setState({
//       name: '',
//       email: '',
//       message: '',
//     })
//     console.log(state)
//   }

//   const onChange = (e) => {
//     setState((currState) => {
//       return {
//         ...currState,
//         [e.target['name']]: e.target.value,
//       }
//     })
//   }

//   return (
//     <BlogLayout>
//       <form
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//           width: '100px',
//         }}
//         action="submit"
//         onSubmit={(e) => onSubmit(e)}
//       >
//         <label style={{ margin: '5px' }} htmlFor="name">
//           Name
//         </label>
//         <input
//           style={{ margin: '5px' }}
//           type="text"
//           name="name"
//           value={name}
//           onChange={onChange}
//         ></input>

//         <label style={{ margin: '5px' }} htmlFor="email">
//           Email
//         </label>
//         <input
//           style={{ margin: '5px' }}
//           type="text"
//           name="email"
//           value={email}
//           onChange={onChange}
//         ></input>
//         <label style={{ margin: '5px' }} htmlFor="message">
//           Message
//         </label>
//         <textarea
//           style={{ margin: '5px' }}
//           type="text"
//           name="message"
//           value={message}
//           onChange={onChange}
//         ></textarea>

//         <button style={{ margin: '5px' }}>Save</button>
//       </form>
//     </BlogLayout>
//   )
// }

export default ContactPage
