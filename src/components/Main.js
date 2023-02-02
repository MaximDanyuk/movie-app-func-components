import RowItems from './RowItems.js';
import Search from './Search.js';
import RatedPage from './RatedPage.js';
import SectionButtons from './SectionButtons.js';
import React from 'react';

function Main({
  movieData,
  paginationClick,
  isLoad,
  isEmpty,
  number,
  debouncedShowSearchData,
  handleCardRate,
  section,
  handleChangeSection,
  rated,
  movieGrade,
}) {
  return (
    <main className="main page__main">
      <SectionButtons handleChangeSection={handleChangeSection} />
      {section === 'search' ? (
        <>
          <Search debouncedShowSearchData={debouncedShowSearchData} />
          <RowItems
            movieGrade={movieGrade}
            movieData={movieData}
            isEmpty={isEmpty}
            paginationClick={paginationClick}
            isLoad={isLoad}
            number={number}
            handleCardRate={handleCardRate}
          />
        </>
      ) : (
        <RatedPage
          movieGrade={movieGrade}
          rated={rated}
          movieData={movieData}
        />
      )}
    </main>
  );
}

export default Main;
