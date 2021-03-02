import React, { memo, useContext } from 'react';
import PageContext from '../../../contexts/PageContext';
import { safetyCheck } from '../../../utils';
import { SkillItem1 } from './SkillItems';

const SkillsC = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.skills) ? (
    <div>
      <Heading children={data.skills.heading} icon={"fa fa-american-sign-language-interpreting"} />
      <div className="profess-cover">
        {data.skills.items.filter(x => x.visible).map(SkillItem1)}
      </div>
    </div>
  ) : null;
};

export default memo(SkillsC);
