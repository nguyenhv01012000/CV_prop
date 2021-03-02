import { fromPairs } from 'lodash';
import {
	MdColorLens, MdDashboard, MdFontDownload, MdImportExport, MdInfo,
	MdSettings, MdStyle, MdFormatSize
} from 'react-icons/md';
import { BiSave } from 'react-icons/bi';

export default [
	{
		id: 'save-cv',
		icon: BiSave,
	},
	{
		id: 'templates',
		icon: MdStyle,
	},
	{
		id: 'layout',
		icon: MdDashboard,
	},
	{
		id: 'colors',
		icon: MdColorLens,
	},
	{
		id: 'fonts',
		icon: MdFontDownload,
	},
	{
		id: 'font-size',
		icon: MdFormatSize,
	},
	{
		id: 'actions',
		icon: MdImportExport,
	},
	{
		id: 'settings',
		icon: MdSettings,
	},
	{
		id: 'about',
		icon: MdInfo,
	},
];
