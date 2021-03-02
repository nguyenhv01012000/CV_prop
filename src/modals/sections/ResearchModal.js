import { Formik } from "formik"
import React, { memo } from "react"
import { useTranslation } from "react-i18next"
import * as Yup from "yup"
import Input from "../../components/shared/Input"
import ModalEvents from "../../constants/ModalEvents"
import { getFieldProps } from "../../utils"
import DataModal from "../DataModal"

const initialValues = {
  name: "",
  description: "",
  rootId: "",
  level: "",
  parentId: "",
  isMainResearch: true
}

const ResearchModal = () => {
  const { t } = useTranslation()

  const schema = Yup.object().shape({
    name: Yup.string().required(t("shared.forms.validation.required")),
    description: Yup.string().required(t("shared.forms.validation.required")),
    rootId: Yup.string().required(t("shared.forms.validation.required")),
    level: Yup.string().required(t("shared.forms.validation.required")),
    parentId: Yup.string(),
    isMainResearch: Yup.bool()
  })

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataModal
          name={t("builder.sections.research")}
          path="research.items"
          event={ModalEvents.RESEARCH_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t("builder.research.name")}
              className="col-span-2"
              placeholder={t("builder.research.namePlaceholder")}
              {...getFieldProps(formik, schema, "name")}
            />

            <Input
              label={t("builder.research.description")}
              placeholder={t("builder.research.descriptionPlaceholder")}
              {...getFieldProps(formik, schema, "description")}
            />

            <Input
              label={t("builder.research.rootId")}
              placeholder={t("builder.research.rootIdPlaceholder")}
              {...getFieldProps(formik, schema, "rootId")}
            />

            <Input
              label={t("builder.research.level")}
              placeholder={t("builder.research.levelPlaceholder")}
              {...getFieldProps(formik, schema, "level")}
            />

            <Input
              label={t("builder.research.parentId")}
              placeholder={t("builder.research.parentIdPlaceholder")}
              {...getFieldProps(formik, schema, "parentId")}
            />
            <Input type="radio"
              label={t("builder.research.isMain")}
              {...getFieldProps(formik, schema, "isMainResearch")}
            />
          </div>
        </DataModal>
      )}
    </Formik>
  )
}

export default memo(ResearchModal)
