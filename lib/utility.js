/**
 * Returns proper sql query time format given minutes
 * @param {*} minutes
 */

const minutesToQueryFormat = function(minutes) {
  if (minutes < 60) {
    return `00:${minutes}:00`;
  } else {
    let hours = Math.floor(minutes / 60);
    let minutes = Math.floor(((minutes / 60) - hours) * 60);
    return `0${hours}:${minutes}:00`;
  }
}

module.exports = {
  minutesToQueryFormat
};
