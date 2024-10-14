import React,{memo} from 'react'

export const Button = ({text, textColor, bgColor, IcAfter,onClick, fullWidth}) => {
  console.log('re-render')
  return (
    <button
    type='button'
    className={`py-2 px-4 ${textColor} ${bgColor} ${fullWidth && 'w-full'} outline-none rounded-md hover:underline flex items-center justify-center gap-1`}
    onClick={onClick}
    >
        {text}
        {IcAfter && <IcAfter/>}
    </button>
  )
}
export default memo(Button);