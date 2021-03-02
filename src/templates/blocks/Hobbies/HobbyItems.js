import React from 'react';

export const HobbyItem1 = (x) => (
    <div key={x.id}>
        <h6 className="font-semibold text-sm">{x.name}</h6>
    </div>
);
