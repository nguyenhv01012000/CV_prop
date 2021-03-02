import React from 'react';
import PageContext from '../contexts/PageContext';
import { hexToRgb } from '../utils';
import { useTranslation } from 'react-i18next';
import ContactE from './blocks/Contact/ContactE';
import SkillsC from './blocks/Skills/SkillsC';
import EducationA from './blocks/Education/EducationA';
import CertificationsA from './blocks/Certifications/CertificationsA';
import WorkA from './blocks/Work/WorkA';
import ReferencesA from './blocks/References/ReferencesA';
import AwardsA from './blocks/Awards/AwardsA';
import LanguagesA from './blocks/Languages/LanguagesA';
import ObjectiveA from './blocks/Objective/ObjectiveA';
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
import './assets/css/Nobita.css';

const Blocks = {
	objective: ObjectiveA,
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

const Nobita = ({ data }) => {
	const { t } = useTranslation();
	const layout = data.metadata.layout.nobita;
	const { r, g, b } = hexToRgb(data.metadata.colors.primary) || {};

	const Photo = () => (
		<>
			<img src={data.profile.photograph} alt={data.profile.fullName} />
			<div className="name-det">
				<h2>{data.profile.fullName}</h2>
				<p>{data.profile.subtitle}</p>
				<p>{data.profile.birthDate}</p>
			</div>
		</>
	)

	const Profile = () => (
		<>
			<div className="left-title" >
				<Heading1>{data.profile.heading}</Heading1>
			</div>
			<div className="contact-box">
				{data.profile.phone ?
					<div>
						<i className="fas fa-phone-volume" style={{ color: data.metadata.colors.primary }} />
						<p>{data.profile.phone}</p>
					</div> : null
				}
				{(data.profile.website || data.profile.email) ?
					<div>
						<i className="fas fa-envelope" style={{ color: data.metadata.colors.primary }} />
						<p>{data.profile.website}<br /> {data.profile.email}</p>
					</div> : null
				}
				{(data.profile.address.line1 || data.profile.address.line2 || data.profile.address.city) ?
					<div>
						<i className="fas fa-map-marker-alt" style={{ color: data.metadata.colors.primary }} />
						<p>{data.profile.address.line1} <br />{data.profile.address.line2}
						</p>
						<span>
							{data.profile.address.city}
						</span>
					</div> : null
				}
			</div>
		</>
	)

	return (
		<PageContext.Provider value={{ data, heading: Heading1 }}>
			<div className="" >
				<div className="container profile-box" style={{
					fontFamily: data.metadata.font,
					color: data.metadata.colors.text,
					background: data.metadata.colors.background,
				}}>
					<div className="profile-cover">
						<div className="line-1" style={{ background: data.metadata.colors.primary }} />
						<div className="line-2" style={{ background: data.metadata.colors.primary }} />
						<div className="prifile-image row">
							<div className=" col-md-12 col-lg-4 left-box">
								<Photo />
								<Profile />
								<ContactE />
								{layout[0] && layout[0].map((x) => {
									const Component = Blocks[x];
									return Component && <Component key={x} />;
								})}
							</div>
							<div className="col-lg-8 col-md-12">
								<div className="right-container" style={{ borderLeft: `3px solid ${data.metadata.colors.primary}` }}>
									{layout[1] && layout[1].map((x) => {
										const Component = Blocks[x];
										return Component && <Component key={x} />;
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PageContext.Provider>
	);
};

export default Nobita;
