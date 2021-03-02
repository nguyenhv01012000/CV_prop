import React, { memo, useContext } from 'react';
import PageContext from '../../../contexts/PageContext';

const HeadingC = ({ children }) => {
	const { data } = useContext(PageContext);

	return (
		<h6 className={"my-2 text-md font-semibold uppercase"}
			style={{ 
				color: data.metadata.colors.primary, 
				borderBottom: `3px solid ${data.metadata.colors.primary}`
			}}>
			{children}
		</h6>
	)
};

export default memo(HeadingC);
