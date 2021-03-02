import React, { memo, useContext } from 'react';
import PageContext from '../../../contexts/PageContext';
import { safetyCheck } from '../../../utils';
import { SkillItem3 } from './SkillItems';

const SkillsD = () => {
    const { data, heading: Heading } = useContext(PageContext);

    return safetyCheck(data.skills) ? (
        <div>
            <Heading children={data.skills.heading} icon={"fa fa-american-sign-language-interpreting"} />
            <div className="profess-cover row no-margin">
                {data.skills.items.filter(x => x.visible).map(SkillItem3)}
            </div>
        </div>
    ) : null;
};

export default memo(SkillsD);
