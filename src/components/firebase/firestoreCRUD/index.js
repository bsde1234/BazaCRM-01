
import firebase from './../../system/fireConfig';

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
export function getCollection(collection) {
    return firebase.firestore().collection(collection).get().then(function(querySnapshot) {
        return querySnapshot;
    });
}
export function saveInFirestoreByKey(collection, key, data) {
    return firebase.firestore().collection(collection).doc(key).set({
        ...data
    })
    .then((data) => { console.log( "DONE" )})
    .catch((error) => { console.log( 'ERROR' )});
}
export function saveInFirestoreAutoKey(collection,data){
    // Add a new document with a generated id.
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
    firebase.firestore().collection(collection).doc(key).delete()
    .then(() => {
        console.log("Document successfully deleted!");
    })
    .catch(function (error) {
        console.error("Error removing document: ", error);
    });
}
