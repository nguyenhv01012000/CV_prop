import { Link } from '@reach/router';
import React, { memo, useEffect, useMemo, useState } from 'react';
import Header from '../../components/builder/header/header';
import Castform from '../../templates/Castform';
import Gengar from '../../templates/Gengar';
import Glalie from '../../templates/Glalie';
import Onyx from '../../templates/Onyx';
import Pikachu from '../../templates/Pikachu';
import Celebi from '../../templates/Celebi';
import Nobita from '../../templates/Nobita';
import Xuka from '../../templates/Xuka';
import Chaien from '../../templates/Chaien';
import Doremon from '../../templates/Doremon';
import { useSelector } from '../../contexts/ResumeContext';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import styles from './preview.module.css';
import LoadingScreen from '../../components/router/LoadingScreen';

const Preview = ({ id }) => {
    const { t } = useTranslation();
    const resume = useSelector();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    })

    return useMemo(() => {
        if (loading) {
            return <LoadingScreen />;
        }
        return (
            <>
                <div className={styles.header}>
                    <Header />
                </div>
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
                    <Link to="/app/builder">Go back builder</Link>
                </div>
            </>

        );
    });
};

export default memo(Preview);
