import React, { createContext, memo } from "react"

const defaultState = {
    handleReturnHome: () => { },
    handleSwitchUserPage: () => { },
    handleSwitchTemplatePage: () => { },
    handleSwitchAdvisorPage: () => { },
    handleSwitchDiscoverPage: () => { }
};

const HomePageContext = createContext(defaultState);

const HomePageProvider = ({ children }) => {
    const handleReturnHome = () => {
        window.location.replace('http://localhost:4100/manageCV');
    }

    const handleSwitchUserPage = () => {
        window.location.replace('https://www.facebook.com/');
    }

    const handleSwitchTemplatePage = () => {
        window.location.replace('http://localhost:4100/cvTemplates');
    }

    const handleSwitchAdvisorPage = () => {
        window.location.replace('http://localhost:4100/advisory');
    }

    const handleSwitchDiscoverPage = () => {
        window.location.replace('http://localhost:4100/discover');
    }
    return (
        <HomePageContext.Provider value={{
            handleReturnHome,
            handleSwitchUserPage,
            handleSwitchTemplatePage,
            handleSwitchAdvisorPage,
            handleSwitchDiscoverPage
        }}>
            {children}
        </HomePageContext.Provider>
    )
}

export default HomePageContext;

const memoizedProvider = memo(HomePageProvider)

export {
    memoizedProvider as HomePageProvider
}
