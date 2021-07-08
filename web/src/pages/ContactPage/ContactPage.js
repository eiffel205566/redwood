import {
  Form,
  TextField,
  TextAreaField,
  Submit,
  FieldError,
  Label,
  FormError,
} from '@redwoodjs/forms'
import BlogLayout from 'src/layouts/BlogLayout'
import { useMutation, useQuery } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { Garbage, HeartOutline } from 'src/components/Misc/svg'
import { useLazyQuery } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'
import * as _ from 'lodash'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
      name
      email
      message
    }
  }
`
const ALL_CONTACTS = gql`
  query ALLCONTACTS {
    contacts {
      id
      name
      email
      message
      likes
    }
  }
`
const ONE_CONTACT = gql`
  query ONECONTACT($input: OneContactInput!) {
    oneContact(input: $input) {
      id
    }
  }
`

const MY_CONTACTS = gql`
  query MYCONTACTS($email: String!) {
    myContacts(email: $email) {
      id
      name
      email
      message
      likes
    }
  }
`

const DELETE_CONTACT = gql`
  mutation DeleteContactMutation($input: DeleteContactInput!) {
    deleteContact(input: $input) {
      id
    }
  }
`
const SEARCH_MESSAGE = gql`
  query SearchMessage($message: String) {
    searchMessage(message: $message) {
      id
      name
      email
      message
      likes
    }
  }
`
const LIKE_CONTACT = gql`
  mutation LikeContact($input: LikeContactInput) {
    likeContact(input: $input) {
      id
      name
      email
      message
    }
  }
`

const ContactPage = () => {
  //--
  const currentUser = {
    app_metadata: {
      provider: 'email',
    },
    email: 'fakeuser2.expinsight@gmail.com',
    exp: 1616348450,
    sub: '3cff8205-96d0-464a-a6c2-31043649f687',
    user_metadata: {
      full_name: 'Fake User',
    },
    roles: [],
  }
  const isAuthenticated = true
  //--
  const [state, setState] = useState({
    contacts: [],
  })

  const { data } = useQuery(ALL_CONTACTS)
  const { contacts } = data || { contacts: [] }

  useEffect(() => {
    setState((currState) => {
      return {
        ...currState,
        contacts: data?.contacts,
      }
    })
  }, [data])

  const formMethods = useForm({ mode: 'onBlur' })

  const [create, { data: createDtaa, loading, error }] = useMutation(
    CREATE_CONTACT,
    {
      ignoreResults: false,
      onCompleted: () => {
        // console.log(createDtaa)
        formMethods.reset()
      },
    }
  )

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const testData = await create({
        variables: { input: data },
        update: (cache, { data }) => {
          cache.writeQuery({
            query: ALL_CONTACTS,
            data: {
              contacts: [...contacts, data],
            },
          })
        },
      })
      console.log(testData)
      toast.success('success!!!')
    } catch (error) {
      console.log(error)
    }
    // console.log(data)
  }

  const [
    deleteContact,
    { deleteContactLoading, deleteContactError },
  ] = useMutation(DELETE_CONTACT)

  const [findMessage, { data: result }] = useLazyQuery(SEARCH_MESSAGE, {
    fetchPolicy: 'network-only',
    onCompleted: () => [
      setState((currState) => {
        return {
          ...currState,
          contacts: [...result.searchMessage],
        }
      }),
    ],
  })

  const [search, setSearch] = useState('')
  const onChange = (e) => {
    setSearch(() => e.target.value)
    findMessage({
      variables: { message: e.target.value },
    })
    // console.log(result)
  }

  const [
    likeContact,
    { data: likeContactResult, loading: likeContactLoading },
  ] = useMutation(LIKE_CONTACT)

  const { data: oneContact } = useQuery(ONE_CONTACT, {
    variables: { input: { id: 34 } },
    fetchPolicy: 'network-only',
  })
  // console.log(oneContact)

  return (
    <BlogLayout isAuthenticated={isAuthenticated} currentUser={currentUser}>
      <Toaster timeout={2000} />
      <div className="flex">
        <Form
          onSubmit={onSubmit}
          validation={{ mode: 'onBlur' }}
          formMethods={formMethods}
          className="m-5 p-5 bg-gray-50"
        >
          <FormError
            error={error}
            wrapperStyle={{ color: 'red', backgroundColor: 'lavenderblush' }}
          />
          <Label name="name" errorClassName="error">
            Name
          </Label>
          <TextField
            name="name"
            validation={{ required: true }}
            errorClassName="error"
            className="border border-gray-500"
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
            className="border border-gray-500"
          />
          <FieldError name="email" className="error" />

          <Label name="message" errorClassName="error">
            Message
          </Label>
          <TextAreaField
            name="message"
            validation={{ required: true }}
            errorClassName="error"
            className="border border-gray-500"
          />
          <FieldError name="message" className="error" />

          <Submit disabled={loading}>Save</Submit>
        </Form>
        <div className="m-5">
          <input
            type="text"
            className="border-4 rounded w-full py-2 px-3"
            value={search}
            onChange={onChange}
          />
          <ul>
            {state?.contacts &&
              state.contacts.map((contact) => {
                return (
                  <>
                    <li className="flex" key={contact.id}>
                      <p className="px-1">{contact.name}</p>
                      <p className="px-1">{contact.email}</p>
                      <p className="px-1">{contact.message}</p>
                      <div
                        onClick={async (e) => {
                          e.stopPropagation()
                          await deleteContact({
                            variables: { input: { id: +contact.id } },
                            update: (cache) => {
                              cache.writeQuery({
                                query: ALL_CONTACTS,
                                data: {
                                  contacts: [
                                    ...contacts.filter(
                                      (oneContact) =>
                                        oneContact.id !== contact.id
                                    ),
                                  ],
                                },
                              })
                            },
                          })
                        }}
                      >
                        <Garbage
                          key={contact.id}
                          className="h-6 w-6 hover:text-gray-500 cursor-pointer"
                        />
                      </div>
                      <div
                        onClick={async (e) => {
                          e.stopPropagation()
                          await likeContact({
                            variables: {
                              input: {
                                id: +contact.id,
                                email: currentUser.email,
                              },
                            },
                            update: async (cache) => {
                              try {
                                const { contacts } = await cache.readQuery({
                                  query: ALL_CONTACTS,
                                })
                                const oneContact = _.find(contacts, {
                                  id: contact.id,
                                })

                                const hasMatch = oneContact.likes.includes(
                                  contact.email
                                )

                                const newOneContact = hasMatch
                                  ? {
                                      ...oneContact,
                                      likes: [
                                        ...oneContact.likes.filter(
                                          (email) => email !== contact.email
                                        ),
                                      ],
                                    }
                                  : {
                                      ...oneContact,
                                      likes: [
                                        ...oneContact.likes,
                                        contact.email,
                                      ],
                                    }

                                await cache.writeQuery({
                                  query: ALL_CONTACTS,
                                  data: {
                                    contacts: [
                                      ...contacts.map((oneContact) => {
                                        if (oneContact.id !== contact.id) {
                                          return oneContact
                                        } else {
                                          return newOneContact
                                        }
                                      }),
                                    ],
                                  },
                                })
                              } catch (error) {
                                console.log(error)
                              }
                            },
                          })
                        }}
                      >
                        <HeartOutline className="h-6 w-6 text-gray-500 hover:text-red-500 cursor-pointer" />
                      </div>
                      <p>{contact?.likes?.length}</p>
                    </li>
                  </>
                )
              })}
          </ul>
        </div>
      </div>
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
