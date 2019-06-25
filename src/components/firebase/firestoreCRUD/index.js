import 'firebase/firestore';
import firebase from './../../system/fireConfig';



export function saveInFirestoreByKey(collection, key, data) {
    return firebase.firestore().collection(collection).doc(key).set({
        ...data
    })
}
export function getDataByKey(collection, key) {
    var docRef = firebase.firestore().collection(collection).doc(key);
    return docRef.get().then(function (doc) {
        if (doc.exists) {
            return doc.data();
        } else {
            return null;
        }
    }).catch(function (error) {
        return error;
    });
}
export function dataSnapshot(collection, key) {
    return firebase.firestore().collection(collection).doc(key)
}

export function getOfferCollection(collection) {
   return firebase.firestore().collection(collection).where('approved', '==', false).limit(30).orderBy("data_created", "desc").get()
}
export function getSavedOffers( uid) {
    return firebase.firestore().collection('savedOffers').where('uid', '==', uid).orderBy("data_created", "desc").get()
 }

export function saveInFirestoreAutoKey(collection,data){
    // Add a new document with a generated id.
    data.data_created = firebase.firestore.FieldValue.serverTimestamp() 
    return firebase.firestore().collection(collection).add({
        ...data
    })
}

export function updateInFirestoreByKey( collection, key, data) {
    if (data && collection && key) {
        return firebase.firestore().collection(collection).doc(key).update({
            ...data
        })
    }
}
export function deleteInFirestoreByKey(collection, key) {
    return firebase.firestore().collection(collection).doc(key).delete()
    .then(() => {
        console.log("Document successfully deleted!");
    })
    .catch(function (error) {
        console.error("Error removing document: ", error);
    });
}
export function updateFireStoreArray(collection, key, arrayName, data) {
    return firebase.firestore().collection(collection).doc(key).update({
        [arrayName]: firebase.firestore.FieldValue.arrayUnion(data)
    });
}
export function deleteFireStoreArrayVal(collection, key, arrayName, data) {
    return firebase.firestore().collection(collection).doc(key).update({
        [arrayName]: firebase.firestore.FieldValue.arrayRemove(data)
    });
}
