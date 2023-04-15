import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Login from '~/src/ui/modules/login/containers/Login';
import LayoutApp from '~/src/ui/shared/layout/LayoutApp';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<LayoutApp />} />
    </Routes>
  );
}

export default App;
