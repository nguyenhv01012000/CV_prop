import React, { memo, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import PageContext from '../../../contexts/PageContext';
import { formatDate, safetyCheck } from '../../../utils';
import { useTranslation } from "react-i18next"

const ProjectItem = ({ item, language }) => {
  const { t } = useTranslation()
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col text-left mr-2">
          <h6 className="font-semibold text-sm">{item.title}</h6>
          <h6 className="text-sm">Main author: {item.mainAuthor}</h6>
          <h6 className="text-xs">Authors: {item.authors}</h6>
        </div>
        {item.date && (
          <h6 className="text-xs font-medium text-right">
            (
            {formatDate({ date: item.issuedDate, language })}
            )
          </h6>
        )}
      </div>
      {item.summary && (
        <ReactMarkdown
          className="markdown mt-2 text-sm"
          source={item.summary}
        />
      )}
    </div>
  );
};

const ProjectsA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.projects) ? (
    <div>
      <Heading children={data.projects.heading} icon={"fa fa-tasks"} />
      <div className="grid gap-4">
        {data.projects.items.filter(x => x.visible).map((x) => (
          <ProjectItem key={x.id} item={x} language={data.metadata.language} />
        ))}
      </div>
    </div>
  ) : null;
};

export default memo(ProjectsA);
