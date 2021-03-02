import cx from 'classnames';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from '../../contexts/ResumeContext';
import { handleKeyUp } from '../../utils';

const ButtonDelete = ({ path, part }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const deleteSection = () => {
    if (part === 'right') dispatch({ type: 'on_delete_sectionsRight', payload: { 'path': path } });
    else dispatch({ type: 'on_delete_sectionsLeft', payload: { 'path': path } });
  }
  return (
    <button type="button" className="btn btn-outline-danger" onClick={() => deleteSection()} style={{marginLeft:'20px',borderRadius:'100%'}} ><i className="fa fa-times" aria-hidden="true"></i></button>
  );
};

export default memo(ButtonDelete);
