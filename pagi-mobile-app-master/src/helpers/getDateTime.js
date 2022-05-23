import getMonth from '../helpers/getMonth';

export function getDate() {
  let date = new Date().getDate(); //Current Date
  let month = getMonth(new Date().getMonth() + 1); //Current Month
  let year = new Date().getFullYear(); //Current Year

  return `${date} ${month} ${year}`;
}

export function getTime() {
  let hours = new Date().getHours(); //Current Hours
  let min = new Date().getMinutes(); //Current Minutes
  let sec = new Date().getSeconds(); //Current Seconds

  if (sec < 10) {
    sec = '0' + sec;
  }
  if (min < 10) {
    min = '0' + min;
  }
  return hours + ':' + min + ':' + sec;
}
