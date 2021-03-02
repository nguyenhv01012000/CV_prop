import cx from 'classnames';
import { graphql, useStaticQuery } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from '../../../../contexts/ResumeContext';
import templateOptions from '../../../../data/templateOptions';
import { handleKeyUp } from '../../../../utils';
import Heading from '../../../shared/Heading';
import styles from './Templates.module.css';

const Templates = ({ id, changeId }) => {
	const dispatch = useDispatch();
	const template = useSelector('metadata.template');
	const [change, setChange] = useState(template);

	// const previews = useStaticQuery(graphql`
	//   query {
	//     onyx: file(relativePath: { eq: "templates/onyx.png" }) {
	//       childImageSharp {
	//         fluid(maxHeight: 400) {
	//           ...GatsbyImageSharpFluid
	//         }
	//       }
	//     }
	//     pikachu: file(relativePath: { eq: "templates/pikachu.png" }) {
	//       childImageSharp {
	//         fluid(maxHeight: 400) {
	//           ...GatsbyImageSharpFluid
	//         }
	//       }
	//     }
	//     gengar: file(relativePath: { eq: "templates/gengar.png" }) {
	//       childImageSharp {
	//         fluid(maxHeight: 400) {
	//           ...GatsbyImageSharpFluid
	//         }
	//       }
	//     }
	//     castform: file(relativePath: { eq: "templates/castform.png" }) {
	//       childImageSharp {
	//         fluid(maxHeight: 400) {
	//           ...GatsbyImageSharpFluid
	//         }
	//       }
	//     }
	//     glalie: file(relativePath: { eq: "templates/glalie.png" }) {
	//       childImageSharp {
	//         fluid(maxHeight: 400) {
	//           ...GatsbyImageSharpFluid
	//         }
	//       }
	//     }
	//     celebi: file(relativePath: { eq: "templates/celebi.png" }) {
	//       childImageSharp {
	//         fluid(maxHeight: 400) {
	//           ...GatsbyImageSharpFluid
	//         }
	//       }
	//     }
	//   }
	// `);

	const handleClick = (value) => {
		localStorage.setItem('template', value);
		setChange(value);
		dispatch({
			type: 'on_input',
			payload: {
				path: 'metadata.template',
				value,
			},
		});
	};

	return (
		<section onMouseMove={() => changeId(id)}>
			<Heading id={id} part={'right'} />

			<div className="grid grid-cols-2 gap-8">
				{templateOptions.map((x) => (
					<div
						key={x.id}
						tabIndex="0"
						role="button"
						onKeyUp={(e) => handleKeyUp(e, () => handleClick(x.id))}
						onClick={() => handleClick(x.id)}
						className={cx(styles.template, {
							[styles.selected]: template === x.id,
						})}
						style={{ background: change === x.id ? 'yellow' : null }}
					>
						<GatsbyImage
							alt={x.name}
							loading="eager"
							className="w-full"
							style={{ height: '230px' }}
						// fluid={previews[x.id].childImageSharp.fluid}
						/>
						<span style={{ color: change === x.id ? 'black' : null }}>{x.name}</span>
					</div>
				))}
			</div>
		</section>
	);
};

export default memo(Templates);
