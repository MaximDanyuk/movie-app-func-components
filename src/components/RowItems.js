import MovieItem from './MovieItem.js';
import Spin from './Spin.js';
import React from 'react';
import 'antd/dist/reset.css';
import { Pagination } from 'antd';

function RowItems({
  movieData,
  paginationClick,
  isLoad,
  isEmpty,
  number,
  handleCardRate,
  movieGrade,
}) {
  return isLoad ? (
    <Spin />
  ) : (
    <>
      {isEmpty ? (
        <div className="search_mistaken">
          Sorry :(, could you rephrase your request, we cant find smth
        </div>
      ) : (
        <>
          <section className="card-items">
            {movieData.map((el) => (
              <MovieItem
                movieGrade={movieGrade}
                key={el.id}
                handleCardRate={handleCardRate}
                {...el}
              />
            ))}
          </section>

          <Pagination
            defaultCurrent={number}
            total={500}
            className="pagination"
            onChange={(current) => paginationClick(current)}
          />
        </>
      )}
    </>
  );
}
export default RowItems;
