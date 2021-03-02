import { useDispatch, useSelector } from '../../contexts/ResumeContext'
import { BiHide, BiShow } from "react-icons/bi";
import React, { memo, useState } from "react"
import Button from "./Button"

const VisibleButton = ({ path, className = 'mt-8 ml-auto' }) => {
  let state = useSelector(path, []);
  const dispatch = useDispatch()
  const [isShow, setHide] = useState(state);

  const onDisplay = () => {
    dispatch({ type: 'on_display_section', payload: { 'path': path } })
    isShow ? setHide(false) : setHide(true);
  }

  if (isShow) return <Button icon={BiShow} onClick={onDisplay} isStyleIcon={false} className={className}></Button>
  else return <Button icon={BiHide} onClick={onDisplay} isStyleIcon={false} className={className}></Button>
}

export default memo(VisibleButton);
