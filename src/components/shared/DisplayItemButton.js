import { useDispatch } from '../../contexts/ResumeContext'
import { BiHide, BiShow } from "react-icons/bi";
import React, { memo, useState } from "react"
import Button from "./Button"

const DisplayItemButton = ({ path, data, className = 'mt-8 ml-auto' }) => {
  const dispatch = useDispatch()
  const [isShow, setHide] = useState(data['visible']);

  const onDisplay = () => {
    dispatch({ type: 'on_display_item', payload: { 'path': path, 'value': data, 'visible': isShow } })
    isShow ? setHide(false) : setHide(true);
  }

  if (isShow) return <Button icon={BiShow} onClick={onDisplay} isStyleIcon={false} className={className}></Button>
  else return <Button icon={BiHide} onClick={onDisplay} isStyleIcon={false} className={className}></Button>
}

export default memo(DisplayItemButton);
