

  
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      uid = user.uid;
    } else {
      console.log("no user") 
    }
  });



let signup = ()=>
{
  let username = document.getElementById('username').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  
  var userdetail = {
    username,
    email,
    password,
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    alert("user signup successfully")
    
    firebase.database().ref(`users/${user.uid}`).set(
      userdetail 
    )
    
    firebase.database().ref(`users/${user.uid}/othersteam/iddd1`).set(
      {
        teamname: "dummyteam1",
        
        question :{
          q1: "what is your name?",
          q2: "what is your Father name?",
          q3: "what do you do?"
        }

      }
    )
    
    
    
    firebase.database().ref(`users/${user.uid}/othersteam/iddd2`).set(
      {
        teamname: "dummyteam1",
        
        question :{
          q1: "what is your name?",
          q2: "what is your Father name?",
          q3: "what do you do?"
        }

      }
      ).then(
     ()=>{
       window.location = "login.html"
     }
    )
  
     

  
  
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
    // ..
  });
  
}


let login = ()=>
{
let email=document.getElementById('email').value;
let password=document.getElementById('password').value;

firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    alert("user sign in successfully")

    window.location= "user.html"
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
  });

}


let GetDataFromFireBase = ()=>{

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      let uid = user.uid;

      let ownteam = document.getElementById("ownteam")

  firebase.database().ref(`users/${uid}/teamsOwned`).on("child_added",(data)=>{
    // alert("GetDataFromFireBase")
    // console.log (data.val().teamname)
    let key = data.key
  
  
  
    ownteam.innerHTML += ` <div class="teambox">
  <h2>${data.val().teamname}</h2>
  <h4>${data.val().teamcategory} </h4>
  <p>Members Email: ${data.val().membersemail} </p>  


  <a href = 'ownerview.html#${key}'> 
  <button type="button" class="btn btn-primary addbtn">
  View team
</button>
  
  </a>
  
  </div> 
 
 `


  })




    } else {
      console.log("no user") 
    }
  });



}




// let addmember = ()=>{
  
//   let name = prompt("Enter member name")
//   let email = prompt("Enter user email")
//   let myteam = document.getElementById("ownteamlist");

//   myteam.innerHTML +=`<li> ${name} </li>`


// }

// console.log(firebase)



let createTeam = ()=>{

  let ownteam = document.getElementById("ownteam")


  let teamname= document.getElementById("teamname").value 
  let teamcategory= document.getElementById("teamcategory").value
  let membersemail= document.getElementById("membersemail").value
  let closebtn = document.getElementById("closebtn")


  firebase.database().ref(`users/${uid}/teamsOwned`).push(
    {
      teamname,
      teamcategory,
      membersemail
    }
  )


    
 closebtn.click();
}
