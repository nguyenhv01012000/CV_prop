import React, { createContext, memo, useContext, useCallback, useReducer } from "react"
import { clone, findIndex, get, isUndefined, merge, setWith, set, has } from "lodash"

const defaultState = {
    userId: null,
    templateId: null,
    auth: null
};

const AuthContext = createContext(defaultState);

const AuthProvider = ({ children }) => {
    const memoizedReducer = useCallback(
        (state, { type, payload }) => {
            let newState
            switch (type) {
                case 'init_auth':
                    newState = payload;
                    return newState;
                default:
                    throw new Error()
            }
        }
    )

    const [authState, authDispatch] = useReducer(memoizedReducer)

    return (
		<AuthContext.Provider value={{ authState, authDispatch }}>
			{children}
		</AuthContext.Provider>
	)
}

const useAuthSelector = (path, fallback) => {
	const { authState } = useContext(AuthContext)
	let value = get(authState, path)
	if (isUndefined(value)) {
		value = isUndefined(fallback) ? authState : fallback
	}
	return value
}

const useAuthDispatch = () => {
	const { authDispatch } = useContext(AuthContext)
	return authDispatch
}

export default AuthContext;

const memoizedProvider = memo(AuthProvider)

export {
    memoizedProvider as AuthProvider,
    useAuthSelector,
    useAuthDispatch
}
