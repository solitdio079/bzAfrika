import {
  fullName,
  submitBtn,
  signUpForm,
  loader,
  signUpEmail,
  pwd,
  confirmPwd,
  feedBack,
  loginEmail,
  loginPwd,
  loginForm,
  accountBtn,
} from './UI.js'
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js'
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBzokvZ1i8liZnIsoyaFGh3B5n35kAIVmI",
    authDomain: "bizimafrika.firebaseapp.com",
    projectId: "bizimafrika",
    storageBucket: "bizimafrika.appspot.com",
    messagingSenderId: "946346762773",
    appId: "1:946346762773:web:bd8ab39738f1dd164f241c"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const firestore = getFirestore(app)




function signUpFunction(e) {
    e.preventDefault()
    submitBtn.innerHTML = ''
    submitBtn.appendChild(loader)
    loader.style.display = 'block'
        // Check if fields are empty
    const name = emptyFieldTest(fullName, 'Enter your full name please!')
    const email = emptyFieldTest(signUpEmail, 'Enter your email please!')
    const password = emptyFieldTest(pwd, 'Enter a password please!')
    const confirmPassword = emptyFieldTest(confirmPwd, 'Enter password confirmation please!')
        //Check if password matches
    if (password !== confirmPassword) {
        showFeedBack("error", "Passwords not matching!")

    } else {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user
                showFeedBack("success", "you are signed in")

            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                showFeedBack("error", errorMessage)

            })
    }
}
//  Sign In Function
function signInFunction(e) {
    e.preventDefault()
    submitBtn.innerHTML = ''
    submitBtn.appendChild(loader)

    loader.style.display = 'block'
    const email = emptyFieldTest(loginEmail, 'Enter your email please!')
    const password = emptyFieldTest(loginPwd, 'Enter a password please!')

    // Sign User in
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user
            showFeedBack('success', 'you are signed in')
                // ...
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            showFeedBack('error', errorMessage)
        })
}

// Detect auth state

onAuthStateChanged(auth, user => {
    if (user != null) {
        console.log(user)
        if (window.location.pathname !== '/index.html') {
             window.location.href = 'index.html'
        } 
    } else {
        console.log('Not connected!')
    }

})

//Event Listeners
switch (window.location.pathname) {
    case '/signup.html':
        signUpForm.addEventListener('submit', signUpFunction)
        break
    case '/login.html':
        loginForm.addEventListener('submit', signInFunction)
        break
    
    case '/index.html':
        accountBtn.href ="login.html"
        break;

    default:
        break
}







// UI FUNCTİONS
function showFeedBack(type, message) {
    switch (type) {
        case 'error':
            feedBack.style.backgroundColor = 'red'
            feedBack.style.color = '#fefefe'

            feedBack.style.padding = '.5rem'
            feedBack.innerHTML = message
            setTimeout(clearFeedBack, 5000)

            break
        case 'success':
            feedBack.style.backgroundColor = 'green'
            feedBack.style.color = '#fefefe'

            feedBack.style.padding = '.5rem'
            feedBack.innerHTML = message
            setTimeout(clearFeedBack, 5000)
            break

        default:
            feedBack.style.backgroundColor = 'red'
            feedBack.style.color = '#fefefe'

            feedBack.style.padding = '.5rem'
            feedBack.innerHTML = 'An error occured'
            setTimeout(clearFeedBack, 5000)
            break
    }
}

function clearFeedBack() {
    feedBack.innerHTML = ''
    feedBack.style.backgroundColor = 'transparent'

}

function emptyFieldTest(input, message) {
    if (input.value != '') {
        submitBtn.innerHTML = 'Submit'
        return input.value
    } else {
        submitBtn.innerHTML = 'Submit'
        showFeedBack('error', message)
    }

}