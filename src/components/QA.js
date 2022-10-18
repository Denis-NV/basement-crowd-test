import React, { useCallback, useContext, useEffect, useState } from 'react';

import { AppContext } from '../context/AppContextProvider';

const QA = ({ qa, idsPath }) => {
  const { openQaId, setOpenQaId, setSectionOpenIds } = useContext(AppContext);
  const [init, setInit] = useState(false);

  const hidden = openQaId !== qa?.qa_id;

  const handleSelect = useCallback(() => {
    if (hidden) setOpenQaId(qa?.qa_id);
    else setOpenQaId(null);

    window?.history?.replaceState(undefined, undefined, '#');
  }, [qa?.qa_id, setOpenQaId, hidden]);

  const handleHash = useCallback(() => {
    const hash = String(window?.location?.hash).slice(1);

    if (hash && qa?.tocId === hash) {
      setOpenQaId(qa?.qa_id);
      setSectionOpenIds(idsPath);
    }
  }, [qa?.qa_id, qa?.tocId, idsPath, setOpenQaId, setSectionOpenIds]);

  useEffect(() => {
    if (!init) {
      setInit(true);

      handleHash();
    }

    window?.addEventListener('hashchange', handleHash);

    return () => {
      window?.removeEventListener('hashchange', handleHash);
    };
  }, [handleHash, init, setInit]);

  return (
    <div>
      <div className={`section-title ${hidden ? 'underlined' : ''}`} onClick={handleSelect}>
        <div dangerouslySetInnerHTML={{ __html: qa?.question }} />
        <span className="icon">{hidden ? '+' : '-'}</span>
      </div>
      <div className="underlined" hidden={hidden} dangerouslySetInnerHTML={{ __html: qa?.answer }} />
    </div>
  );
};

export default QA;
