import React, { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import PageContext from '../../../contexts/PageContext';
import { hasAddress, safetyCheck, hexToRgb } from '../../../utils';
import BirthDateA from '../BirthDate/BirthDateA';

const ContactItem = ({ value, label, link, style }) => {
	const { r, g, b } = hexToRgb(style.primary) || {};
	return (
		value ? (
			<div className="flex flex-col">
				<h6 className="capitalize font-semibold">{label}</h6>
				{link ? (
					<a href={link} target="_blank" rel="noopener noreferrer" style={{ color: `rgba(${r - 50}, ${g - 50}, ${b - 50})`, }}>
						<span className="font-medium break-all">{value}</span>
					</a>
				) : (
						<span className="font-medium break-all" 
						style={{ backgroundColor: `rgba(${r - 40}, ${g - 40}, ${b - 40}, 0.8)`, }}>{value}</span>
					)}
			</div>) : null
	)
}

const ContactC = () => {
	const { t } = useTranslation();
	const { data } = useContext(PageContext);

	return (
		<div className="text-xs grid gap-2">
			{hasAddress(data.profile.address) && (
				<div>
					<h6 className="capitalize font-semibold">
						{t('shared.forms.address')}
					</h6>
					<div className="flex flex-col text-xs">
						<span>{data.profile.address.line1}</span>
						<span>{data.profile.address.line2}</span>
						<span>{data.profile.address.city}</span>
					</div>
				</div>
			)}

			<ContactItem
				label={t('shared.forms.phone')}
				value={data.profile.phone}
				link={`tel:${data.profile.phone}`}
				style={data.metadata.colors}
			/>
			<ContactItem
				label={t('shared.forms.website')}
				value={data.profile.website}
				link={data.profile.website}
				style={data.metadata.colors}
			/>
			<ContactItem
				label={t('shared.forms.email')}
				value={data.profile.email}
				link={`mailto:${data.profile.email}`}
				style={data.metadata.colors}
			/>

			<BirthDateA />

			{safetyCheck(data.social) &&
				data.social.items.map((x) => (
					<ContactItem
						key={x.id}
						value={x.username}
						label={x.network}
						link={x.url}
						style={data.metadata.colors}
					/>
				))}
		</div>
	);
};

export default memo(ContactC);
