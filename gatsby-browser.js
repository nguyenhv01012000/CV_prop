import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import 'animate.css';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/functions';
import 'firebase/storage';
import React from 'react';
import { DatabaseProvider } from './src/contexts/DatabaseContext';
import { ModalProvider } from './src/contexts/ModalContext';
import { ResumeProvider } from './src/contexts/ResumeContext';
import { SettingsProvider } from './src/contexts/SettingsContext';
import { StorageProvider } from './src/contexts/StorageContext';
import { HomePageProvider } from './src/contexts/HomePageContext';
import { AuthProvider } from './src/contexts/AuthContext';
import './src/i18n';
import './src/styles/forms.css';
import './src/styles/global.css';
import './src/styles/shadows.css';
import './src/styles/tailwind.css';
import './src/styles/toastify.css';
import './src/utils/dayjs';

const theme = createMuiTheme({
	typography: {
		fontWeightRegular: 500,
		fontFamily: ['Montserrat', 'sans-serif'].join(','),
	},
});

// eslint-disable-next-line import/prefer-default-export
export const wrapRootElement = ({ element }) => {
	return (
		<SettingsProvider>
			<MuiThemeProvider theme={theme}>
				<ModalProvider>
					<AuthProvider>
						<ResumeProvider>
							<DatabaseProvider>
								<HomePageProvider>
									<StorageProvider>
										{element}
									</StorageProvider>
								</HomePageProvider>
							</DatabaseProvider>
						</ResumeProvider>
					</AuthProvider>
				</ModalProvider>
			</MuiThemeProvider>
		</SettingsProvider>
	)
};
