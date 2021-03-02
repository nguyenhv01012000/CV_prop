import { Formik } from "formik"
import React, { memo } from "react"
import { useTranslation } from "react-i18next"
import * as Yup from "yup"
import Input from "../../components/shared/Input"
import ModalEvents from "../../constants/ModalEvents"
import { getFieldProps } from "../../utils"
import DataModal from "../DataModal"

const initialValues = {
  fullName: "",
  courseId: "",
  classId: "",
  semester: "",
  program: ""
}

const PostgradStudentModal = () => {
  const { t } = useTranslation()

  const schema = Yup.object().shape({
    fullName: Yup.string().required(t("shared.forms.validation.required")),
    courseId: Yup.string().required(t("shared.forms.validation.required")),
    classId: Yup.string().required(t("shared.forms.validation.required")),
    semester: Yup.string().required(t("shared.forms.validation.required")),
    program: Yup.string(),
    studentId: Yup.string().required(t("shared.forms.validation.required")),
    topic: Yup.string().required(t("shared.forms.validation.required"))
  })

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataModal
          name={t("builder.sections.postgradStudents")}
          path="postgradStudents.items"
          event={ModalEvents.POSTGRADSTUDENTS_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t("builder.postgradStudents.fullName")}
              className="col-span-2"
              placeholder={t("builder.postgradStudents.namePlaceholder")}
              {...getFieldProps(formik, schema, "fullName")}
            />

            <Input
              label={t("builder.postgradStudents.coursesId")}
              placeholder={t("builder.postgradStudents.coursesIdPlaceholder")}
              {...getFieldProps(formik, schema, "courseId")}
            />

            <Input
              label={t("builder.postgradStudents.classId")}
              placeholder={t("builder.postgradStudents.classIdPlaceholder")}
              {...getFieldProps(formik, schema, "classId")}
            />

            <Input
              label={t("builder.postgradStudents.semester")}
              placeholder={t("builder.postgradStudents.semesterPlaceholder")}
              {...getFieldProps(formik, schema, "semester")}
            />

            <Input
              label={t("builder.postgradStudents.program")}
              placeholder={t("builder.postgradStudents.programPlaceholder")}
              {...getFieldProps(formik, schema, "program")}
            />
            <Input
              label={t("builder.postgradStudents.studentId")}
              placeholder={t("builder.postgradStudents.studentIdPlaceholder")}
              {...getFieldProps(formik, schema, "studentId")}
            />
            <Input
              label={t("builder.postgradStudents.topic")}
              placeholder={t("builder.postgradStudents.topicPlaceholder")}
              {...getFieldProps(formik, schema, "topic")}
            />
          </div>
        </DataModal>
      )}
    </Formik>
  )
}

export default memo(PostgradStudentModal)
