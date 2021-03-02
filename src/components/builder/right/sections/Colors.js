/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from '../../../../contexts/ResumeContext';
import colorOptions from '../../../../data/colorOptions';
import { handleKeyUp } from '../../../../utils';
import Heading from '../../../shared/Heading';
import Input from '../../../shared/Input';
import styles from './Colors.module.css';

const Colors = ({ id, changeId }) => {
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const handleClick = (value) => {
		localStorage.setItem('primaryColor', value);
		dispatch({
			type: 'on_input',
			payload: {
				path: 'metadata.colors.primary',
				value,
			},
		});
	};

	const onChangePrimaryColor = (e) =>{
		localStorage.setItem('primaryColor', e.target.value);
		dispatch({
			type: 'on_input',
			payload: {
				path: 'metadata.colors.primary',
				value: e.target.value
			},
		});
	}

	const onChangeTextColor = (e) =>{
		localStorage.setItem('textColor', e.target.value);
		dispatch({
			type: 'on_input',
			payload: {
				path: 'metadata.colors.text',
				value: e.target.value
			},
		});
	}

	const onChangeBackgroundColor = (e) =>{
		localStorage.setItem('backgroundColor', e.target.value);
		dispatch({
			type: 'on_input',
			payload: {
				path: 'metadata.colors.background',
				value: e.target.value
			},
		});
	}

	return (
		<section onMouseMove={() => changeId(id)}>
			<Heading id={id} part={'right'} />

			<div className="mb-6 grid grid-cols-8 gap-x-2 gap-y-6">
				{colorOptions.map((color) => (
					<div
						key={color}
						tabIndex="0"
						role="button"
						className={styles.circle}
						style={{ backgroundColor: color }}
						onKeyUp={(e) => handleKeyUp(e, () => handleClick(color))}
						onClick={() => handleClick(color)}
					/>
				))}
			</div>

			<Input
				type="color"
				name="primary"
				label={t('builder.colors.primary')}
				placeholder="#f44336"
				onChange={onChangePrimaryColor}
				path="metadata.colors.primary"
			/>

			<Input
				type="color"
				name="text"
				label={t('builder.colors.text')}
				placeholder="#212121"
				onChange={onChangeTextColor}
				path="metadata.colors.text"
			/>

			<Input
				type="color"
				name="background"
				label={t('builder.colors.background')}
				placeholder="#FFFFFF"
				onChange={onChangeBackgroundColor}
				path="metadata.colors.background"
			/>
		</section>
	);
};

export default memo(Colors);
