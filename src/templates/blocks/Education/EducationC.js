import React, { memo, useContext } from 'react';
import PageContext from '../../../contexts/PageContext';
import { safetyCheck } from '../../../utils';
import { EducationItem3 } from './EducationItems';

const EducationC = () => {
    const { data, heading: Heading } = useContext(PageContext);

    return safetyCheck(data.education) ? (
        <>
            <Heading children={data.education.heading} icon={'fas fa-graduation-cap'} />
            {data.education.items.filter(x => x.visible).map((x) => (
                <EducationItem3 key={x.id} item={x} language={data.metadata.language} />
            ))}
        </>
    ) : null;
};

export default memo(EducationC);
