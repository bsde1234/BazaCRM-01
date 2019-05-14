
import firebase  from './../../system/fireConfig';

export function getData(collection, key) {

    if (key) {
        return firebase.firestore().collection(collection).doc(key).get().then((data) => { return data });
    }

}

export function saveInFirestore(data) {
    if (data) {
        let db = firebase.firestore().collection('users');
        db.add({
            ...data
        }).then((docRef) => {
            console.log(docRef);

        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            })
    }
    return true
}

export function updateInFirestoreByKey(data, key) {
    if (data.title && data.tooltipPosition) {
        let db = firebase.firestore().collection('files').doc(key);
        return db.update({
            title: data.title,
            tooltipPosition: data.tooltipPosition
        }).then(() => {
            return true;
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
                return false;
            })
    }

}
export function deleteInFirestoreByKey(key) {
    firebase.firestore().collection('files').doc(key).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}
