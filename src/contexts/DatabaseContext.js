import React, { createContext, memo } from "react"
import { useSelector } from './ResumeContext';
import { useTranslation } from "react-i18next"
import { dataSynchronization } from '../utils';
import { toast } from 'react-toastify';
import axios from "axios"

const BASE_URL = `http://localhost:8080/v1`;

const defaultState = {
    getCV: async (userId, auth, templateId) => { },
    updateCV: async (userId, auth, templateId) => { },
};

const DatabaseContext = createContext(defaultState);

const DatabaseProvider = ({ children }) => {
    const { t } = useTranslation()
    const state = useSelector();

    const getCV = async (userId, auth, templateId) => {
        try {
            const res = await axios.get(`${BASE_URL}/data/soict/teacher?userId=${userId}&auth=${auth}&templateId=${templateId}`);
            if (res.data.status == 'failed') return {
                'status': false,
                'data': t('builder.toasts.doesNotExist')
            }
            const resume = res.data.data;
            const result = dataSynchronization(resume, resume.metadata.sections);
            return {
                'status': true,
                'data': result
            }
        }
        catch (error) {
            return {
                'status': false,
                'data': t('builder.toasts.notAvailible')
            }
        }
    }

    const updateCV = async (userId, auth, templateId) => {
        console.log(userId)
        let body = {
            'state': state,
            'userId': userId,
            'auth': auth,
            'templateId': templateId
        }
        console.log('=== body: ', body)
        axios.post(`${BASE_URL}/data/save_data`, body).then(res => {
            toast.success(t('shared.toasts.saveSuccess'));
        }).catch(error => {
            toast.error(t('shared.toasts.saveFail'));
        })
    }

    return (
        <DatabaseContext.Provider value={{
            getCV,
            updateCV
        }}>
            {children}
        </DatabaseContext.Provider>
    )
}

export default DatabaseContext;

const memoizedProvider = memo(DatabaseProvider)

export {
    memoizedProvider as DatabaseProvider
}
