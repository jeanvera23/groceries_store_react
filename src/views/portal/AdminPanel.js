import React, { Component } from 'react';

import Main from './MainContent.js';
import Header from './Header.js';
import Sidebar from './Sidebar.js';

const AdminPanel = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Main />
    </div>
  )
}
export default AdminPanel;