import React from 'react';
import PageContext from '../contexts/PageContext';
import { hexToRgb } from '../utils';
import AwardsA from './blocks/Awards/AwardsA';
import CertificationsA from './blocks/Certifications/CertificationsA';
import EducationC from './blocks/Education/EducationA';
import HeadingD from './blocks/Heading/HeadingD';
import HobbiesB from './blocks/Hobbies/HobbiesA';
import LanguagesA from './blocks/Languages/LanguagesA';
import ObjectiveA from './blocks/Objective/ObjectiveA';
import ProjectsA from './blocks/Projects/ProjectsA';
import ReferencesA from './blocks/References/ReferencesA';
import SkillsA from './blocks/Skills/SkillsA';
import WorkA from './blocks/Work/WorkA';
import PublicationA from './blocks/Publications/PublicationA';
import CoursesA from './blocks/Courses/CoursesA';
import ResearchA from './blocks/Researchs/ResearchA';
import UndergradStudentsA from './blocks/UndergradStudents/UndergradStudentsA';
import PostgradStudentsA from './blocks/PostgradStudents/PostgradStudentsA';
import TopicA from './blocks/Topic/TopicA';

import logo from './assets/images/1.jpg';
import './assets/css/bootstrap.min.css';
import './assets/css/fontawsom-all.min.css';
import './assets/css/Xuka.css';

const Blocks = {
	objective: ObjectiveA,
	work: WorkA,
	education: EducationC,
	projects: ProjectsA,
	awards: AwardsA,
	certifications: CertificationsA,
	skills: SkillsA,
	hobbies: HobbiesB,
	languages: LanguagesA,
	references: ReferencesA,
	publications: PublicationA,
	courses: CoursesA,
	research: ResearchA,
	topic: TopicA,
	undergradStudents: UndergradStudentsA,
	postgradStudents: PostgradStudentsA,
};

const Xuka = ({ data }) => {
	const layout = data.metadata.layout.glalie;
	const { r, g, b } = hexToRgb(data.metadata.colors.primary) || {};

	const Profile = () => (
		<>
			<HeadingD>{data.profile.heading}</HeadingD>
			<p>
				{data.profile.fullName}<br />
				{data.profile.phone ? data.profile.phone : ""}
			</p>
			{(data.profile.address.line1 || data.profile.address.line2 || data.profile.address.city) ?
				<>
					<p>{data.profile.address.line1} <br /> {data.profile.address.line2}</p>
					<span>{data.profile.address.city}</span>
				</> : null
			}
			{data.profile.email ? <p>{data.profile.email}</p> : null}
			<HeadingD>Social Media</HeadingD>
			<p>fb.com/andrewrobertson</p>
			<p>twitter@andrewrobertson</p>
			<p>instagram@andrewrobertson</p>
			<p>pintrest@andrewrobertson</p>
		</>
	)

	return (
		<PageContext.Provider value={{ data, heading: HeadingD }}>
			<div className="container-fluid overcover" >
				<div className="container profile-box" style={{
					fontFamily: data.metadata.font,
					color: data.metadata.colors.text,
					background: data.metadata.colors.background,
				}}>
					<div className="cover-image row">
						<img src={logo} alt="" />
					</div>
					<div className="row">
						<div className="col-lg-8 col-md-7 detail-px no-padding">
							{layout[0] && layout[1].map((x) => {
								const Component = Blocks[x];
								return Component && <Component key={x} />;
							})}
						</div>
						<div className="col-lg-4 col-md-5 leftgh">
							<div className="img-box">
								<img src={data.profile.photograph} alt={data.profile.fullName} />
							</div>
							<div className="name-det">
								<Profile />
								{layout[0] && layout[0].map((x) => {
									const Component = Blocks[x];
									return Component && <Component key={x} />;
								})}
							</div>
						</div>
					</div>
				</div>
			</div>

		</PageContext.Provider>
	);
};

export default Xuka;
