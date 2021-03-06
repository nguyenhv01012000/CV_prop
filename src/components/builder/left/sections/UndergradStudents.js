import React, { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Heading from '../../../shared/Heading';
import Input from '../../../shared/Input';
import VisibleButton from '../../../shared/VisibleButton';
import List from '../../lists/List';
import ModalContext from "../../../../contexts/ModalContext";
import { MdAdd } from "react-icons/md";
import Button from "../../../shared/Button";

const UndergradStudents = ({ id, event, changeId }) => {
    const path = `${id}.items`;
    const visible = `${id}.visible`;
    const { t } = useTranslation();

    const { emitter } = useContext(ModalContext)
    const handleAdd = () => emitter.emit(event)

    return (
        <section onMouseMove={()=>changeId(id)}>
            <Heading id={id} />
            <Input
                name="heading"
                label={t('builder.sections.heading')}
                path={`${id}.heading`}
            />
            <List
                path={path}
                event={event}
                titlePath="fullName"
                subtitlePath="studentId"
                textPath="topic"
            />
            <div className="flex flex-row">
                <VisibleButton path={visible} />
                <Button outline icon={MdAdd} onClick={handleAdd} className="mt-8 ml-auto">
                    {t('shared.buttons.add')}
                </Button>
            </div>
        </section>
    )
}

export default memo(UndergradStudents);
