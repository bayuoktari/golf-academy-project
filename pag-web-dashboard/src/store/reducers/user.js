const initialValue = {
  isLogin: localStorage.getItem("access_token") ? true : false,
};

export default function userReducer(state = initialValue, action) {
  switch (action.type) {
    case "SET_USER_LOGIN":
      return { ...state, isLogin: action.status };
    default:
      return state;
  }
}
