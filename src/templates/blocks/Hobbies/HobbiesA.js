import React, { memo, useContext } from 'react';
import PageContext from '../../../contexts/PageContext';
import { safetyCheck } from '../../../utils';
import { HobbyItem1 } from './HobbyItems';

const HobbiesA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.hobbies) ? (
    <>
      <Heading children={data.hobbies.heading} icon={"fa fa-heart"} />
      <div className="grid gap-2">
        {data.hobbies.items.filter(x => x.visible).map(HobbyItem1)}
      </div>
    </>
  ) : null;
};

export default memo(HobbiesA);
