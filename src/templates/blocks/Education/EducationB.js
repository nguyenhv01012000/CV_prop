import React, { memo, useContext } from 'react';
import PageContext from '../../../contexts/PageContext';
import { safetyCheck } from '../../../utils';
import { EducationItem2 } from './EducationItems';

const EducationB = () => {
    const { data, heading: Heading } = useContext(PageContext);

    return safetyCheck(data.education) ? (
        <div>
            <Heading children={data.education.heading} icon={'fas fa-graduation-cap'} />
            <div className="education">
                <ul className="row no-margin">
                    {data.education.items.filter(x => x.visible).map((x) => (
                        <EducationItem2
                            key={x.id}
                            item={x}
                            language={data.metadata.language}
                        />
                    ))}
                </ul>
            </div>
        </div>
    ) : null;
};

export default memo(EducationB);
