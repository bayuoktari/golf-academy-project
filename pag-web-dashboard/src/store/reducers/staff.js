const initialValue = {
  staffList: [],
  absenceReport: [],
};

export default function staffReducers(state = initialValue, action) {
  switch (action.type) {
    case "SET_STAFF_LIST":
      return { ...state, staffList: action.staff };
    case "SET_ABSENCE_STAFF":
      return { ...state, absenceReport: action.reports };
    default:
      return state;
  }
}
