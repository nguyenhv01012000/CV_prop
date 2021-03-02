import React, { Fragment, memo, useState } from 'react';
import { Element } from 'react-scroll';
//import sections from '../../../data/rightSections';
import RightNavbar from './RightNavbar';
import styles from './RightSidebar.module.css';
import About from './sections/About';
import Actions from './sections/Actions';
import Colors from './sections/Colors';
import Fonts from './sections/Fonts';
import Layout from './sections/Layout';
import Settings from './sections/Settings';
import Templates from './sections/Templates';
import FontSize from './sections/FontSize';
import SaveCv from './sections/SaveCv';
import { useSelector } from '../../../contexts/ResumeContext';

const getComponent = (id) => {
	switch (id) {
		case 'save-cv':
			return SaveCv;
		case 'templates':
			return Templates;
		case 'layout':
			return Layout;
		case 'colors':
			return Colors;
		case 'fonts':
			return Fonts;
		case 'actions':
			return Actions;
		case 'settings':
			return Settings;
		case 'about':
			return About;
		case 'font-size':
			return FontSize;
		default:
			throw new Error();
	}
};



const RightSidebar = () => {
	const [id, setId] = useState();
	const state = useSelector();
	const { sectionsRight } = state;
	const changeId = (id) => {
		setId(id);
	}
	const SidebarSection = ({ id, event }) => {
		const Component = getComponent(id);
	
		return (
			<Fragment key={id}>
				<Element name={id}>
					<Component id={id} event={event} changeId={changeId}/>
				</Element>
				<hr />
			</Fragment>
		);
	};
	return (
		<div className="flex">
			<div id="RightSidebar" className={styles.container}>
				{sectionsRight.map(SidebarSection)}
			</div>

			<RightNavbar mouse={id} />
		</div>
	);
}
export default memo(RightSidebar);
