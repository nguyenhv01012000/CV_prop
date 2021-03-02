import { Formik } from "formik"
import React, { memo } from "react"
import { useTranslation } from "react-i18next"
import * as Yup from "yup"
import Input from "../../components/shared/Input"
import ModalEvents from "../../constants/ModalEvents"
import { getFieldProps } from "../../utils"
import DataModal from "../DataModal"

const initialValues = {
  title: "",
  authors: "",
  conference: "",
  issuedDate: "",
  url:"",
  summary: ""
}

const PublicationModal = () => {
  const { t } = useTranslation()

  const schema = Yup.object().shape({
    title: Yup.string().required(t("shared.forms.validation.required")),
    authors: Yup.string().required(t("shared.forms.validation.required")),
    conference: Yup.string().required(t("shared.forms.validation.required")),
    issuedDate: Yup.date().max(new Date()),
    url: Yup.string().url(t('shared.forms.validation.url')),
    summary: Yup.string()
  })

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataModal
          name={t("builder.sections.publications")}
          path="publications.items"
          event={ModalEvents.PUBLICATION_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t("shared.forms.title")}
              className="col-span-2"
              placeholder={t('shared.forms.enterTitle')}
              {...getFieldProps(formik, schema, "title")}
            />

            <Input
              label={t("builder.publications.authors")}
              placeholder={t("builder.publications.authorPlaceholder")}
              {...getFieldProps(formik, schema, "authors")}
            />

            <Input
              label={t("builder.publications.conference")}
              placeholder={t("builder.publications.conferencePlaceholder")}
              {...getFieldProps(formik, schema, "conference")}
            />

            <Input
              type="date"
              label={t("builder.publications.issuedDate")}
              {...getFieldProps(formik, schema, "date")}
            />

            <Input
              label={t("builder.publications.url")}
              placeholder={t("builder.publications.urlPlaceholder")}
              {...getFieldProps(formik, schema, "url")}
            />

            <Input
              type="textarea"
              label={t("shared.forms.summary")}
              className="col-span-2"
              {...getFieldProps(formik, schema, "summary")}
            />
          </div>
        </DataModal>
      )}
    </Formik>
  )
}

export default memo(PublicationModal)
