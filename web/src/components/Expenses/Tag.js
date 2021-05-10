import { truncate } from '../Misc/UtilityFunc'
import * as _ from 'lodash'

export const Tag = ({
  id,
  content,
  isChosenTag,
  chosenTags,
  setChosenTags,
  tagId,
  setTagEditState,
  tagBackground,
}) => {
  const onHandleTagClick = async () => {
    // add setTagEditState to set "editState",
    // need to check if any changed had been made to chosenTags

    if (setTagEditState) {
      //NewExpense component will not pass in this func
      await setTagEditState((state) => {
        return {
          ...state,
          id,
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
    } else {
      //NewExpense component has newExpenseState store {"__typename":"Tag","id":4,"tagName":"beer"} as each tag
      //wheras in SingleExpense, tag state is only the tag id
      setChosenTags((state) => {
        return {
          ...state,
          chosenTags: isTagChosen(state.chosenTags, tagId)
            ? [...state.chosenTags.filter((tag) => tag.id !== tagId)]
            : [
                ...state.chosenTags,
                _.find(state.tags, function (o) {
                  return o?.id === tagId
                }),
              ],
        }
      })
    }
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
          isChosenTag
            ? 'bg-green-300 text-black'
            : `text-white ${tagBackground ? tagBackground : 'bg-overlay'}`
        }`}
      >
        {content ? truncate(content, 8) : null}
      </span>
    </div>
  )
}

export const isTagChosen = (Tags, tagId) => {
  if (Tags?.length === 0) {
    return false
  }

  return !!_.find(Tags, function (o) {
    return o.id === tagId
  })
}
