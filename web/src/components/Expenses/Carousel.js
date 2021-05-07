import React, { useState, useEffect } from 'react'
import { truncate } from '../Misc/UtilityFunc'

const Carousel = ({
  id,
  translateDistance,
  expenseTypTags,
  tags,
  setTagEditState,
  tagEditState,
  chosenTags,
  setChosenTags,
}) => {
  const { currentTranslateX } = translateDistance || false
  const { chosenTagIds } = chosenTags
  // const tagIds = tags.map((tag) => tag.id)

  //store tags in local state onmount
  // const [chosenTags, setChosenTags] = useState({
  //   chosenTagIds: [...tagIds],
  // })

  // const { chosenTagIds } = chosenTags

  // useEffect(() => {
  //   setChosenTags((state) => {
  //     return {
  //       ...state,
  //       chosenTagIds: [...tagIds],
  //     }
  //   })
  // }, [tags])
  //--

  return (
    <div
      className={`carousel the-small-one h-full overflow-hidden ${
        tagEditState.id && tagEditState.id === id
          ? 'border border-green-200'
          : ''
      }`}
    >
      <ul className="allTags the-infinite-row text-xs sm:text-sm md:text-base h-full">
        {expenseTypTags.map((tag) => (
          <li
            key={tag.id}
            className={`${
              currentTranslateX ? `-translate-x-${currentTranslateX * 16}` : ''
            } sm:${
              currentTranslateX ? `-translate-x-${currentTranslateX * 32}` : ''
            } inline-block h-full transform transition-all duration-500 ease-in-out`}
          >
            <Tag
              id={id}
              content={truncate(tag.tagName, 6)}
              isChosenTag={chosenTagIds.includes(tag.id)}
              chosenTags={chosenTags}
              setChosenTags={setChosenTags}
              tagId={tag.id}
              setTagEditState={setTagEditState}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

const Tag = ({
  id: expenseId,
  content,
  isChosenTag,
  chosenTags,
  setChosenTags,
  tagId,
  setTagEditState = () => {},
}) => {
  const onHandleTagClick = async () => {
    // add setTagEditState to set "editState",
    // need to check if any changed had been made to chosenTags

    await setTagEditState((state) => {
      return {
        ...state,
        id: expenseId,
        editState: true,
        newTagState: false,
      }
    })

    setChosenTags((state) => {
      return {
        ...state,
        chosenTagIds: state.chosenTagIds.includes(tagId)
          ? [...state.chosenTagIds.filter((id) => id !== tagId)]
          : [...state.chosenTagIds, tagId],
      }
    })
  }

  return (
    <div
      onClick={onHandleTagClick}
      className={`${
        content ? '' : 'text-displayOnly'
      } cursor-pointer flex flex-col justify-center text-xs sm:text-sm md:text-base pl-1 text-center w-16 sm:w-32 h-full select-none`}
    >
      <span
        className={`rounded-full py-1 px-2 ${
          isChosenTag ? 'bg-green-300 text-black' : 'bg-overlay'
        }`}
      >
        {content ? truncate(content, 8) : null}
      </span>
    </div>
  )
}

export default Carousel
