import React, { memo, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import PageContext from '../../../contexts/PageContext';
import { formatDate, safetyCheck } from '../../../utils';

const PublicationItem = ({ item, language }) => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="flex flex-col text-left mr-2">
                    <h6 className="font-semibold text-sm">{item.title}</h6>
                    <span className="text-xs">{item.authors}</span>
                </div>
                {item.date && (
                    <h6 className="text-xs font-medium text-right">
                        {formatDate({ date: item.issuedDate, language })}
                    </h6>
                )}
            </div>
            {item.summary && (
                <ReactMarkdown className="markdown mt-2 text-sm" source={item.summary} />
            )}
        </div>
    )
}

const PublicationA = () => {
    const { data, heading: Heading } = useContext(PageContext);
    return safetyCheck(data.publications) ? (
        <div>
            <Heading children={data.publications.heading} icon={"fa fa-share-alt"} />
            <div className="grid gap-4">
                {data.publications.items.filter(x => x.visible).map((x) => (
                    <PublicationItem key={x.id} item={x} language={data.metadata.language} />
                ))}
            </div>
        </div>
    ) : null;
}

export default memo(PublicationA);
