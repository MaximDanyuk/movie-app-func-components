import MovieItem from './MovieItem.js';

export default function RatedPage({
  rated,
  handleCardRate,
  movieGrade,
}) {
  return (
    <section className="card-items">
      {rated.map((el) => (
        <MovieItem
          key={el.id}
          handleCardRate={handleCardRate}
          movieGrade={movieGrade}
          {...el}
        />
      ))}
    </section>
  );
}
