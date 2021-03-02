import React from 'react';

export const LanguageItem1 = (x) => (
    <div key={x.id} className="flex flex-col">
      <h6 className="font-semibold text-sm">{x.name}</h6>
      <span className="text-xs">{x.fluency}</span>
    </div>
  );
