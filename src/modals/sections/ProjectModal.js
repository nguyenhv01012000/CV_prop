import { Formik } from 'formik';
import React, { memo } from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import Input from '../../components/shared/Input';
import ModalEvents from '../../constants/ModalEvents';
import { getFieldProps } from '../../utils';
import DataModal from '../DataModal';

const initialValues = {
  title: '',
  authors: '',
  idNumber: '',
  mainAuthor: '',
  duration: 0,
  issuedDate: '',
  projectTypeItem: '',
  projectLevelItem: ''
};

const ProjectModal = () => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    title: Yup.string().required(t('shared.forms.validation.required')),
    authors: Yup.string().url(t('shared.forms.validation.required')),
    mainAuthor: Yup.string().url(t('shared.forms.validation.required')),
    idNumber: Yup.string().url(t('shared.forms.validation.required')),
    duration: Yup.number(),
    issuedDate: Yup.date().max(new Date()),
    projectTypeItem: Yup.string(),
    projectLevelItem: Yup.string()
  });

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataModal
          name={t('builder.sections.project')}
          path="projects.items"
          event={ModalEvents.PROJECT_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t('shared.forms.title')}
              className="col-span-2"
              placeholder="Reactive Resume"
              {...getFieldProps(formik, schema, 'title')}
            />

            <Input
              label={t('builder.projects.author')}
              placeholder={t('builder.projects.authorPlaceholder')}
              {...getFieldProps(formik, schema, 'authors')}
            />

            <Input
              label={t('builder.projects.mainAuthor')}
              placeholder={t('builder.projects.mainAuthorPlaceholder')}
              {...getFieldProps(formik, schema, 'mainAuthor')}
            />

            <Input
              label={t('builder.projects.duration')}
              placeholder={t('builder.projects.durationPlaceholder')}
              {...getFieldProps(formik, schema, 'duration')}
            />

            <Input
              type="date"
              label={t('builder.projects.issuedDate')}
              className={t('builder.projects.issuedDatePlaceholder')}
              {...getFieldProps(formik, schema, 'issuedDate')}
            />

            <Input
              label={t('builder.projects.projectTypeItem')}
              className={t('builder.projects.projectTypeItemPlaceholder')}
              {...getFieldProps(formik, schema, 'projectTypeItem')}
            />

            <Input
              label={t('builder.projects.projectLevelItem')}
              className={t('builder.projects.projectLevelItemPlaceholder')}
              {...getFieldProps(formik, schema, 'projectLevelItem')}
            />
          </div>
        </DataModal>
      )}
    </Formik>
  );
};

export default memo(ProjectModal);
