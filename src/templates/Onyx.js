import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import PageContext from '../contexts/PageContext';
import AwardsA from './blocks/Awards/AwardsA';
import CertificationsA from './blocks/Certifications/CertificationsA';
import Contact from './blocks/Contact/ContactA';
import EducationA from './blocks/Education/EducationA';
import HeadingA from './blocks/Heading/HeadingA';
import HobbiesA from './blocks/Hobbies/HobbiesA';
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

import { hasAddress } from '../utils';

const Blocks = {
	objective: ObjectiveA,
	work: WorkA,
	education: EducationA,
	projects: ProjectsA,
	awards: AwardsA,
	certifications: CertificationsA,
	skills: SkillsA,
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

const Onyx = ({ data }) => {
	const { t } = useTranslation();
	const layout = data.metadata.layout.onyx;

	return (
		<PageContext.Provider value={{ data, heading: HeadingA }}>
			<div
				id="page"
				className="p-8 rounded"
				style={{
					fontFamily: data.metadata.font,
					color: data.metadata.colors.text,
					backgroundColor: data.metadata.colors.background,
				}}
			>
				<div className="grid grid-cols-4 items-center">
					<div className="col-span-3 flex items-center">
						{data.profile.photograph && (
							<img
								className="rounded object-cover mr-4"
								src={data.profile.photograph}
								alt="Resume Photograph"
								style={{ width: '120px', height: '120px' }}
							/>
						)}

						<div className="font-bold text-4xl">
							<h1 style={{ color: data.metadata.colors.primary }}>
								{data.profile.fullName}
							</h1>
							<h6 className="font-medium text-sm" style={{ color: data.metadata.colors.primary }}>
								{data.profile.subtitle}
							</h6>
							{hasAddress(data.profile.address) && (
								<div className="flex flex-col mt-4 text-xs">
									<h6 className="font-bold text-xs uppercase tracking-wide mb-1">
										{t('shared.forms.address')}
									</h6>
									<span>{data.profile.address.line1}</span>
									<span>{data.profile.address.line2}</span>
									<span>{data.profile.address.city}</span>
								</div>
							)}
						</div>
					</div>

					<Contact />
				</div>

				<hr
					className="my-5 opacity-25"
					style={{ borderColor: data.metadata.colors.text }}
				/>

				<div className="grid gap-4">
					{layout[0] &&
						layout[0].map((x) => {
							const Component = Blocks[x];
							return Component && <Component key={x} />;
						})}

					<div className="grid grid-cols-2 gap-4">
						{layout[1] &&
							layout[1].map((x) => {
								const Component = Blocks[x];
								return Component && <Component key={x} />;
							})}
					</div>

					{layout[2] &&
						layout[2].map((x) => {
							const Component = Blocks[x];
							return Component && <Component key={x} />;
						})}
				</div>
			</div>
		</PageContext.Provider>
	);
};

export default memo(Onyx);
