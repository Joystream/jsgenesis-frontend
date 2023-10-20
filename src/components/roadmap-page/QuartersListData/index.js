import React from 'react';

import './style.scss';
import QuarterPanel from '../QuarterPanel';

function QuartersListData({ data, selectGlossary, scrollPosition, isLoading, t }) {
  if (isLoading)
    return (
      <div className="QuarterList_main">
        <QuarterPanel loading={true} />;
      </div>
    );
  return (
    <div className="QuarterList_main">
      {data.map((res, index) => {
        return (
          <QuarterPanel
            loading={false}
            data={res}
            key={index}
            glossaryPanel={selectGlossary}
            scrollPosition={scrollPosition}
            t={t}
          />
        );
      })}
    </div>
  );
}

export default QuartersListData;
