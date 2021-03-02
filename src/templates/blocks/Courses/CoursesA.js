import React, { memo, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import PageContext from '../../../contexts/PageContext';
import { safetyCheck } from '../../../utils';
import { useTranslation } from 'react-i18next';

const CourseItem = ({ item, language }) => {
    const { t } = useTranslation();

    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="flex flex-col text-left mr-2">
                    <h6 className="font-semibold text-sm">{item.name}</h6>
                    <span className="text-xs">{t("builder.courses.coursesId")}: {item.courseId} - {t("builder.courses.classId")}: {item.classId}</span>
                </div>
            </div>
            {item.semester && (
                <ReactMarkdown className="markdown mt-2 text-sm" source={item.semester} />
            )}
        </div>
    )
}

const CoursesA = () => {
    const { data, heading: Heading } = useContext(PageContext);

    return safetyCheck(data.courses) ? (
        <>
            <Heading children={data.courses.heading} icon={"fa fa-book"} />
            <div className="grid gap-4">
                {data.courses.items.filter(x => x.visible).map((x) => (
                    <CourseItem key={x.id} item={x} language={data.metadata.language} />
                ))}
            </div>
        </>
    ) : null;
}

export default memo(CoursesA);
