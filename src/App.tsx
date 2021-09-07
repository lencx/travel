import React from 'react';
import { HashRouter } from 'react-router-dom';

import Footer from '@/components/Footer';
import BackTop from '@/components/BackTop';

import Router from './router/Router';

import routes from './routes';

export default function App() {
  return (
    <HashRouter>
      <div className="view">
        <Router routes={routes} />
        <Footer />
        <BackTop />
      </div>
    </HashRouter>
  );
}
