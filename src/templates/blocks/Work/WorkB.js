import React, { memo, useContext } from 'react';
import { WorkItem2 } from './WorkItems';
import PageContext from '../../../contexts/PageContext';
import { safetyCheck } from '../../../utils';

const WorkB = () => {
    const { data, heading: Heading } = useContext(PageContext);
  
    return safetyCheck(data.work) ? (
      <div>
        <Heading children={data.work.heading} icon={"fas fa-briefcase"} />
          {data.work.items.filter(x => x.visible).map((x) => (
            <WorkItem2 key={x.id} item={x} language={data.metadata.language} />
          ))}
      </div>
    ) : null;
  };
  
  export default memo(WorkB);
