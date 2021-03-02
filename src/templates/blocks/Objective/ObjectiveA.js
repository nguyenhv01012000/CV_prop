import React, { memo, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import PageContext from '../../../contexts/PageContext';
import { safetyCheck } from '../../../utils';
 
const ObjectiveA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return (
    safetyCheck(data.objective, 'body') && (
      <>
        <Heading children={data.objective.heading} icon={"fa fa-asterisk"} />
        <ReactMarkdown
          className="markdown text-sm"
          source={data.objective.body}
        />
      </>
    )
  );
};

export default memo(ObjectiveA);
