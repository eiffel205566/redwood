import React, { useState, useEffect } from 'react'
import { truncate } from '../Misc/UtilityFunc'
import { Tag } from './Tag'

const Carousel = ({
  id,
  translateDistance,
  expenseTypTags,
  tags,
  setTagEditState,
  tagEditState,
  chosenTags,
  setChosenTags,
  setTranslateDistance,
}) => {
  const { currentTranslateX } = translateDistance || false
  const { chosenTagIds } = chosenTags

  // when adding a new tag, update Carousel's maximum translate X distance
  useEffect(() => {
    setTranslateDistance((state) => {
      return {
        ...state,
        maxTranslateX: expenseTypTags.length ? expenseTypTags.length - 1 : 0,
      }
    })
  }, [expenseTypTags])
  //--

  return (
    <div
      className={`carousel the-small-one h-full overflow-hidden ${
        tagEditState.id && tagEditState.id === id
          ? 'border border-green-200'
          : ''
      }`}
    >
      <ul className="allTags the-infinite-row text-xs sm:text-sm md:text-base h-full relative">
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

export default Carousel
