import { get } from 'req';

export const fetchMovies = async (page, search) => {
  try {
    const { data } = await get('/', {
      params: {
        s: search,
        page: page + 1,
        type: 'movie'
      }
    });
    return data;
  } catch ({ response }) {
    return Promise.reject(response.data.Error);
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
