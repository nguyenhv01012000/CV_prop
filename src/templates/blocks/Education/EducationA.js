import React, { memo, useContext } from 'react';
import PageContext from '../../../contexts/PageContext';
import { safetyCheck } from '../../../utils';
import { EducationItem1 } from './EducationItems';

const EducationA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.education) ? (
    <div>
      <Heading children={data.education.heading} icon={'fas fa-graduation-cap'} />
      <div className="grid gap-4">
        {data.education.items.filter(x => x.visible).map((x) => (
          <EducationItem1
            key={x.id}
            item={x}
            language={data.metadata.language}
          />
        ))}
      </div>
    </div>
  ) : null;
};

export default memo(EducationA);
