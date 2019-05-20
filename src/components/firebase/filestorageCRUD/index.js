
import firebase from './../../system/fireConfig';
import 'firebase/storage';
export function SaveInStorage( collection, uid, data) {
  const metadata = {
    contentType: 'image/jpeg',
    customMetadata: {
      'name': data.image.name
    }
  };
  let fileName = "" + Date.now() + data.image.name;
  return firebase.storage().ref().child(`files/${collection}/${fileName}`).put(data.image, metadata);
}

export function DeleteFile(path) {
  var desertRef = firebase.storage().ref().child(path);
  return desertRef.delete();
}

