
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";
    import { getDatabase, ref, set, update, onValue } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-database.js";

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyD-TLiM1PAMk6XVlSqShRAwX-5cnW4lVtA",
      authDomain: "join-1c1f8.firebaseapp.com",
      projectId: "join-1c1f8",
      storageBucket: "join-1c1f8.appspot.com",
      messagingSenderId: "1031166849094",
      appId: "1:1031166849094:web:9547a88ddee0b9790bda47",
      databaseURL: "https://join-1c1f8-default-rtdb.europe-west1.firebasedatabase.app"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const database = getDatabase(app);

    let submitDataExist = document.getElementById('submitData');
    let loginActionExist = document.getElementById('loginAction');
    let logoutExist = document.getElementById('logout');

    


    if(submitDataExist){

        submitData.addEventListener('click', (e) => {
        
            let email = document.getElementById('emailSignUp').value;
            let password = document.getElementById('passwordSignUp').value;
            let username = document.getElementById('nameSignUp').value;
            
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ... user.uid
                set(ref(database, 'users/' + user.uid), {
                    username: username,
                    email: email,
                    password: password
                })
                    .then(() => {
                        // Data saved successfully!
                        alert('user created successfully');
        
                    })
                    .catch((error) => {
                        // The write failed...
                        alert(error);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                alert(errorMessage);
            });
    
            
            
        })
    }

    if(loginActionExist) {

        loginAction.addEventListener('click', (e) => {
            let email = document.getElementById('loginEmail').value;
            let password = document.getElementById('loginPassword').value;
    
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            let lgDate = new Date();
            // ...
            update(ref(database, 'users/' + user.uid), {
                last_login: lgDate,
            })
                .then(() => {
                    // Data saved successfully!
                    alert('user logged successfully');

                })
                .catch((error) => {
                    // The write failed...
                    alert(error);
                });
            alert(email + ' logged in');
            })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            });
    
            
        })
    }


    onAuthStateChanged(auth, (user) => {
        let accountExist = document.getElementById('account');
        let data;
        const splittedUrl = window.location.href.split('/');
        const url = splittedUrl[splittedUrl.length-1]; 
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          const starCountRef = ref(database, 'users/' + uid );
          onValue(starCountRef, (snapshot) => {
            data = snapshot.val();
            console.log(data);
            if(accountExist){
                accountExist.innerHTML = `${data.username }`;

            }
            if(url == 'login.html' || url == 'signup.html'){
                window.location.replace('');
            }
          });

          // ...
        } else {
            // User is signed out
            console.log(data);
            console.log('user logged out')
            if(url != 'login.html' && url != 'signup.html'){
                window.location.replace('login.html')
            }
           

          // ...
        }
    });
    
    if(logoutExist){
        console.log('logout exist');
        window.logout.addEventListener('click', (e) => {
            console.log('logout work')
            signOut(auth).then(() => {
                
                // Sign-out successful.
            }).catch((error) => {
                  // An error happened.
            });
        })
            
    }

    



    
       

       
        
      
    

 

    
   

    
  



 

