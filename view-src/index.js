import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/components/App';
import { AppStore } from '@/store';
import { AppRouter } from '@/router';
import { AppTheme } from '@/theme';
import { openExternalLinksInOsBrowser } from './utils';

openExternalLinksInOsBrowser();

ReactDOM.render(
  <React.StrictMode>
    <AppStore>
      <AppRouter>
        <AppTheme>
          <App />
        </AppTheme>
      </AppRouter>
    </AppStore>
  </React.StrictMode>,
  document.getElementById('root')
);
