import React, { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import PageContext from '../../../contexts/PageContext';
import { formatDateRange, safetyCheck } from '../../../utils';

const TopicItem = ({ item, language }) => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col text-left mr-2">
          <h6 className="font-semibold text-sm">{item.title}</h6>
          <p className="text-xs">{item.programs}</p>
          <span className="text-xs">{t("builder.topic.collaboration")}: {item.collaboration} - {t("builder.topic.studentNum")}: {item.studentNum}</span>
        </div>
      </div>
      
      {item.description && (
        <ReactMarkdown
          className="markdown mt-2 text-sm"
          source={item.description}
        />
      )}
    </div>
  );
};

const TopicA = () => {
  const { data, heading: Heading } = useContext(PageContext);

  return safetyCheck(data.topic) ? (
    <div>
      <Heading children={data.topic.heading} icon={"fa fa-paint-brush"} />
      <div className="grid gap-4">
        {data.topic.items.filter(x => x.visible).map((x) => (
          <TopicItem key={x.id} item={x} language={data.metadata.language} />
        ))}
      </div>
    </div>
  ) : null;
};

export default memo(TopicA);
