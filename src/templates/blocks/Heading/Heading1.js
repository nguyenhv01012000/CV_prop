import React, { memo, useContext } from 'react';
import PageContext from '../../../contexts/PageContext';

const Heading1 = ({ children, icon = 'fa fa-address-book' }) => {
    const { data } = useContext(PageContext);
    return (
        <div className="left-title" >
            <div className="row">
                <div className=" col-2 icob">
                    <i className={icon} style={{ color: data.metadata.colors.primary, fontSize: '32px' }} />
                </div>
                <div className=" col-10 titb">
                    <h3 style={{ borderBottom: `3px solid ${data.metadata.colors.primary}`, color: data.metadata.colors.primary }}>
                        {children}
                    </h3>
                </div>
            </div>
        </div>
    )
};

export default memo(Heading1);
