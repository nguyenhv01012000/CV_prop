import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import { formatDateRange } from '../../../utils';

export const WorkItem1 = ({ item, language }) => {
    const { t } = useTranslation();
    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="flex flex-col text-left mr-2">
                    <h6 className="font-semibold text-sm">{item.company}</h6>
                    <span className="text-xs">{item.position}</span>
                </div>
                {item.startDate && (
                    <h6 className="text-xs font-medium text-right">
                        ({formatDateRange(
                        {
                            startDate: item.startDate,
                            endDate: item.endDate,
                            language,
                        }, t)})
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

export const WorkItem2 = ({ item, language }) => {
    const { t } = useTranslation();
    return (
        <div className="work-exp">
            <h6>
                {item.position}
                <span>
                    ({formatDateRange(
                    {
                        startDate: item.startDate,
                        endDate: item.endDate,
                        language,
                    }, t)})
                </span>
            </h6>
            <i>{item.company}</i>
            {item.summary && (
                <ReactMarkdown
                    className="markdown mt-2 text-sm"
                    source={item.summary}
                />
            )}
        </div>
    )
}
