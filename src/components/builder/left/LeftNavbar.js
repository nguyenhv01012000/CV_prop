import { Link } from "gatsby"
import React, { Fragment, memo, useEffect } from 'react';
import { Element } from 'react-scroll';
import { Tooltip } from "@material-ui/core"
import { useTranslation } from "react-i18next"
import sections from "../../../data/leftSections"
// import Avatar from '../../shared/Avatar';
import Logo from "../../shared/Logo"
import SectionIcon from "../../shared/SectionIcon"
import styles from "./LeftNavbar.module.css"
import { useState } from 'react';
import { useSelector, useDispatch } from "../../../contexts/ResumeContext";

const LeftNavbar = ({ mouse }) => {

	const { t } = useTranslation();
	const [change, setChange] = useState('profile');
	const dispatch = useDispatch();

	const changeIcon = (id) => {
		setChange(id);
		dispatch({ type: 'on_add_sectionsLeft', payload: { 'path': id } });
	}
	useEffect(() => {
		setChange(mouse);
	},[mouse]);
	return (
		<div className={styles.container}>
			<Tooltip title={t("builder.tooltips.backToDashboard")} placement="right">
				<div >
					<Link to="/app/dashboard">
						<Logo size="40px" />
					</Link>
				</div>
			</Tooltip>

			<div className="grid grid-cols-1 gap-4 text-primary-500">
				{sections.map((x) => (
					<Fragment key={x.id}>
						<Element name={x.id} >
							<SectionIcon
								key={x.id}
								section={x}
								containerId="LeftSidebar"
								tooltipPlacement="right"
								change={change}
								changeIcon={changeIcon}
							/>
						</Element>
					</Fragment>
				))}
			</div>

			<hr className="mt-auto my-6" />

			{/* <Avatar /> */}
		</div>
	)
}

export default memo(LeftNavbar)
