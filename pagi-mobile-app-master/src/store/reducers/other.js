const store = {
  error: {
    status: false,
    message: '',
  },
};

export default function other(state = store, action) {
  switch (action.type) {
    case 'SET_ERROR':
      return { ...state, error: action.val };
    default:
      return state;
  }
}
