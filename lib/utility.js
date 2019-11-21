/**
 * Returns proper sql query time format given minutes
 * @param {*} minutes
 */
const minutesToQueryFormat = function(minutes) {
  if (minutes == null) {
    return "";
  }
  if (minutes < 60) {
    return `00:${minutes}:00`;
  } else {
    let hoursSection = Math.floor(minutes / 60);
    let minutesSection = Math.floor(((minutes / 60) - hoursSection) * 60);
    if (minutesSection < 10) {
      let result = `0${hoursSection}:0${minutesSection}:00`;
      return result;
    } else {
      let result = `0${hoursSection}:${minutesSection}:00`;
      return result;
    }
  }
}

module.exports = {
  minutesToQueryFormat
};
