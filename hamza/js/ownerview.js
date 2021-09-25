var teamid = window.location.hash.slice(1);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    uid = user.uid;
    let q1 = "it is dummy question1";
    let q2 = "it is dummy question2";
    let q3 = "it is dummy question3";
    firebase
      .database()
      .ref(`users/${uid}/teamsOwned/${teamid}/question`)
      .on("value", (data) => {
        if (data.val() == null) {
          firebase
            .database()
            .ref(`users/${uid}/teamsOwned/${teamid}/question`)
            .set({
              q1,
              q2,
              q3,
            });
        }
      });
  } else {
    console.log("no user");
  }
});
let ownerviewdiv = document.getElementById("ownerviewdiv");

let updateQuestions = () => {
  let q1 = document.getElementById("q1").value;
  let q2 = document.getElementById("q2").value;
  let q3 = document.getElementById("q3").value;

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      uid = user.uid;

      firebase
        .database()
        .ref(`users/${uid}/teamsOwned/${teamid}/question`)
        .set({
          q1,
          q2,
          q3,
        });
    } else {
      console.log("no user");
    }
  });
};

let GetDataFromFireBase = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      let uid = user.uid;

      let members = document.getElementById("Members");

      firebase
        .database()
        .ref(`users/${uid}/teamsOwned/${teamid}`)
        .on("value", (data) => {
          console.log(uid);
          console.log(teamid);

          console.log(data.val());

          document.getElementById("q1").value = data.val().question.q1;
          document.getElementById("q2").value = data.val().question.q2;
          document.getElementById("q3").value = data.val().question.q3;

          members.innerHTML = data.val().membersemail;
        });
    } else {
      console.log("no user");
    }
  });
};

let showReports = ()=>{
  let reports = document.getElementById("Reports")
  let setting= document.getElementById("Settings")

  reports.style.display = "block";
  setting.style.display = "none";
}


let showSettings = ()=>{
  let reports = document.getElementById("Reports")
  let setting= document.getElementById("Settings")
  reports.style.display = "none";
  setting.style.display = "block"
}