import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import './InfoLinks.scss';

type Props = {
  location: string;
};

export const InfoLinks: React.FC<Props> = memo(({ location }) => {
  return (
    <section className={`InfoLinks InfoLinks--${location}`}>
      <Link
        to="https://github.com/PodvAx/"
        className="InfoLinks__link"
        target="_blank"
      >
        Github
      </Link>
      <Link to="/contacts" className="InfoLinks__link">
        Contacts
      </Link>
      <Link to="/rights" className="InfoLinks__link">
        Rigths
      </Link>
    </section>
  );
});
