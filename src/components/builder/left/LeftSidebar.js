import React, { Fragment, memo, useState } from 'react';
import { useSelector } from '../../../contexts/ResumeContext';
import { Element } from 'react-scroll';

//import sections from '../../../data/leftSections';
import LeftNavbar from './LeftNavbar';
import styles from './LeftSidebar.module.css';
import Awards from './sections/Awards';
import Certifications from './sections/Certifications';
import Education from './sections/Education';
import Hobbies from './sections/Hobbies';
import Languages from './sections/Languages';
import Objective from './sections/Objective';
import Profile from './sections/Profile';
import Projects from './sections/Projects';
import References from './sections/References';
import Skills from './sections/Skills';
import Social from './sections/Social';
import Work from './sections/Work';
import Publications from './sections/Publications';
import Courses from './sections/Courses';
import Research from './sections/Research';
import UndergradStudents from './sections/UndergradStudents';
import PostgradStudents from './sections/PostgradStudents';
import Topic from './sections/Topic';
import About from './sections/About';

const getComponent = (id) => {
  switch (id) {
    case 'profile':
      return Profile;
    case 'social':
      return Social;
    case 'objective':
      return Objective;
    case 'work':
      return Work;
    case 'education':
      return Education;
    case 'projects':
      return Projects;
    case 'awards':
      return Awards;
    case 'certifications':
      return Certifications;
    case 'skills':
      return Skills;
    case 'hobbies':
      return Hobbies;
    case 'languages':
      return Languages;
    case 'references':
      return References;
    case 'publications':
      return Publications;
    case 'courses':
      return Courses;
    case 'research':
      return Research;
    case 'undergradStudents':
      return UndergradStudents;
    case 'postgradStudents':
      return PostgradStudents;
    case 'topic':
      return Topic;
    case 'about':
      return About;
    default:
      throw new Error();
  }
};



const LeftSidebar = () => {

  const [id, setId] = useState();
  const state = useSelector();
  const { sectionsLeft } = state;
  const changeId = (id) => {
    setId(id);
  }
  const SidebarSection = ({ id, event }) => {
    const Component = getComponent(id);

    return (
      <Fragment key={id}>
        <Element name={id}>
          <Component id={id} event={event} changeId={changeId} />
        </Element>
        <hr />
      </Fragment>
    );
  };
  return (
    <div className="flex">
      <LeftNavbar mouse={id} />

      <div id="LeftSidebar" className={styles.container}>
        {sectionsLeft.map(SidebarSection)}
      </div>
    </div>
  );
}
export default memo(LeftSidebar);
