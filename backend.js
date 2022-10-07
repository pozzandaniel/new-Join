
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
    import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyD-TLiM1PAMk6XVlSqShRAwX-5cnW4lVtA",
      authDomain: "join-1c1f8.firebaseapp.com",
      projectId: "join-1c1f8",
      storageBucket: "join-1c1f8.appspot.com",
      messagingSenderId: "1031166849094",
      appId: "1:1031166849094:web:9547a88ddee0b9790bda47"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();




submitData.addEventListener('click', (e) => {

    let email = document.getElementById('emailSignUp').value;
    let password = document.getElementById('passwordSignUp').value;
    
    
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        alert('user created!')
    
      
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
})

