const store = {
  isLogin: false,
  userLocation: {
    location: 'Find Your Location...',
    distance: 'Counting...',
  },
  name: '',
  profilePict: '',
  checkInTime: '',
  checkOutTime: '',
};

export default function user(state = store, action) {
  switch (action.type) {
    case 'SET_LOGING':
      return { ...state, isLogin: action.val };
    case 'SET_LOCATION_DETAIL':
      return { ...state, userLocation: action.locationDetail };
    case 'SET_USER_NAME':
      return { ...state, name: action.fullname };
    case 'SET_CHECK_IN':
      return { ...state, checkInTime: action.checkInTime };
    case 'SET_CHECK_OUT':
      return { ...state, checkOutTime: action.checkOutTime };
    case 'SET_PROFILE_PICT':
      return { ...state, profilePict: action.profilePict };
    default:
      return state;
  }
}
