import React from 'react';

export const SkillItem1 = (x) => (
	<div key={x.id} className="flex flex-col">
		<h6 className="font-semibold text-sm">{x.name}</h6>
		<span className="text-xs">{x.level}</span>
	</div>
);

export const SkillItem2 = (x) => (
	<li key={x.id} className="text-sm py-1">
		{x.skill}
	</li>
);

export const SkillItem3 = (x) => (
	<div className="col-md-6">
		<div className="prog-row row">
			<div className="col-sm-6">
				{x.skill}
			</div>
			<div className="col-sm-6">
				<div className="progress">
					<div className="progress-bar" role="progressbar" style={{ width: '65%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
				</div>
			</div>
		</div>
	</div>
)
