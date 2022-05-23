const initialValue = {
  listStudent: [],
  absenceReport: [],
  detailStudent: {},
  loading: false,
};

export default function studentReducer(state = initialValue, action) {
  switch (action.type) {
    case "SET_LIST_STUDENT":
      return { ...state, listStudent: action.students };
    case "SET_ABSENCE_STUDENT":
      return { ...state, absenceReport: action.reports };
    case "SET_DETAIL_STUDENT":
      return { ...state, detailStudent: action.detail };
    case "SET_LOADING":
      return { ...state, loading: action.loading };
    default:
      return state;
  }
}
