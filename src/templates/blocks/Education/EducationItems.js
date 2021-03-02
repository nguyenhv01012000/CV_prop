import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { formatDateRange } from '../../../utils';

export const EducationItem1 = ({ item, language }) => {
    const { t } = useTranslation();
    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="flex flex-col text-left mr-2">
                    <h6 className="font-semibold text-sm">{item.institution}</h6>
                    <span className="text-xs">
                        <strong>{item.degree}</strong> {item.field}
                    </span>
                </div>
                <div className="flex flex-col items-end text-right">
                    {item.startDate && (
                        <h6 className="text-xs font-medium mb-1">
                            ({formatDateRange(
                            {
                                startDate: item.startDate,
                                endDate: item.endDate,
                                language,
                            }, t)})
                        </h6>
                    )}
                    <span className="text-sm font-medium">{item.gpa}</span>
                </div>
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

export const EducationItem2 = ({ item, language }) => {
    const { t } = useTranslation();
    return (
        <li className="col-md-12">
            <span>
                ({formatDateRange(
                {
                    startDate: item.startDate,
                    endDate: item.endDate,
                    language,
                }, t)})
                </span> <br />
            {item.institution}
        </li>
    )
}

export const EducationItem3 = ({ item, language }) => {
    const { t } = useTranslation();
    return (
        <div className="fx-ro">
            <div className="detail">
                <b>{item.institution}</b>
                <p>{item.gpa}</p>
            </div>
            <div className="dat">
                ({formatDateRange(
                {
                    startDate: item.startDate,
                    endDate: item.endDate,
                    language,
                }, t)})
            </div>
        </div>
    )
}
