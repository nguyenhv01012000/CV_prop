import { head } from 'lodash';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from '../../contexts/ResumeContext';
import ButtonDelete from './ButtonDelete';

const Heading = ({ id, part }) => {
	const { t } = useTranslation();
	const heading = useSelector(`${id}.heading`, t(`builder.sections.${id}`));

	return <h2 className="text-4xl focus:outline-none">{heading} <ButtonDelete path={id} part={part} /></h2>
};

export default memo(Heading);
