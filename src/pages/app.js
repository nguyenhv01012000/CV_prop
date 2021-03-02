import React, { memo, useEffect, useContext } from 'react';
import { Router } from "@reach/router"
import PrivateRoute from '../components/router/PrivateRoute';
import Wrapper from '../components/shared/Wrapper'
import Builder from './app/builder';
import ShareCV from './app/shareCV';
import Preview from './app/preview';
import { useDispatch } from '../contexts/ResumeContext';
import { useAuthDispatch } from '../contexts/AuthContext';
import DatabaseContext from '../contexts/DatabaseContext';
import { getBuilderQuery } from '../utils';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const App = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const authDispatch = useAuthDispatch();
    const { getCV } = useContext(DatabaseContext);

    useEffect(() => {
        (async () => {
            dispatch({ type: 'load_demo_data' });
            const query = getBuilderQuery(window.location.search);
            const userId = query.userId;
            const templateId = query.templateId;
            const auth = query.auth;
            if (userId == null || auth == null) {
                toast.error(t('builder.toasts.doesNotExist'));
                return null;
            }
            authDispatch({ type: 'init_auth', payload: query });
            const resume = await getCV(userId, auth, templateId);
            if (!resume.status) {
                toast.error(resume.data)
                return null;
            }
            dispatch({ type: 'set_data', payload: resume.data })
            return null;
        })();
    }, []);

    return (
        <Wrapper>
            <Router>
                <PrivateRoute path="/app/builder" component={Builder} />
                <PrivateRoute path="/app/preview" component={Preview} />
                <PrivateRoute path="/app/share-cv" component={ShareCV} />
            </Router>
        </Wrapper>
    )
};

export default memo(App);
