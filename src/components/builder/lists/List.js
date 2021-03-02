import { get, isEmpty, set } from "lodash"
import React, { memo, useContext } from "react"
import { useTranslation } from "react-i18next"
import ModalContext from "../../../contexts/ModalContext"
import { useSelector } from "../../../contexts/ResumeContext"
import { formatDateRange } from "../../../utils"
import EmptyList from "./EmptyList"
import styles from "./List.module.css"
import ListItem from "./ListItem"

const List = ({ path, title, titlePath, subtitle, subtitlePath, text, textPath, hasDate, event }) => {
  const { t, i18n } = useTranslation()
  const items = useSelector(path, [])

  const { emitter } = useContext(ModalContext)
  const handleEdit = (data) => emitter.emit(event, data)

  return (
    <div className="flex flex-col">
      <div className={styles.list}>
        {isEmpty(items) ? (
          <EmptyList />
        ) : (
            items.map((x, i) => (
              <ListItem key={x.id} data={x} path={path}
                title={title || get(x, titlePath, "")}
                subtitle={subtitle || get(x, subtitlePath, "") ||
                  (hasDate && formatDateRange(
                    {
                      startDate: x.startDate,
                      endDate: x.endDate,
                      language: i18n.language
                    }, t
                  ))
                }
                text={text || get(x, textPath, "")}
                onEdit={() => handleEdit(x)}
                isFirst={i === 0}
                isLast={i === items.length - 1}
              />
            ))
          )}
      </div>
    </div>
  )
}

export default memo(List)
