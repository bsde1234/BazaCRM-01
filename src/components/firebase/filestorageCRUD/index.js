
import firebase from './../../system/fireConfig';
import 'firebase/storage';
import { updateInFirestoreByKey } from '../firestoreCRUD';
export function SaveInStorage(collection, uid, data) {
  const metadata = {
    contentType: 'image/jpeg',
    customMetadata: {
      'name': data.image.name
    }
  };
  let fileName = "" + Date.now() + data.image.name;
  return firebase.storage().ref().child(`files/${collection}/${fileName}`).put(data.image, metadata);
}
export async function SaveInStorageByURL(collection, uid, data, storagePath) {

  let keys = []

  for (let img of data) {
    let promise = new Promise((resolve, reject) => {
      const metadata = {
        contentType: 'image/jpeg',
        customMetadata: {
          'name': img.name,
          'uid': uid
        }
      };
      let fileName = "" + Date.now() + img.name;
      firebase.storage().ref().child(`${collection}/${fileName}`).put(img, metadata).then(data => {
        data.ref.getDownloadURL().then(downloadURL => {
          resolve(downloadURL)
        })
      })
    });

    keys.push(await promise); // wait till the promise resolves (*)
    if(keys.length === data.length){
      return keys; // "done!"
    }

  }
}

export function DeleteFile(path) {
  var desertRef = firebase.storage().ref().child(path);
  return desertRef.delete();
}

