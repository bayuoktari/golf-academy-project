import axios from '../../axios';

export function Login(data) {
  return function () {
    return axios({
      method: 'POST',
      url: 'student/login',
      data: {
        email: data.email,
        password: data.password,
      },
    });
  };
}

export function LoginCoach(data) {
  return function () {
    return axios({
      method: 'POST',
      url: 'staff/login',
      data: {
        email: data.email,
        password: data.password,
      },
    });
  };
}
