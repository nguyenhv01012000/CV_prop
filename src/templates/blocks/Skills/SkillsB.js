import React, { memo, useContext } from 'react';
import PageContext from '../../../contexts/PageContext';
import { SkillItem2 } from './SkillItems';
import { safetyCheck } from '../../../utils';

const SkillsB = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.skills) ? (
    <div>
      <Heading>{data.skills.heading}</Heading>
      <ul>{data.skills.items.filter(x => x.visible).map(SkillItem2)}</ul>
    </div>
  ) : null;
};

export default memo(SkillsB);
