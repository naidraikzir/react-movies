const initialState = {
  search: '',
  page: 1,
  movies: [],
  error: '',
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_PAGE':
      return {
        ...state,
        page: payload,
      };
    case 'SET_SEARCH':
      return {
        ...state,
        search: payload,
      };
    case 'RESET_SEARCH':
      return {
        ...state,
        search: initialState.search,
      };
    case 'ADD_MOVIES':
      return {
        ...state,
        movies: [
          ...state.movies,
          ...payload,
        ],
      };
    case 'RESET_MOVIES':
      return {
        ...state,
        movies: initialState.movies,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: payload,
      };
    case 'RESET_ERROR':
      return {
        ...state,
        error: initialState.error,
      };
    default:
      return state;
  }
};

export default reducer;
