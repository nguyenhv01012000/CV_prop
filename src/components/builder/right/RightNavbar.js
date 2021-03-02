import React, { memo, useEffect } from 'react';
import {useState} from 'react';
import sections from '../../../data/rightSections';
import SectionIcon from '../../shared/SectionIcon';
import styles from './RightNavbar.module.css';
import SyncIndicator from './SyncIndicator';
import { useSelector,useDispatch } from "../../../contexts/ResumeContext";

const RightNavbar = ({mouse}) => {
	const [change, setChange] = useState('templates');
	const dispatch = useDispatch();
	const changeIcon = (id) => {
		setChange(id);
		dispatch({ type: 'on_add_sectionsRight' , payload: { 'path': id}});
	}
	useEffect(() => {
		setChange(mouse);
	},[mouse]);
	return (
		<div className={styles.container}>
			<div className="grid grid-cols-1 gap-4 text-primary-500">
				{sections.map((x) => (
					<SectionIcon
						key={x.id}
						section={x}
						containerId="RightSidebar"
						tooltipPlacement="left"
						change={change}
						changeIcon={changeIcon}
					/>
				))}
			</div>

			<hr className="mt-auto my-6" />

			<SyncIndicator />
		</div>
	);
}

export default memo(RightNavbar);
