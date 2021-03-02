import React, { memo, useContext } from 'react';
import PageContext from '../../../contexts/PageContext';
import { safetyCheck } from '../../../utils';
import { SkillItem1 } from './SkillItems';

const SkillsA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.skills) ? (
    <div>
      <Heading>{data.skills.heading}</Heading>
      <div className="grid grid-cols-2 gap-y-2 gap-x-4">
        {data.skills.items.filter(x => x.visible).map(SkillItem1)}
      </div>
    </div>
  ) : null;
};

export default memo(SkillsA);
