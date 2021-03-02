import React, { memo, useContext } from 'react';
import PageContext from '../../../contexts/PageContext';

const Heading2 = ({ children, icon = 'far fa-user' }) => {
    const { data } = useContext(PageContext);
    return (
        <h2 className="rit-titl" style={{ color: data.metadata.colors.primary }}>
            <i className={icon} />
            {children}
        </h2>
    )
}

export default memo(Heading2);
