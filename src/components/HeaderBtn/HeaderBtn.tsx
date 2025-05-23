import React, { memo } from 'react';

import './HeaderBtn.scss';

type Props = {
  action: () => void;
  icon: string;
  iconAlt: string;
};

export const HeaderBtn: React.FC<Props> = memo(({ action, icon, iconAlt }) => {
  return (
    <button className="HeaderBtn" onClick={action}>
      <img src={icon} alt={iconAlt} className="HeaderBtn__icon"></img>
    </button>
  );
});
