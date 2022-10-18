import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [openSectionIds, setSectionOpenIds] = useState([-1]);
  const [openQaId, setOpenQaId] = useState();

  return (
    <AppContext.Provider value={{ openSectionIds, setSectionOpenIds, openQaId, setOpenQaId }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
