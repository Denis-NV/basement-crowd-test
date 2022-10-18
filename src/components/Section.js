import React, { useCallback, useContext } from 'react';

import { AppContext } from '../context/AppContextProvider';
import QA from '../components/QA';

const Section = ({ data, node, level, idsPath = [] }) => {
  const { openSectionIds, setSectionOpenIds, setOpenQaId } = useContext(AppContext);
  const hidden = !openSectionIds?.includes(node?.id);
  const fullIdsPath = [...idsPath, node?.id];

  const handleSelect = useCallback(() => {
    if (hidden) {
      setSectionOpenIds(fullIdsPath);
      setOpenQaId(null);
    } else {
      setSectionOpenIds(idsPath);
      setOpenQaId(null);
    }
    
    window?.history?.replaceState(undefined, undefined, '#');
  }, [fullIdsPath, setSectionOpenIds, setOpenQaId, hidden]);

  return (
    <div>
      <div className="section-title underlined" onClick={handleSelect}>
        <span>{node?.title}</span>
        <span className="icon">{hidden ? '+' : '-'}</span>
      </div>

      <div className="section-content" hidden={hidden}>
        {data?.sections?.map((section) => {
          const isChild = section?.parentId == node?.id;

          return isChild ? (
            <Section key={`${node?.id} ${level}`} data={data} node={section} level={level++} idsPath={fullIdsPath} />
          ) : null;
        })}

        {data?.qa?.map((qa) => {
          const isSectionsQA = qa?.sectionId === node?.id;

          return isSectionsQA ? <QA key={qa?.qa_id} qa={qa} idsPath={fullIdsPath} /> : null;
        })}
      </div>
    </div>
  );
};

export default Section;
