import React, { memo, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import Header from '../../components/builder/header/header';
import Artboard from '../../components/builder/center/Artboard';
import LeftSidebar from '../../components/builder/left/LeftSidebar';
import DatabaseContext from '../../contexts/DatabaseContext';
import { useDispatch, useSelector } from '../../contexts/ResumeContext';
import { useAuthDispatch } from '../../contexts/AuthContext';
import RightSidebar from '../../components/builder/right/RightSidebar';
import LoadingScreen from '../../components/router/LoadingScreen';
import { useTranslation } from 'react-i18next';
import styles from './builder.module.css';
import { getBuilderQuery } from '../../utils';
import { isNull } from 'lodash';

const Builder = ({ id }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const authDispatch = useAuthDispatch();
    const [loading, setLoading] = useState(true);
    const { getCV } = useContext(DatabaseContext);

    useEffect(() => {
        setLoading(false);
    })

    // useEffect(() => {
    //     (async () => {
    //         dispatch({ type: 'load_demo_data' });
    //         const query = getBuilderQuery(window.location.search);
    //         const userId = query.userId;
    //         const templateId = query.templateId;
    //         const auth = query.auth;
    //         if (userId == null || auth == null) {
    //             toast.error(t('builder.toasts.doesNotExist'));
    //             return setLoading(false);
    //         }
    //         authDispatch({ type: 'init_auth', payload: query });
    //         const resume = await getCV(userId, auth, templateId);
    //         if (!resume.status) {
    //             toast.error(resume.data)
    //             return setLoading(false);
    //         }
    //         dispatch({ type: 'set_data', payload: resume.data })
    //         return setLoading(false);
    //     })();
    // }, [id]);

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
                    <div className={styles.left}>
                        <LeftSidebar />
                    </div>
                    <div className={styles.center}>
                        <Artboard />
                    </div>
                    <div className={styles.right}>
                        <RightSidebar />
                    </div>
                </div>
            </>
        );
    }, [loading]);
}

export default memo(Builder);
