import React, { memo, useContext } from 'react';
import PageContext from '../../../contexts/PageContext';
import { safetyCheck } from '../../../utils';
import { LanguageItem1 } from './LanguagesItems';

const LanguagesA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.languages) ? (
    <>
      <Heading children={data.languages.heading} icon={"fa fa-language"} />
      <div className="grid grid-cols-2 gap-2">
        {data.languages.items.filter(x => x.visible).map(LanguageItem1)}
      </div>
    </>
  ) : null;
};

export default memo(LanguagesA);
