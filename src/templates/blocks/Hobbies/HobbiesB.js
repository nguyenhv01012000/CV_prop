import React, { memo, useContext } from 'react';
import PageContext from '../../../contexts/PageContext';
import { safetyCheck } from '../../../utils';
import { HobbyItem1 } from './HobbyItems';

const HobbiesB = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.hobbies) ? (
    <>
      <Heading children={data.hobbies.heading} icon={"fa fa-heart"} />
      <div className="hoby row no-margin">
        {data.hobbies.items.filter(x => x.visible).map(HobbyItem1)}
      </div>
    </>
  ) : null;
};

export default memo(HobbiesB);
