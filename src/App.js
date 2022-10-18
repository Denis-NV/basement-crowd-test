import React, { useEffect, useState } from 'react';

import AppContextProvider from './context/AppContextProvider';
import Section from './components/Section';

import './App.css';

const App = () => {
  const [data, setData] = useState();

  const fetchData = async () => {
    const dealings = await (await fetch('/api/company-dealings/qa.json')).json();
    const management = await (await fetch('/api/directors-officers-management/qa.json')).json();
    const sections = await (await fetch('/api/sections.json')).json();

    const qa = [...dealings, ...management];

    setData({ sections, qa });
  };

  useEffect(() => {
    if (!data) fetchData();
  }, [data, fetchData]);

  return (
    <AppContextProvider>
      <Section data={data} node={data?.sections?.find((sec) => sec?.id === -1)} level={0} />
    </AppContextProvider>
  );
};

export default App;
