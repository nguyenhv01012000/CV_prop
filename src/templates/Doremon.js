import React from 'react';
import PageContext from '../contexts/PageContext';
import { hexToRgb } from '../utils';
import ReactMarkdown from 'react-markdown';
import SkillsC from './blocks/Skills/SkillsC';
import EducationA from './blocks/Education/EducationA';
import CertificationsA from './blocks/Certifications/CertificationsA';
import WorkA from './blocks/Work/WorkA';
import ReferencesA from './blocks/References/ReferencesA';
import AwardsA from './blocks/Awards/AwardsA';
import LanguagesA from './blocks/Languages/LanguagesA';
import ContactE from './blocks/Contact/ContactE';
import Heading1 from './blocks/Heading/Heading1';
import HobbiesA from './blocks/Hobbies/HobbiesA';
import CoursesA from './blocks/Courses/CoursesA';
import ResearchA from './blocks/Researchs/ResearchA';
import ProjectsA from './blocks/Projects/ProjectsA';
import PublicationsA from './blocks/Publications/PublicationA';
import TopicA from './blocks/Topic/TopicA';
import UndergradStudentsA from './blocks/UndergradStudents/UndergradStudentsA';
import PostgradStudentsA from './blocks/PostgradStudents/PostgradStudentsA';

import './assets/css/bootstrap.min.css';
import './assets/css/fontawsom-all.min.css';
import './assets/css/Doremon.css';

const Blocks = {
	work: WorkA,
	education: EducationA,
	awards: AwardsA,
	certifications: CertificationsA,
	skills: SkillsC,
	languages: LanguagesA,
	references: ReferencesA,
	hobbies: HobbiesA,
	courses: CoursesA,
	research: ResearchA,
	projects: ProjectsA,
	publications: PublicationsA,
	topic: TopicA,
	undergradStudents: UndergradStudentsA,
	postgradStudents: PostgradStudentsA,
};

const Doremon = ({ data }) => {
	const Profile = () => (
		<div className="col-md-4 scov" >
			<ul >
				{(data.profile.address.line1 || data.profile.address.line2 || data.profile.address.city) ?
					<li >
						<div className="icon">
							<i className="fas fa-map-marker-alt" />
						</div>
						<div className="detail">
							<p >{data.profile.address.line1} <br />{data.profile.address.line2}</p>
							<span >{data.profile.address.city}</span>
						</div>
					</li> : null}
				{data.profile.phone ?
					<li >
						<div className="icon">
							<i className="fas fa-mobile-alt" />
						</div>
						<div className="detail">
							{data.profile.phone}
						</div>
					</li> : null}
				{data.profile.email ?
					<li >
						<div className="icon">
							<i className="far fa-envelope" />
						</div>
						<div className="detail">
							{data.profile.email}
						</div>
					</li> : null}
				{data.profile.website ?
					<li >
						<div className="icon">
							<i className="fas fa-globe-americas" />
						</div>
						<div className="detail">
							{data.profile.website}
						</div>
					</li> : null}
				{data.profile.birthDate ?
					<li >
						<div className="icon">
							<i className="fa fa-birthday-cake" />
						</div>
						<div className="detail">
							{data.profile.birthDate}
						</div>
					</li> : null}
			</ul>
			<div className="styl-bb" style={{ background: data.metadata.colors.primary }} />
		</div>
	)

	const Photo = () => (
		<div className="col-md-8">
			<div className="row profile-go">
				<div className="col-md-4">
					<img src={data.profile.photograph} alt={data.profile.fulltName} />
				</div>
				<div className="col-md-8 datadiv">
					<h2 style={{ color: data.metadata.colors.primary }}>
						{data.profile.fullName} / {data.profile.subtitle}
					</h2>
					<ReactMarkdown
						className="markdown text-sm"
						source={data.objective.body}
					/>
				</div>
			</div>
		</div>
	)

	const layout = data.metadata.layout.doremon;
	const { r, g, b } = hexToRgb(data.metadata.colors.primary) || {};
	return (
		<PageContext.Provider value={{ data, heading: Heading1 }}>
			<div className="container-fluid overcover" >
				<div className=" profile-box " style={{
					fontFamily: data.metadata.font,
					color: data.metadata.colors.text,
					background: data.metadata.colors.background,
					paddingRight: '20px'
				}}>
					<div className="row top-prof">
						<Profile />
						<Photo />
					</div>
					{/* <ContactE /> */}
					<div className="row more-detail">
						<div className="col-md-5" >
							<div style={{ marginLeft: '10px' }}>
								{layout[0] && layout[0].map((x) => {
									const Component = Blocks[x];
									return Component && <Component key={x} />;
								})}</div>
						</div>
						<div className="col-md-7">
							{layout[1] && layout[1].map((x) => {
								const Component = Blocks[x];
								return Component && <Component key={x} />;
							})}
						</div>
					</div>
				</div>
			</div>
		</PageContext.Provider>
	);
};

export default Doremon;
