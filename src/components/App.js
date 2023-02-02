import Main from "./Main";
import CheckConnection from "./CheckConnection";
import api from "../utils/Api";
import GenreMovieContext from "../contexts/GenreMovieContext";
import React, { useEffect, useState } from "react";

function App() {
  const [movieData, setMovieData] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [number, setNumber] = useState(1);
  const [rated, setRated] = useState([]);
  const [section, setSection] = useState("search");
  const [genresNames, setGenresNames] = useState([]);
  const [autorKey, setAutorKey] = useState(0);
  const [movieGrade, setMovieGrade] = useState([]);

  function getPopularMoviesFunction() {
    setIsLoad(true);
    api
      .getPopularMovies({ page: 1 })
      .then((findMovies) => setMovieData(findMovies.results))
      .catch(() => "Ошибка на стороне сервера, уже решаем")
      .finally(() => setIsLoad(false));
  }

  useEffect(() => {
    setMovieGrade(JSON.parse(localStorage.getItem("movieGrade")) || []);

    getPopularMoviesFunction();

    api
      .getGenres()
      .then((data) => {
        setGenresNames(data.genres);
      })
      .catch(() => "Ошибка на стороне сервера, уже решаем");
    /*  */
    /*  */
    /*  */
    /*  */
    /*  */
    /*  */
    setAutorKey(JSON.parse(localStorage.getItem("autorKey")));
    if (!autorKey && autorKey !== 0) {
      api
        .getSession()
        .then((data) => {
          setAutorKey(data.guest_session_id);

          localStorage.setItem(
            "autorKey",
            JSON.stringify(data.guest_session_id)
          );
        })
        .catch(() => "Ошибка на стороне сервера, уже решаем");
    }
    /*  */
    /*  */
    /*  */
    /*  */
    /*  */
  }, []);

  function handleCardRate(id, value) {
    api
      .setRate(autorKey, id, value)
      .then((data) => {
        if (movieGrade.some((el) => el.id === id)) {
          const newRated = movieGrade.filter((el) => {
            if (el.id === id) {
              el.value = value;
            }
            return el;
          });
          setMovieGrade(newRated);
        } else {
          const movieGradeItem = {};
          movieGradeItem.id = id;
          movieGradeItem.value = value;

          setMovieGrade([movieGradeItem, ...movieGrade]);
        }
      })
      .catch(() => "Ошибка на стороне сервера, уже решаем");
  }

  useEffect(() => {
    localStorage.setItem("movieGrade", JSON.stringify(movieGrade));
  }, [movieGrade]);

  function handleChangeSection(key) {
    setIsLoad(true);
    setSection(key);

    if (key === "rated") {
      api
        .getRated(autorKey)
        .then((data) => {
          setRated(data.results);
        })
        .catch(() => "Ошибка на стороне сервера, уже решаем")
        .finally(() => {
          setIsLoad(false);
        });
    } else {
      getPopularMoviesFunction();
    }
  }

  function handleSearchMovie(query, page) {
    setIsLoad(true);
    return api
      .getSearchMovies({ /* query: */ query, /* page: */ page })
      .then((findMovies) => {
        if (!findMovies.results.length) {
          setIsEmpty(true);
        } else {
          setMovieData(findMovies.results);
          setIsEmpty(false);
        }
      })
      .catch(() => "Ошибка на стороне сервера, уже решаем")
      .finally(() => setIsLoad(false));
  }

  function paginationClick(page) {
    setIsLoad(true);
    api
      .getPopularMovies({ /* page: */ page })
      .then((findMovies) => setMovieData(findMovies.results))
      .then(() => {
        window.scrollTo(0, 0);
        setNumber(page);
      })
      .catch(() => "Ошибка на стороне сервера, уже решаем")
      .finally(() => setIsLoad(false));
  }

  function debounce(fn, ms) {
    let timeout;
    return function () {
      const fnCall = () => fn.apply(this, arguments);

      clearTimeout(timeout);
      timeout = setTimeout(fnCall, ms);
    };
  }

  const debouncedShowSearchData = debounce((text) => {
    text = text.trim();
    if (text.length) {
      handleSearchMovie(text, 1);
    }

    if (text.length === 0) {
      getPopularMoviesFunction();
    }
  }, 350);

  return (
    <CheckConnection>
      <GenreMovieContext.Provider value={genresNames}>
        <Main
          movieGrade={movieGrade}
          rated={rated}
          debouncedShowSearchData={debouncedShowSearchData}
          movieData={movieData}
          paginationClick={paginationClick}
          isLoad={isLoad}
          isEmpty={isEmpty}
          number={number}
          handleCardRate={handleCardRate}
          section={section}
          handleChangeSection={handleChangeSection}
        />
      </GenreMovieContext.Provider>
    </CheckConnection>
  );
}

export default App;
