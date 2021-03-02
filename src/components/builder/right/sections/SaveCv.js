import React, { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import DatabaseContext from '../../../../contexts/DatabaseContext';
import {useDispatch} from '../../../../contexts/ResumeContext';
import Button from '../../../shared/Button';
import Heading from '../../../shared/Heading';
import Input from '../../../shared/Input';
import { BiSave } from 'react-icons/bi';
import styles from './SaveCv.module.css';
import { Formik } from 'formik';
import { getBuilderQuery } from '../../../../utils';
import { toast } from 'react-toastify';
import { useAuthDispatch } from '../../../../contexts/AuthContext';


const SaveCv = ({ id,changeId }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { updateCV } = useContext(DatabaseContext);
    const authDispatch = useAuthDispatch();


    const handleSaveCv = () => {
        const query = getBuilderQuery(window.location.search);
        const userId = query.userId;
        const templateId = query.templateId;
        const auth = query.auth;
        if (userId == null || auth == null) {
            toast.error(t('builder.toasts.doesNotExist'));
            return null;
        }
        authDispatch({ type: 'init_auth', payload: query });
        updateCV(userId, auth, templateId);
    }

    const onChangeCVName = (e) =>{
        localStorage.setItem('cvName', e.target.value);
        dispatch({
			type: 'on_input',
			payload: {
				path: 'metadata.name',
				value: e.target.value
			},
		});
    }

    return (
        <section onMouseMove={()=>changeId(id)}>
            <Heading id={id} part={'right'}/>
            <div className={styles.container}>
                <h5>{t('builder.savecv.heading')}</h5>
                <p className="leading-loose">{t('builder.savecv.text')}</p>
                <div>
                    <Input
                        path={'metadata.name'}
                        className="col-span-2"
                        placeholder={t("shared.forms.enterTitle")}
                        onChange={onChangeCVName}
                    />
                </div>
                <div className="mt-4 flex">
                    <Button icon={BiSave} onClick={handleSaveCv}>
                        {t('builder.savecv.button')}
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default memo(SaveCv);
