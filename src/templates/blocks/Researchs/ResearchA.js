import React, { memo, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import PageContext from '../../../contexts/PageContext';
import { safetyCheck } from '../../../utils';
import { useTranslation } from 'react-i18next';

const ResearchItem = ({ item, language }) => {
    const { t } = useTranslation();
    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="flex flex-col text-left mr-2">
                    <h6 className="font-semibold text-sm">{item.name}</h6>
                    <span className="text-xs">{item.isMainResearch ? t('builder.research.mainResearch'): t('builder.research.relateResearch')}</span>
                </div>
            </div>
            {item.semester && (
                <ReactMarkdown className="markdown mt-2 text-sm" source={item.semester} />
            )}
        </div>
    )
}

const ResearchA = () => {
    const { data, heading: Heading } = useContext(PageContext);

    return safetyCheck(data.research) ? (
        <>
            <Heading children={data.research.heading} icon={"fa fa-binoculars"} />
            <div className="grid gap-4">
                {data.research.items.filter(x => x.visible).map((x) => (
                    <ResearchItem key={x.id} item={x} language={data.metadata.language} />
                ))}
            </div>
        </>
    ) : null;
}

export default memo(ResearchA);
