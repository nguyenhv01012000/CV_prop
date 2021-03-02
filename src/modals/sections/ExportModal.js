import download from "downloadjs"
import { clone } from "lodash"
import React, { memo, useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { FaPrint } from "react-icons/fa"
import { toast } from "react-toastify"
import Button from "../../components/shared/Button"
import ModalContext from "../../contexts/ModalContext"
import { useAuthSelector } from '../../contexts/AuthContext';
import { useSelector } from "../../contexts/ResumeContext"
import { b64toBlob } from "../../utils"
import BaseModal from "../BaseModal"
import axios from "axios"

const ExportModal = () => {
	const state = useSelector()
	const authState = useAuthSelector();
	const { t } = useTranslation()
	const [open, setOpen] = useState(false)
	const [isLoadingSingle, setLoadingSingle] = useState(false)
	const [isLoadingMulti, setLoadingMulti] = useState(false)

	const { emitter, events } = useContext(ModalContext)

	useEffect(() => {
		const unbind = emitter.on(events.EXPORT_MODAL, () => setOpen(true))

		return () => unbind()
	}, [emitter, events])

	const handleOpenPrintDialog = () => {
		if (typeof window !== `undefined`) {
			window && window.print()
		}
	}

	const handleDownload = async (isSinglePDF) => {
		isSinglePDF ? setLoadingSingle(true) : setLoadingMulti(true)
		const type = isSinglePDF ? "single" : "multi";
		try {
			const res = await axios.get(`http://localhost:3000/service/print-resume?type=${type}&userId=${authState.userId}&auth=${authState.auth}`);
			console.log(res.data.data);
			const blob = b64toBlob(res.data.data, "application/pdf")
			console.log(state);
			const fileName = state.metadata.name == "" ? 'Civipro.pdf' : `${state.metadata.name}.pdf`;
			download(blob, fileName, "application/pdf");
		}
		catch (error) {
			toast(t("builder.toasts.printError"))
		}
		finally {
			isSinglePDF ? setLoadingSingle(false) : setLoadingMulti(false);
		}
	}

	const handleExportToJson = () => {
		const backupObj = clone(state)
		delete backupObj.id
		delete backupObj.user
		delete backupObj.name
		delete backupObj.createdAt
		delete backupObj.updatedAt
		const data = `data:text/json;charset=utf-8,${encodeURIComponent(
			JSON.stringify(backupObj, null, "\t")
		)}`
		download(data, `RxResume-${state.id}.json`, "text/json")
	}

	return (
		<BaseModal
			hideActions
			state={[open, setOpen]}
			title={t("builder.actions.export.heading")}
		>
			<div>
				<h5 className="text-xl font-semibold mb-4">
					{t("modals.export.printDialog.heading")}
				</h5>

				<p className="leading-loose">{t("modals.export.printDialog.text")}</p>

				<Button icon={FaPrint} className="mt-5" onClick={handleOpenPrintDialog}>
					{t("modals.export.printDialog.button")}
				</Button>
			</div>

			<hr className="my-8" />

			<div>
				<h5 className="text-xl font-semibold mb-4">
					{t("modals.export.downloadPDF.heading")}
				</h5>

				<p className="leading-loose">{t("modals.export.downloadPDF.text")}</p>

				<div className="mt-5 mb-4">
					<div className="flex">
						<Button
							isLoading={isLoadingSingle}
							onClick={() => handleDownload(true)}
						>
							{t("modals.export.downloadPDF.buttons.single")}
						</Button>
						<Button
							className="ml-8"
							isLoading={isLoadingMulti}
							onClick={() => handleDownload(false)}
						>
							{t("modals.export.downloadPDF.buttons.multi")}
						</Button>
					</div>
				</div>
			</div>

			<hr className="my-8" />

			<div>
				<h5 className="text-xl font-semibold mb-4">
					{t("modals.export.jsonFormat.heading")}
				</h5>

				<p className="leading-loose">{t("modals.export.jsonFormat.text")}</p>

				<div className="mt-5">
					<Button onClick={handleExportToJson}>
						{t("modals.export.jsonFormat.button")}
					</Button>
					<a id="downloadAnchor" className="hidden">
						{t("modals.export.jsonFormat.button")}
					</a>
				</div>
			</div>
		</BaseModal>
	)
}

export default memo(ExportModal)
