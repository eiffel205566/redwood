import { db } from 'src/lib/db'
import { UserInputError } from '@redwoodjs/api'

export const contacts = () => {
  return db.contact.findMany()
}

export const myContacts = ({ email }) => {
  return db.contact.findMany({
    where: {
      email,
    },
  })
}

export const oneContact = ({ input: { id } }) => {
  return db.contact.findUnique({
    where: {
      id,
    },
  })
}

export const searchMessage = ({ message }) => {
  return db.contact.findMany({
    where: {
      message: {
        contains: message,
      },
    },
  })
}

const validate = (input) => {
  if (input.email && !input.email.match(/[^@]+@[^.]+\..+/)) {
    throw new UserInputError("Can't create new contact", {
      messages: {
        email: ['is not formatted like an email address'],
      },
    })
  }
}
export const createContact = ({ input }) => {
  validate(input)
  return db.contact.create({
    data: input,
  })
}

export const deleteContact = ({ input }) => {
  return db.contact.delete({
    where: {
      id: input.id,
    },
  })
}

export const likeContact = async ({ input }) => {
  const { id, email } = input

  const { likes: emails } = await db.contact.findUnique({
    where: {
      id,
    },
  })

  const hasMatch = emails.includes(email)

  return db.contact.update({
    where: {
      id,
    },
    data: {
      likes: hasMatch
        ? [...emails.filter((eachEmail) => eachEmail !== email)]
        : [...emails, email],
    },
  })
}
