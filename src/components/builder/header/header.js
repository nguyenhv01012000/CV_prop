import React, { memo, useContext } from "react"
import { useTranslation } from 'react-i18next';
import Button from "../../shared/Button";
import HomePageContext from '../../../contexts/HomePageContext';
import styles from './header.module.css';

const Header = () => {
    const { handleReturnHome,
        handleSwitchUserPage,
        handleSwitchTemplatePage,
        handleSwitchAdvisorPage,
        handleSwitchDiscoverPage
    } = useContext(HomePageContext);

    const { t } = useTranslation();
    return (
        <div className={styles.container}>
            <div className="max-w-full mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <a href="#">
                            <span className="sr-only">Workflow</span>
                            <img className="h-8 w-auto sm:h-10" src="https://res.cloudinary.com/dr1o6zvnh/image/upload/v1614573266/favicon_mzgzjs.png" alt="" />
                        </a>
                    </div>
                    <div className="-mr-2 -my-2 md:hidden">
                        <button type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
                            <span className="sr-only">Open menu</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    <nav className="hidden md:flex space-x-10">
                        <Button isStyleIcon={false} onClick={handleReturnHome} className={styles.button}>
                            {t('builder.header.manageCV')}
                        </Button>
                        <Button isStyleIcon={false} onClick={handleSwitchTemplatePage} className={styles.button}>
                            {t('builder.header.Template')}
                        </Button>
                        <Button isStyleIcon={false} onClick={handleSwitchAdvisorPage} className={styles.button}>
                            {t('builder.header.Advisor')}
                        </Button>
                        <Button isStyleIcon={false} onClick={handleSwitchDiscoverPage} className={styles.button}>
                            {t('builder.header.Discover')}
                        </Button>
                        <Button isStyleIcon={false} onClick={handleSwitchUserPage} className={styles.button}>
                            {t('builder.header.User')}
                        </Button>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default memo(Header);
