import React from 'react';
import '@styles/react/libs/spinner/spinner.scss';

const PageSpinner = () => (
  <div id="loading-overlay" style={{ display: 'flex' }}>
    <div className="loader"></div>
  </div>
);

export default PageSpinner;