import React, { Fragment, useState, useEffect } from 'react'
import SingleType from 'src/components/DefaultType/SingleType'
import {
  Edit,
  Plus,
  Check,
  Left,
  Right,
  Cancel,
  ClockLoading,
} from 'src/components/Misc/svg'
import { Form, TextField, Submit, Label } from '@redwoodjs/forms'
import { truncate } from '../Misc/UtilityFunc'
import Carousel from './Carousel'
import { toast } from '@redwoodjs/web/toast'
import { useMutation } from '@redwoodjs/web'
import { Wrapper } from 'src/components/Misc/UtilityFunc'

const ADD_TAGS_TO_ONE_EXPENSE = gql`
  mutation addTagsToOneExpense($input: ConnectTagsToExpenseInput!) {
    connectTagsToExpense(input: $input) {
      id
      user
      amount
      tags {
        id
      }
    }
  }
`

// const ONE_EXPENSE_QUERY = gql`
//   query oneExpenseQuery($id: Int!) {
//     expense(id: $id) {
//       tags {
//         id
//       }
//     }
//   }
// `

const QUERY = gql`
  query EXPENSES($input: String!) {
    myExpenses(input: $input) {
      id
      amount
      createdAt
      expenseType {
        id
        user
        description
        newName
        tags {
          id
          tagName
        }
      }
      tags {
        id
      }
    }
  }
`

const SingleExpense = ({
  singleExpense,
  iconTypes,
  tagEditState,
  setTagEditState,
  myExpenses,
  user,
  setNewExpenseState,
  setGrandMasterLoadingState,
}) => {
  const { id, amount, createdAt, expenseType, tags } = singleExpense

  const {
    id: expenseTypeId,
    description,
    newName,
    tags: expenseTypTags,
  } = expenseType

  // -- store chosenTags in SingleExpense
  const tagIds = tags.map((tag) => tag.id)
  const [chosenTags, setChosenTags] = useState({
    chosenTagIds: [...tagIds],
    originalChosenTagIds: [...tagIds],
  })

  //onmount store selected tags in state
  useEffect(() => {
    setChosenTags((state) => {
      return {
        ...state,
        chosenTagIds: [...tagIds],
      }
    })
  }, [tags])
  // --

  const onHandleAddTagClick = (e) => {
    e.preventDefault()
    setTagEditState((state) => {
      return {
        ...state,
        id,
        editState: true,
      }
    })
  }

  //state for carousel movement horizontally
  const [translateDistance, setTranslateDistance] = useState({
    maxTranslateX: expenseTypTags.length ? expenseTypTags.length - 1 : 0,
    currentTranslateX: 0,
  })

  const onHandleTranslateLeft = () => {
    setTranslateDistance((state) => {
      return {
        ...state,
        currentTranslateX:
          state.currentTranslateX === 0
            ? state.currentTranslateX
            : --state.currentTranslateX,
      }
    })
  }

  const onHandleTranslateRight = () => {
    setTranslateDistance((state) => {
      return {
        ...state,
        currentTranslateX:
          state.currentTranslateX === state.maxTranslateX
            ? state.maxTranslateX
            : ++state.currentTranslateX,
      }
    })
  }

  const onHandleSubmitTagChange = async () => {
    // if chosen tags hasn't change from before, handler should do nothing
    if (
      tags
        .map((tag) => tag.id)
        .sort((a, b) => {
          return +a - +b
        })
        .join('') ===
      chosenTags.chosenTagIds
        .sort((a, b) => {
          return +a - +b
        })
        .join('')
    ) {
      //when chosen tags hasn't change, reset all states
      //set choseTagIds back to oirignalChosenTagIds
      setChosenTags((state) => {
        return {
          ...state,
          chosenTagIds: [...state.originalChosenTagIds],
        }
      })
      setTagEditState((state) => {
        return {
          ...state,
          id: null,
          editState: false,
          newTagState: false,
        }
      })
      return
    }

    try {
      //initiate overlay blocking
      setGrandMasterLoadingState((state) => {
        return {
          ...state,
          grandMasterLoading: true,
        }
      })

      const input = { id, tags: { ids: [...chosenTags.chosenTagIds] } }

      await connectTagsToExpense({
        variables: {
          input: input,
        },
        // optimisticResponse: {
        //   connectTagsToExpense: {
        //     id,
        //     __typename: 'Expense',
        //     user,
        //     tags: [
        //       ...chosenTags.chosenTagIds.map((id) => {
        //         return { id, __typename: 'Tag' }
        //       }),
        //     ],
        //   },
        // },
        update: (cache) => {
          cache.writeQuery({
            query: QUERY,
            variables: { input: user },
            data: {
              myExpenses: [
                ...myExpenses.map((expense) => {
                  if (expense.id === id) {
                    return {
                      ...expense,
                      tags: [...chosenTags.chosenTagIds],
                    }
                  } else {
                    return expense
                  }
                }),
              ],
            },
          })
        },
      })

      await setTagEditState((state) => {
        return {
          ...state,
          id: null,
          editState: false,
          newTagState: false,
        }
      })

      //remove overlay blocking
      setGrandMasterLoadingState((state) => {
        return {
          ...state,
          grandMasterLoading: false,
        }
      })
      toast.success('New Tags Selected!')
    } catch (error) {
      console.log(error)
      //in case error, remove overlay blocking
      setGrandMasterLoadingState((state) => {
        return {
          ...state,
          grandMasterLoading: false,
        }
      })
    }
  }

  //handle change made to chosen tags
  const [
    connectTagsToExpense,
    { loading: connectTagsToExpenseLoading, error: connectTagsToExpenseError },
  ] = useMutation(ADD_TAGS_TO_ONE_EXPENSE, {
    onCompleted: () => {
      setTagEditState((state) => {
        return {
          ...state,
          id: null,
          editState: false,
          newTagState: false,
        }
      })
    },
  })

  return (
    <div className="singleExpense flex w-full h-12 bg-sideDark text-white my-1">
      <div className="flexWrapperNoTime flex flex-grow">
        <Wrapper
          onClick={() => {
            // click will bring up NewExpense
            setTagEditState((state) => {
              return {
                ...state,
                newTagState: true,
                editState: false,
              }
            })
            setNewExpenseState((state) => {
              return {
                ...state,
                expenseToEdit: singleExpense,
                id: singleExpense.expenseType.id,
                tags: [...singleExpense.expenseType.tags],
                chosenTags: [...singleExpense.tags],
                amount: singleExpense.amount,
                date: singleExpense.createdAt,
              }
            })
            setChosenTags((state) => {
              return {
                ...state,
                chosenTagIds: [...state.originalChosenTagIds],
              }
            })
          }}
          className="hover:text-gray-300 cursor-pointer"
        >
          <Edit className="h-6 w-6" />
        </Wrapper>

        <Wrapper className="w-10 sm:w-20">
          <span>{`$${+amount > 9999 ? '>9999' : amount}`}</span>
        </Wrapper>

        <Wrapper className="hidden xs:block">
          <SingleType
            icon={
              description ? iconTypes[description] : iconTypes['CREDIT_CARD']
            }
            newName={newName ? newName : 'default'}
            parentClass="w-16 sm:w-20"
            iconClass="mx-auto h-6 w-6 text-displayOnly"
            noHoverNeeded={true}
            textColor="text-displayOnly"
          />
        </Wrapper>

        <div className="tagTitle-chevron-corousel flex-grow flex flex-row justify-center">
          {/*
            <Wrapper>
              <span>{'Tags: '}</span>
            </Wrapper>
          */}

          {id === tagEditState.id ? (
            <Wrapper
              onClick={
                connectTagsToExpenseLoading ? () => {} : onHandleSubmitTagChange
              }
              className="hover:text-green-300 cursor-pointer"
            >
              {connectTagsToExpenseLoading ? (
                <ClockLoading className="h-5 w-5 md:h-6 md:w-6 cursor-not-allowed" />
              ) : (
                <Check className="h-5 w-5 md:h-6 md:w-6" />
              )}
            </Wrapper>
          ) : null}

          {id === tagEditState.id ? (
            <Wrapper
              onClick={
                connectTagsToExpenseLoading
                  ? () => {}
                  : () => {
                      setTagEditState((state) => {
                        return {
                          ...state,
                          id: null,
                          editState: false,
                          newTagState: false,
                        }
                      })
                      setChosenTags((state) => {
                        return {
                          ...state,
                          chosenTagIds: [...state.originalChosenTagIds],
                        }
                      })
                    }
              }
              className="hover:text-red-300 cursor-pointer"
            >
              {connectTagsToExpenseLoading ? null : (
                <Cancel className="h-5 w-5 md:h-6 md:w-6" />
              )}
            </Wrapper>
          ) : null}
          <Wrapper>
            <Left
              onClick={onHandleTranslateLeft}
              className="h-5 w-5 md:h-6 md:w-6 hover:text-gray-300 cursor-pointer"
            />
          </Wrapper>

          <Carousel
            translateDistance={translateDistance}
            expenseTypTags={expenseTypTags}
            tags={tags}
            id={id}
            setTagEditState={setTagEditState}
            tagEditState={tagEditState}
            chosenTags={chosenTags}
            setChosenTags={setChosenTags}
            setTranslateDistance={setTranslateDistance}
          />
          {/*

            */}
          <Wrapper>
            <Right
              onClick={onHandleTranslateRight}
              className="h-5 w-5 md:h-6 md:w-6 hover:text-gray-300 cursor-pointer"
            />
          </Wrapper>
        </div>
      </div>

      <Wrapper className="hidden sm:block">
        {timeTag(new Date(createdAt.replace('-', '/')))}
      </Wrapper>
    </div>
  )
}

//utility
const timeTag = (datetime) => {
  return (
    <Fragment>
      <div className="h-full text-xs md:text-sm flex flex-col justify-center text-displayOnly px-0.5 sm:px-1 md:px-2">
        <time>
          {new Date(datetime).toDateString().split(' ').slice(1).join(' ')}
        </time>
      </div>
    </Fragment>
  )
}

const ShortTimeTag = (datetime) => {
  const timeString = new Date(datetime)
    .toDateString()
    .split(' ')
    .slice(1)
    .join(' ')
  const shortString = timeString.substr(0, timeString.length - 5)

  return (
    <Fragment>
      <div className="text-xs sm:text-sm md:text-base flex flex-col justify-center text-displayOnly px-0.5 sm:px-1 md:px-2">
        <time>{shortString}</time>
      </div>
    </Fragment>
  )
}

export default SingleExpense
