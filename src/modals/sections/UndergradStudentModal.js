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

const UndergradStudentModal = () => {
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
          name={t("builder.sections.undergradStudents")}
          path="undergradStudents.items"
          event={ModalEvents.UNDERGRADSTUDENTS_MODAL}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t("builder.undergradStudents.fullName")}
              className="col-span-2"
              placeholder={t("builder.undergradStudents.namePlaceholder")}
              {...getFieldProps(formik, schema, "fullName")}
            />

            <Input
              label={t("builder.undergradStudents.coursesId")}
              placeholder={t("builder.undergradStudents.coursesIdPlaceholder")}
              {...getFieldProps(formik, schema, "courseId")}
            />

            <Input
              label={t("builder.undergradStudents.coursesId")}
              placeholder={t("builder.undergradStudents.classIdPlaceholder")}
              {...getFieldProps(formik, schema, "classId")}
            />

            <Input
              label={t("builder.undergradStudents.semester")}
              placeholder={t("builder.undergradStudents.semesterPlaceholder")}
              {...getFieldProps(formik, schema, "semester")}
            />

            <Input
              label={t("builder.undergradStudents.program")}
              placeholder={t("builder.undergradStudents.programPlaceholder")}
              {...getFieldProps(formik, schema, "program")}
            />
            <Input
              label={t("builder.undergradStudents.studentId")}
              placeholder={t("builder.undergradStudents.studentIdPlaceholder")}
              {...getFieldProps(formik, schema, "studentId")}
            />
            <Input
              label={t("builder.undergradStudents.topic")}
              placeholder={t("builder.undergradStudents.topicPlaceholder")}
              {...getFieldProps(formik, schema, "topic")}
            />
          </div>
        </DataModal>
      )}
    </Formik>
  )
}

export default memo(UndergradStudentModal)
