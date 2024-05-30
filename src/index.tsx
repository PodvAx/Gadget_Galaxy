import { createRoot } from 'react-dom/client';

import '@fortawesome/fontawesome-free/css/all.css';

import { Root } from './Root';
import React from 'react';

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
