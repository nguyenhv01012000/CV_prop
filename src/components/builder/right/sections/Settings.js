import React, { memo, useContext, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { useTranslation, Trans } from 'react-i18next';
//import UserContext from '../../../../contexts/UserContext';
import Button from '../../../shared/Button';
import Heading from '../../../shared/Heading';
import styles from './Settings.module.css';
import Input from '../../../shared/Input';
import SettingsContext from '../../../../contexts/SettingsContext';
import themeConfig from '../../../../data/themeConfig';
import { languages } from '../../../../i18n';
import { useDispatch } from '../../../../contexts/ResumeContext';

const Settings = ({ id, changeId }) => {
	const { t } = useTranslation();

	const dispatch = useDispatch();
	const { theme, setTheme, language, setLanguage } = useContext(
		SettingsContext
	);

	const handleChangeTheme = (e) => {
		setTheme(e.target.value);
	};

	const handleChangeLanguage = (e) => {
		const lang = e.target.value;
		setLanguage(lang);
		dispatch({ type: 'change_language', payload: lang });
	};

	return (
		<section onMouseMove={() => changeId(id)}>
			<Heading id={id} part={'right'} />

			<Input
				label={t('builder.settings.theme')}
				type="dropdown"
				options={Object.keys(themeConfig)}
				value={theme}
				onChange={handleChangeTheme}
			/>

			<label>
				<span>{t('builder.settings.language')}</span>
				<div className="relative grid items-center">
					<select onChange={handleChangeLanguage} value={language}>
						{languages.map((x) => (
							<option key={x.code} value={x.code}>
								{x.name}
							</option>
						))}
					</select>

					<FaAngleDown
						size="16px"
						className="absolute right-0 opacity-50 hover:opacity-75 mx-4"
					/>
				</div>
			</label>
		</section>
	);
};

export default memo(Settings);
