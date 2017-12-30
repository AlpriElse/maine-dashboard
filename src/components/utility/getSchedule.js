export default function getSchedule(callback) {
  var url = "api/schedule";
  fetch(url)
    .then(res => {
      return res.json();
    })
    .then(schedule => {
      return callback(schedule);
    })
}
