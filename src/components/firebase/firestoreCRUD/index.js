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

/*    ARRAY    */
export function createFireStoreArray(collection, key, arrayName, data) {
    return firebase.firestore().collection(collection).doc(key).set({
        [arrayName]: firebase.firestore.FieldValue.arrayUnion(data)
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



export function counterStart(key, uid){

    return getDataByKey('Statistic_Offers', key ).then(data => {
        if ( !data ) {
            createCounter(key,uid);   
            return {count: 1};
        } else {
            if (uid){
                counterAddRegUserData(key)
            } else { 
                counterAddUnknownUserData(key);
            }

            return data;
        }
    })
}

// CREATE COUNTER & USER COUNTER
export function createCounter(key, uid) {
    const batch = firebase.firestore().batch();

    const totalRef = firebase.firestore().collection('Statistic_Offers').doc(key);
    const unregisteredUserRef = firebase.firestore().collection(`Statistic_Offers/${key}/users`).doc(`unknownUsers`)
    const registeredUserRef = firebase.firestore().collection(`Statistic_Offers/${key}/users`).doc(`registeredUsers`)
    
    batch.set(totalRef, {count: 1,date_created : firebase.firestore.FieldValue.serverTimestamp() } );
    batch.set(unregisteredUserRef, { count: 1});
    batch.set(registeredUserRef, { count: 1});

    //const milliseconds = "_"+Math.random().toString(36).substr(2, 9);
    //const data = {count: 1, date_created : new Date() }

    return batch.commit();
}


// CREATE REGISTERED USER COUNTER
export function counterAddRegUserData(key){
    const totalRef = firebase.firestore().collection('Statistic_Offers').doc(key);
    const registeredUserRef = firebase.firestore().collection(`Statistic_Offers/${key}/users`).doc(`registeredUsers`);

    totalRef.update("count", firebase.firestore.FieldValue.increment(1));
    registeredUserRef.update("count", firebase.firestore.FieldValue.increment(1));

    const data = {date_created : new Date()}

    updateFireStoreArray(`Statistic_Offers/${key}/users`, `registeredUsers`, 'date_visits', data)
}


// CREATE UNREGISTERED USER COUNTER
export function counterAddUnknownUserData(key){
    const totalRef = firebase.firestore().collection('Statistic_Offers').doc(key);
    const unregisteredUserRef = firebase.firestore().collection(`Statistic_Offers/${key}/users`).doc(`unknownUsers`);

    totalRef.update("count", firebase.firestore.FieldValue.increment(1));
    unregisteredUserRef.update("count", firebase.firestore.FieldValue.increment(1));

    const data = {date_created : new Date()}

    updateFireStoreArray(`Statistic_Offers/${key}/users`, `unknownUsers`, 'date_visits', data)

}