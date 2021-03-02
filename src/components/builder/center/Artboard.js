import React, { memo } from "react"
import { Helmet } from 'react-helmet';

import { useSelector } from "../../../contexts/ResumeContext"
import { useTranslation } from 'react-i18next';
import styles from "./Artboard.module.css"
import Castform from "../../../templates/Castform"
import Celebi from "../../../templates/Celebi"
import Gengar from "../../../templates/Gengar"
import Glalie from "../../../templates/Glalie"
import Onyx from "../../../templates/Onyx"
import Pikachu from "../../../templates/Pikachu"
import Doremon from "../../../templates/Doremon";
import Nobita from "../../../templates/Nobita";
import Xuka from "../../../templates/Xuka";
import Chaien from "../../../templates/Chaien";

const Artboard = () => {
  const { t, i18n } = useTranslation();
  const state = useSelector()
  const { id, name, metadata } = state

  const { template } = metadata
  return (
    <>
      {/* <Helmet>
        <title>
          {t('shared.appName')}
        </title>
        <link rel="canonical" href={`http://localhost:8000/r`} />
      </Helmet> */}

      <div id="page" className={styles.container} style={{
        fontFamily: state.metadata.font,
        color: state.metadata.colors.text,
        background: state.metadata.colors.background,
      }}>
        {template === "onyx" && <Onyx data={state} />}
        {template === "pikachu" && <Pikachu data={state} />}
        {template === "gengar" && <Gengar data={state} />}
        {template === "castform" && <Castform data={state} />}
        {template === "glalie" && <Glalie data={state} />}
        {template === "celebi" && <Celebi data={state} />}
        {template === "doremon" && <Doremon data={state} />}
        {template === "nobita" && <Nobita data={state} />}
        {template === "xuka" && <Xuka data={state} />}
        {template === "chaien" && <Chaien data={state} />}
      </div>
    </>
  )
}

export default memo(Artboard)