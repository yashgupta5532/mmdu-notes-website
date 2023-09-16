import React from 'react';
import { positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
  timeout: 5000, // Timeout for auto-close of alerts (in milliseconds)
  position: positions.BOTTOM_CENTER, // Position of alerts (you can change this)
};

const AlertProviderWrapper = ({ children }) => (
  <AlertProvider template={AlertTemplate} {...options}>
    {children}
  </AlertProvider>
);

export default AlertProviderWrapper;
