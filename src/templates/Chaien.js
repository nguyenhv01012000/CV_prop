import React from 'react';
import PageContext from '../contexts/PageContext';
import { hexToRgb } from '../utils';
import AwardsA from './blocks/Awards/AwardsA';
import CertificationsA from './blocks/Certifications/CertificationsA';
import ContactE from './blocks/Contact/ContactE';
import EducationB from './blocks/Education/EducationB';
import Heading2 from './blocks/Heading/Heading2';
import HobbiesA from './blocks/Hobbies/HobbiesA';
import LanguagesA from './blocks/Languages/LanguagesA';
import ProjectsA from './blocks/Projects/ProjectsA';
import ReferencesA from './blocks/References/ReferencesA';
import SkillsD from './blocks/Skills/SkillsD';
import WorkB from './blocks/Work/WorkB';
import PublicationA from './blocks/Publications/PublicationA';
import CoursesA from './blocks/Courses/CoursesA';
import ResearchA from './blocks/Researchs/ResearchA';
import UndergradStudentsA from './blocks/UndergradStudents/UndergradStudentsA';
import PostgradStudentsA from './blocks/PostgradStudents/PostgradStudentsA';
import TopicA from './blocks/Topic/TopicA';

import './assets/css/bootstrap.min.css';
import './assets/css/fontawsom-all.min.css';
import './assets/css/Chaien.css';

const Blocks = {
	work: WorkB,
	education: EducationB,
	projects: ProjectsA,
	awards: AwardsA,
	certifications: CertificationsA,
	skills: SkillsD,
	hobbies: HobbiesA,
	languages: LanguagesA,
	references: ReferencesA,
	publications: PublicationA,
	courses: CoursesA,
	research: ResearchA,
	topic: TopicA,
	undergradStudents: UndergradStudentsA,
	postgradStudents: PostgradStudentsA,
};

const Chaien = ({ data }) => {
	const layout = data.metadata.layout.chaien;
	const { r, g, b } = hexToRgb(data.metadata.colors.primary) || {};

	const Photo = () => (
		<div className="grid gap-2 text-center" >
			{data.profile.photograph !== '' && (
				<img className="w-40 h-40 rounded-full mx-auto"
					src={data.profile.photograph}
					alt={data.profile.fullName}
				/>
			)}
			<div className="text-4xl font-bold leading-none">
				<h1>{data.profile.fullName}</h1>
			</div>
			<div className="tracking-wide text-xs uppercase font-medium">
				{data.profile.subtitle}
			</div>
		</div>
	);

	const Profile = () => (
		<>
			<Heading2>{data.profile.heading}</Heading2>
			{data.profile.phone ?
				<div className="contact-box pb0">
					<div className="icon">
						<i className="fas fa-phone" />
					</div>
					<div className="detail">
						{data.profile.phone}
					</div>
				</div> : null}

			{data.profile.email ?
				<div className="contact-box pb0">
					<div className="icon">
						<i className="fas fa-globe-americas" />
					</div>
					<div className="detail">
						{data.profile.email}
					</div>
				</div> : null}

			{(data.profile.address.line1 || data.profile.address.line2 || data.profile.address.city) ?
				<div className="contact-box">
					<div className="icon">
						<i className="fas fa-map-marker-alt" />
					</div>
					<div className="detail">
						<p >{data.profile.address.line1} <br />{data.profile.address.line2}</p>
						<span >
							{data.profile.address.city}
						</span>
					</div>
				</div> : null}
		</>
	)

	return (
		<PageContext.Provider value={{ data, heading: Heading2 }}>
			<div className="container-fluid overcover">
				<div className="container profile-box" style={{
					paddingRight: '20px',
					fontFamily: data.metadata.font,
					color: data.metadata.colors.text,
					background: data.metadata.colors.background
				}}>
					<div className="row">
						<div className="col-md-4 left-co" style={{ backgroundColor: `rgba(${r + 40}, ${g + 40}, ${b + 40}, 0.6)` }}>
							<div className="left-side" style={{ backgroundColor: 'transparent' }}>
								<Photo />
								<Profile />
								<ContactE />

								{layout[0] && layout[0].map((x) => {
									const Component = Blocks[x];
									return Component && <Component key={x} />;
								})}
							</div>
						</div>
						<div className="col-md-8 rt-div">
							<div className="rit-cover">
								<Heading2 children={data.objective.heading} icon="far fa-user" />
								<div className="about">
									<p>{data.objective.body}</p>
								</div>

								{layout[1] && layout[1].map((x) => {
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

export default Chaien;
