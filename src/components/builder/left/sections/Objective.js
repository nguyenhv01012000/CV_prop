import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import Heading from '../../../shared/Heading';
import Input from '../../../shared/Input';
import VisibleButton from '../../../shared/VisibleButton';

const Objective = ({ id, changeId }) => {
  const { t } = useTranslation();
  const visible = `${id}.visible`;

  return (
    <section onMouseMove={()=>changeId(id)}>
      <Heading id={id} />

      <Input
        name="heading"
        label={t('builder.sections.heading')}
        path={`${id}.heading`}
      />

      <Input
        type="textarea"
        label={t('shared.forms.summary')}
        path="objective.body"
      />
      <VisibleButton path={visible} />
    </section>
  );
};

export default memo(Objective);
