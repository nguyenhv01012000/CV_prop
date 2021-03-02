import { get } from 'lodash';
import React, { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCaretRight } from 'react-icons/fa';
import PageContext from '../../../contexts/PageContext';
import { safetyCheck } from '../../../utils';
import BirthDateB from '../BirthDate/BirthDateB';
import Icons from '../Icons';

const ContactItem = ({ value, icon, link }) => {
  const { data } = useContext(PageContext);
  const Icon = get(Icons, icon && icon.toLowerCase(), FaCaretRight);

  return value ? (
    <div className="flex items-center">
      <Icon
        size="20px"
        className="mr-10"
        style={{ color: data.metadata.colors.primary }}
      /> 
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          <span className="font-medium break-all">{':  '}{value}</span>
        </a>
      ) : (
          <span className="font-medium break-all">{':  '}{value}</span>
        )}
    </div>
  ) : null;
};

const ContactE = () => {
  const { t } = useTranslation();
  const { data, heading: Heading } = useContext(PageContext);

  return ( safetyCheck(data.social) ?
    <div className="left-title" >
      <Heading children={data.social.heading} icon={"fa fa-users"} />
      <div className="text-xs grid gap-2" style={{marginTop:'20px'}}>
        {
          data.social.items.map((x) => (
            <ContactItem
              key={x.id}
              value={x.username}
              icon={x.network}
              link={x.url}
            />
          ))
        }
      </div>
    </div> : null
  );
};

export default memo(ContactE);
