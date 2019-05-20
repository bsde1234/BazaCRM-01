



import firebase  from './../../system/fireConfig';
import 'firebase/auth';
import {saveInFirestore} from './../firestoreCRUD/'

    const auth = firebase.auth();
    export  function doCreateUserWithEmailAndPassword (email, password,name,phone) {
       return auth.createUserWithEmailAndPassword(email, password) 
       .catch((error)=>{console.log(error)})
       .then( () => {
                auth.currentUser.updateProfile({
                displayName: name,
            });
        }).then(()=>{
            let data = {userInfo:{ email:email, name:name, phone:phone, userPic:{filePath:'', name:''}}}
            saveInFirestore(`users/`, auth.currentUser.uid, data)
        }) 
    }
    export  function doSignInWithEmailAndPassword(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }
    export  function doSignOut(){ 
        auth.signOut();
    }
    export  function doPasswordReset(email){ 
       return auth.sendPasswordResetEmail(email);
    }
    export  function doPasswordUpdate (password) {
        return auth.currentUser.updatePassword(password);
    }
    export function getUserInfo (){
        return auth
    }
    export function getUserStatus(){
        return auth.currentUser;
    }
    export function sentVerifyUserEmail(){
        return auth.currentUser.sendEmailVerification()
    }

    
    



