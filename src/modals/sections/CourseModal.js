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
  courseId: "",
  classId: "",
  semester: "",
  program: ""
}

const CourseModal = () => {
  const { t } = useTranslation()

  const schema = Yup.object().shape({
    name: Yup.string().required(t("shared.forms.validation.required")),
    courseId: Yup.string().required(t("shared.forms.validation.required")),
    classId: Yup.string().required(t("shared.forms.validation.required")),
    semester: Yup.string().required(t("shared.forms.validation.required")),
    program: Yup.string()
  })

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataModal
          name={t("builder.sections.courses")}
          path="courses.items"
          event={ModalEvents.COURSES_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t("builder.courses.name")}
              className="col-span-2"
              placeholder={t("builder.courses.namePlaceholder")}
              {...getFieldProps(formik, schema, "name")}
            />

            <Input
              label={t("builder.courses.coursesId")}
              placeholder={t("builder.courses.coursesIdPlaceholder")}
              {...getFieldProps(formik, schema, "courseId")}
            />

            <Input
              label={t("builder.courses.classId")}
              placeholder={t("builder.courses.classIdPlaceholder")}
              {...getFieldProps(formik, schema, "classId")}
            />

            <Input
              label={t("builder.courses.semester")}
              placeholder={t("builder.courses.semesterPlaceholder")}
              {...getFieldProps(formik, schema, "semester")}
            />

            <Input
              label={t("builder.courses.program")}
              placeholder={t("builder.courses.programPlaceholder")}
              {...getFieldProps(formik, schema, "program")}
            />
          </div>
        </DataModal>
      )}
    </Formik>
  )
}

export default memo(CourseModal)
