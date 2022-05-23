export function hmsToSeconds(s) {
  var b = s.split(":");
  return b[0] * 3600 + b[1] * 60 + (+b[2] || 0);
}

export function secondsToHMS(secs) {
  function z(n) {
    return (n < 10 ? "0" : "") + n;
  }
  var sign = secs < 0 ? "-" : "";
  secs = Math.abs(secs);
  return (
    sign +
    z((secs / 3600) | 0) +
    ":" +
    z(((secs % 3600) / 60) | 0) +
    ":" +
    z(secs % 60)
  );
}
