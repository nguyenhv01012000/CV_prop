import { Link, navigate } from '@reach/router';
import React, { memo, useEffect, useMemo, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import LoadingScreen from '../../components/router/LoadingScreen';
import DatabaseContext from '../../contexts/DatabaseContext';
import Castform from '../../templates/Castform';
import Gengar from '../../templates/Gengar';
import Glalie from '../../templates/Glalie';
import Onyx from '../../templates/Onyx';
import Pikachu from '../../templates/Pikachu';
import Celebi from '../../templates/Celebi';
import Nobita from '../../templates/Nobita';
import Doremon from '../../templates/Doremon';
import Xuka from '../../templates/Xuka';
import Chaien from '../../templates/Chaien';
import fontSizeOptions from '../../data/fontSizeOptions';
import { scaler } from '../../utils';
import { useSelector } from '../../contexts/ResumeContext';
import { getBuilderQuery } from '../../utils';
import styles from './sharecv.module.css';

const ShareCV = ({ id }) => {
    const { t, i18n } = useTranslation();
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const { getCV } = useContext(DatabaseContext);

    useEffect(() => {
        (async () => {
            const query = getBuilderQuery(window.location.search);
            const userId = query.userId;
            const templateId = query.templateId;
            const auth = query.auth;
            if (!userId || !auth) {
                toast.error(t('builder.toasts.doesNotExist'));
                return null;
            }
            let data = await getCV(userId, auth, templateId);

            if (!data.status) {
                navigate('/');
                toast.error(
                    `The resume you were looking for does not exist anymore... or maybe it never did?`,
                );
                return null;
            }

            data = data.data;

            setResume(data);
            i18n.changeLanguage(data.metadata.language || 'en');

            for (const [key, sizeDefault] of Object.entries(fontSizeOptions)) {
                document.documentElement.style.setProperty(
                    key,
                    `${scaler(data.metadata.fontSize) * sizeDefault}rem`,
                );
            }
            return setLoading(false);
        })();
    }, [id]);

    return useMemo(() => {
        if (loading) {
            return <LoadingScreen />;
        }

        return (
            <div className={styles.container}>
                <Helmet>
                    <title>
                        {resume.metadata.name} | {t('shared.appName')}
                    </title>
                    <link rel="canonical" href={`http://localhost:8000/r`} />
                </Helmet>

                <div className={styles.page}
                    style={{ backgroundColor: resume.metadata.colors.background }}
                >
                    {resume.metadata.template === 'onyx' && <Onyx data={resume} />}
                    {resume.metadata.template === 'pikachu' && <Pikachu data={resume} />}
                    {resume.metadata.template === 'gengar' && <Gengar data={resume} />}
                    {resume.metadata.template === 'castform' && <Castform data={resume} />}
                    {resume.metadata.template === 'glalie' && <Glalie data={resume} />}
                    {resume.metadata.template === 'celebi' && <Celebi data={resume} />}
                    {resume.metadata.template === 'nobita' && <Nobita data={resume} />}
                    {resume.metadata.template === 'doremon' && <Doremon data={resume} />}
                    {resume.metadata.template === 'xuka' && <Xuka data={resume} />}
                    {resume.metadata.template === 'chaien' && <Chaien data={resume} />}
                </div>
            </div>
        );
    });
};

export default memo(ShareCV);
