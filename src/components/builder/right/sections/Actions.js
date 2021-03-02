import React, { memo, useContext, useState } from 'react';
import { Link } from '@reach/router';
import { FaFileExport, FaFileImport } from 'react-icons/fa';
import { GrView } from 'react-icons/gr';
import { useTranslation } from 'react-i18next';
import ModalContext from '../../../../contexts/ModalContext';
import { useDispatch, useSelector } from '../../../../contexts/ResumeContext';
import { useAuthSelector } from '../../../../contexts/AuthContext';
import Button from '../../../shared/Button';
import Heading from '../../../shared/Heading';
import Input from '../../../shared/Input';
import { toast } from 'react-toastify';
import styles from './Actions.module.css';
//import { Link } from 'react-scroll';

const Actions = ({ id,changeId }) => {
	const { t } = useTranslation();

	const [loadDemoText, setLoadDemoText] = useState(
		t('builder.actions.loadDemoData.button'),
	);
	const [resetText, setResetText] = useState(
		t('builder.actions.resetEverything.button'),
	);

	const state = useSelector();
	const dispatch = useDispatch();
	const authState = useAuthSelector();
	const { emitter, events } = useContext(ModalContext);

	const handleImport = () => emitter.emit(events.IMPORT_MODAL);

	const handleExport = () => emitter.emit(events.EXPORT_MODAL);

	const getSharableUrl = () => {
		if(authState == null) return t('builder.toasts.serviceNotWork');
		return `http://localhost:8000/app/share-cv?userId=${authState.userId}&templateId=${authState.templateId}&auth=${authState.auth}`;
	};

	const handleOpenShareLink = () => {
		if(authState == null){
			toast.error(t('builder.toasts.serviceNotWork'));
		}
		else if (typeof window !== `undefined`) {
			window && window.open(getSharableUrl());
		}
	};

	const handleLoadDemo = () => {
		if (loadDemoText === t('builder.actions.loadDemoData.button')) {
			setLoadDemoText(t('shared.buttons.confirmation'));
			return;
		}

		dispatch({ type: 'load_demo_data' });
		setLoadDemoText(t('builder.actions.loadDemoData.button'));
	};

	const handleReset = () => {
		if (resetText === t('builder.actions.resetEverything.button')) {
			setResetText(t('shared.buttons.confirmation'));
			return;
		}

		setResetText(t('builder.actions.resetEverything.button'));
		dispatch({ type: 'reset_data' });
	};

	return (
		<section onMouseMove={()=>changeId(id)}>
			<Heading id={id} part={'right'} />

			<div className={styles.container}>
				<h5>{t('builder.actions.import.heading')}</h5>

				<p className="leading-loose">{t('builder.actions.import.text')}</p>

				<div className="mt-4 flex">
					<Button icon={FaFileImport} onClick={handleImport}>
						{t('builder.actions.import.button')}
					</Button>
				</div>
			</div>

			<div className={styles.container}>
				<h5>{t('builder.actions.export.heading')}</h5>

				<p className="leading-loose">{t('builder.actions.export.text')}</p>

				<div className="mt-4 flex">
					<Button icon={FaFileExport} onClick={handleExport}>
						{t('builder.actions.export.button')}
					</Button>
				</div>
			</div>

			<div className={styles.container}>
				<h5>{t('builder.actions.preview.heading')}</h5>

				<p className="leading-loose">{t('builder.actions.preview.text')}</p>

				<div className="mt-4 flex">
					<Link to={"/app/preview"}>
						<Button icon={GrView}>
							{t('builder.actions.preview.button')}
						</Button>
					</Link>
				</div>
			</div>

			<div className={styles.container}>
				<h5>{t('builder.actions.share.heading')}</h5>

				<p className="leading-loose">{t('builder.actions.share.text')}</p>

				<div>
					<Input
						type="action"
						value={getSharableUrl('share')}
						onClick={handleOpenShareLink}
					/>
				</div>
			</div>

			<div className={styles.container}>
				<h5>{t('builder.actions.resetEverything.button')}</h5>

				<p className="leading-loose">
					{t('builder.actions.resetEverything.text')}
				</p>

				<div className="mt-4 flex">
					<Button onClick={handleReset}>{resetText}</Button>
				</div>
			</div>
		</section>
	);
};

export default memo(Actions);
