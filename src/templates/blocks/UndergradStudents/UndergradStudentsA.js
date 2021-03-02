import React, { memo, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import PageContext from '../../../contexts/PageContext';
import { safetyCheck } from '../../../utils';
import { useTranslation } from 'react-i18next';

const UndergradStudentItem = ({ item, language }) => {
    const { t } = useTranslation();
    return(
    <div>
        <div className="flex justify-between items-center">
            <div className="flex flex-col text-left mr-2">
                <h6 className="font-semibold text-sm">{item.fullName}</h6>
                <span className="text-xs">{t("builder.undergradStudents.coursesId")}: {item.courseId} - {t("builder.undergradStudents.coursesId")}: {item.classId}</span>
                <span className="text-xs">{t("builder.undergradStudents.studentId")}: {item.studentId} - {t("builder.undergradStudents.program")} : {item.program}</span>
                <span className="text-xs">{t("builder.undergradStudents.topic")}: {item.topic}</span>
                <span className="text-xs">{t("builder.undergradStudents.semester")}: {item.semester}</span>
            </div>
        </div>
    </div>
)}

const UndergradStudentsA = () => {
    const { data, heading: Heading } = useContext(PageContext);

    return safetyCheck(data.undergradStudents) ? (
        <div>
            <Heading children={data.undergradStudents.heading} icon={"fa fa-child"} />
            <div className="grid gap-4">
                {data.undergradStudents.items.filter(x => x.visible).map((x) => (
                    <UndergradStudentItem key={x.id} item={x} language={data.metadata.language} />
                ))}
            </div>
        </div>
    ) : null;
}

export default memo(UndergradStudentsA);
