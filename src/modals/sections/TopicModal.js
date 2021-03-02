import { Formik } from "formik"
import React, { memo } from "react"
import * as Yup from "yup"
import { useTranslation } from "react-i18next"
import Input from "../../components/shared/Input"
import ModalEvents from "../../constants/ModalEvents"
import { getFieldProps } from "../../utils"
import DataModal from "../DataModal"

const initialValues = {
  title: "",
  programs: "",
  collaboration: "",
  studentNum: "",
  description: ""
}

const TopicModal = () => {
  const { t } = useTranslation()

  const schema = Yup.object().shape({
    title: Yup.string().required(t("shared.forms.validation.required")),
    programs: Yup.string().required(t("shared.forms.validation.required")),
    collaboration: Yup.string(),
    studentNum: Yup.string(),
    description: Yup.string().min(10, t("shared.forms.validation.min", { number: 10 })
    )
  })

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataModal
          name={t("builder.sections.topic")}
          path="topic.items"
          event={ModalEvents.TOPIC_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t("builder.topic.title")}
              className="col-span-2"
              placeholder={t("builder.topic.titlePlaceholder")}
              {...getFieldProps(formik, schema, "title")}
            />

            <Input
              label={t("builder.topic.programs")}
              className="col-span-2"
              placeholder={t("builder.topic.programsPlaceholder")}
              {...getFieldProps(formik, schema, "programs")}
            />

            <Input
              label={t("builder.topic.collaboration")}
              placeholder={t("builder.topic.collaborationPlaceholder")}
              {...getFieldProps(formik, schema, "collaboration")}
            />

            <Input
              label={t("builder.topic.studentNum")}
              placeholder={t("builder.topic.studentNumPlaceholder")}
              {...getFieldProps(formik, schema, "studentNum")}
            />

            <Input
              type="textarea"
              label={t("builder.topic.description")}
              className="col-span-2"
              {...getFieldProps(formik, schema, "description")}
            />
          </div>
        </DataModal>
      )}
    </Formik>
  )
}

export default memo(TopicModal)
