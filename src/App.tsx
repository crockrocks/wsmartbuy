// src/App.tsx
import React from 'react';
import { useRoutes } from 'react-router-dom';
import Layout from './components/layouts/layout';
import { routes } from './routes';

const App: React.FC = () => {
  const element = useRoutes(routes);

  return (
    <Layout>
      {element}
    </Layout>
  );
};

export default App;

