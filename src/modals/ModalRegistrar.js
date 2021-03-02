import React, { memo } from "react"
import AwardModal from "./sections/AwardModal"
// import AuthModal from './AuthModal';
// import ResumeModal from './ResumeModal';
import CertificateModal from "./sections/CertificateModal"
import EducationModal from "./sections/EducationModal"
import ExportModal from "./sections/ExportModal"
import HobbyModal from "./sections/HobbyModal"
import ImportModal from "./sections/ImportModal"
import LanguageModal from "./sections/LanguageModal"
import ProjectModal from "./sections/ProjectModal"
import ReferenceModal from "./sections/ReferenceModal"
import SkillModal from "./sections/SkillModal"
import SocialModal from "./sections/SocialModal"
import WorkModal from "./sections/WorkModal"
import PublicationModal from './sections/PublicationModal'
import CourseModal from './sections/CourseModal'
import ResearchModal from './sections/ResearchModal'
import UndergradStudentModal from "./sections/UndergradStudentModal"
import PostgradStudentModal from "./sections/PostgradStudentModal"
import TopicModal from "./sections/TopicModal"


const ModalRegistrar = () => (
	<>
		<AwardModal />
		<CertificateModal />
		<SocialModal />
		<EducationModal />
		<ExportModal />
		<HobbyModal />
		<ImportModal />
		<LanguageModal />
		<ProjectModal />
		<ReferenceModal />
		<SkillModal />
		<WorkModal />
		<PublicationModal />
		<CourseModal />
		<TopicModal />
		<UndergradStudentModal />
		<PostgradStudentModal />
		<ResearchModal />
		{/* <AuthModal />
    <ResumeModal /> */}
	</>
)

export default memo(ModalRegistrar)
