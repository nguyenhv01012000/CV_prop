import React, { memo, useContext } from 'react';
import { WorkItem1 } from './WorkItems';
import PageContext from '../../../contexts/PageContext';
import { safetyCheck } from '../../../utils';

const WorkA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.work) ? (
    <div>
      <Heading children={data.work.heading} icon={"fas fa-briefcase"} />
      <div className="grid gap-4">
        {data.work.items.filter(x => x.visible).map((x) => (
          <WorkItem1 key={x.id} item={x} language={data.metadata.language} />
        ))}
      </div>
    </div>
  ) : null;
};

export default memo(WorkA);
