import { colors, Tooltip } from '@material-ui/core';
import React, { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import styles from './SectionIcon.module.css';
import {useState} from 'react';
import { findIndex, max, set } from 'lodash';
import { useSelector } from '../../contexts/ResumeContext';

const SectionIcon = ({ change,changeIcon, section, containerId, tooltipPlacement }) => {
  const { t } = useTranslation();
  const { id, icon: Icon } = section;
  const state = useSelector();
  const { sectionsRight } = state;
  let index = findIndex(sectionsRight,{ id: id });
  const { sectionsLeft }  = state;
  if(index<0)index = findIndex(sectionsLeft,{ id: id });
  let temp = index>=0 ? id :'about';
  const changeIconItem=(id) => { 
    changeIcon(id);
  }
  return (
    <Tooltip
      title={t(`builder.sections.${id}`)}
      placement={tooltipPlacement}
      arrow
    >
      <Link
        spy 
        smooth
        to={temp}
        offset={-18}
        duration={500}
        containerId={containerId}
        activeClass="text-primary-900"
        className={styles.icon}
      >
        <Icon size="20px" onClick={() => changeIconItem(id)} style={{color:change===id?'#00BFFF':null}}/>
      </Link>
    </Tooltip>
  );
};

export default memo(SectionIcon);
