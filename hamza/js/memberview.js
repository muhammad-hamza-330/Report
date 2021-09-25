  

var teamid = window.location.hash.slice(1)


var currentdate = document.getElementById("currentdate")

var date = new Date()

let date1 = date.getDate()
let month = date.getMonth()+1
let year = date.getFullYear()


currentdate.innerHTML = `Filing for ${date1}/${month}/${year}`







let GetDataFromFireBase = ()=>{

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let uid = user.uid;
  
        
  
    firebase.database().ref(`users/${uid}/othersteam/iddd1`).on("value",(data)=>{
    

         document.getElementById("q1").value = data.val().question.q1
         document.getElementById("q2").value = data.val().question.q2
         document.getElementById("q3").value = data.val().question.q3
    
     
    })

  
      } else {
        console.log("no user") 
      }
    });
  }