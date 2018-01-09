import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyC3CRn_9PMJ8O_pKZj5VpU2EFqpArkZ8zc",
    authDomain: "maine-dashboard.firebaseapp.com",
    databaseURL: "https://maine-dashboard.firebaseio.com",
    projectId: "maine-dashboard",
    storageBucket: "maine-dashboard.appspot.com",
    messagingSenderId: "923338764388"
  };
firebase.initializeApp(config);

export default firebase;
export const dbRefObject = firebase.database().ref().child("schedules");
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export function getAllSchedules(callback) {
  var schedules = [];
  dbRefObject.on('value', snap => {
    for(var schedule in snap.val()){
      schedules.push({
        id: schedule,
        events: snap.val()[schedule].events,
        name: snap.val()[schedule].name
      })
    };
  })
  callback(schedules);
}

export function addSchedule(schedule) {
  var schedulesRef = firebase.database().ref('schedules');
  schedulesRef.push(schedule);
  console.log("Data Sent. Schedule Added.")
}
