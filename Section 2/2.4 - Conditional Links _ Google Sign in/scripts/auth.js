
//listen for auth state changes
auth.onAuthStateChanged(user =>{
    if(user){
        console.log("signed in");
        fs.collection('posts').get().then(snapshot => {
            setupPosts(snapshot.docs);
            loginCheck(user)
        });
    }else{
        console.log("user signed out")
        setupPosts([]);
        loginCheck();
    }
});


//Create new users

//get a reference to the form by querying it and storing it in a variable
const signUpForm = document.querySelector('#signup-form');

//Add an event listener...this method takes two parameters - name of event and a callback function
signUpForm.addEventListener('submit', (e)=>{

    //prevent the forms default action of refreshing the page
    e.preventDefault();

    //create constants to store values from the form
    const email = signUpForm['signup-email'].value;
    const password = signUpForm['signup-password'].value;

    //signup the user with email and password
    auth.createUserWithEmailAndPassword(email, password).then(userCredential => {

        //need to clear the form
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signUpForm.reset();

    })

});

//logging out users...should be similar to creating new users

//get a reference to the logout button
const logout = document.querySelector('#logout');

//add an event addEventListener
    logout.addEventListener('click', (e)=>{
        e.preventDefault();
        auth.signOut().then(()=>{
            
        });
    });

    const modal = document.querySelector('#modal-login');

//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e)=>{

    //prevent the forms default action of refreshing the page
    e.preventDefault();

    //create constants to store values from the form
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    //signup the user with email and password
    auth.signInWithEmailAndPassword(email, password).then(userCredential => {

        //need to clear the form
        
        M.Modal.getInstance(modal).close();
        loginForm.reset();
        

    })

});

//login with google

    const googleButton = document.querySelector('#googleLogin');
    googleButton.addEventListener('click', (e)=>{
        e.preventDefault();
        M.Modal.getInstance(modal).close();
        loginForm.reset();

        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then(function(result){
            console.log(result);
            console.log("Successful Google Sign in");


        }).catch(function(error){
            console.log(error);
            console.log("Login failed");
        })
    })















































