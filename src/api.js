import { get } from 'req';
import store from 'store';
import {
  setMovies,
  resetMovies,
  setPage,
  setError,
  resetError,
} from 'store/actions';

export const fetchMovies = async () => {
  const { page, search } = store.getState(state => state);
  try {
    const { data } = await get('/', {
      params: {
        s: search,
        page: page + 1,
        type: 'movie'
      }
    });

    if (data.Error) {
      store.dispatch(setError(data.Error));
      store.dispatch(resetMovies());
    } else {
      store.dispatch(resetError());
      store.dispatch(setMovies(data.Search));
      store.dispatch(setPage(page + 1));
    }
  } catch ({ response }) {
    store.dispatch(setError(response.data.Error));
  }
};

export const fetchMovie = async (id) => {
  try {
    const { data } = await get('/', {
      params: {
        i: id,
      },
    })
    return data;
  } catch ({ response }) {
    return Promise.reject(response.data.Error);
  }
};
