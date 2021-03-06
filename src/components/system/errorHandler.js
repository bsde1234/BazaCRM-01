export function ErrorHandler(error) {

    return new Promise(function (resolve, reject) {
        if (error) {
            console.log(error)
            switch (error.code) {
                case "auth/weak-password":
                    resolve('Weak password.');
                    break;
                case "auth/email-already-in-use":
                    resolve( 'Email already in use.' );
                    break;
                case "Max. size of photo - 5MB.":
                    resolve("Max. size of photo - 5MB." );
                    break;

                case "auth/invalid-email":
                    resolve("Не корректный email адрес.");
                    break;
                default: break;
            }
        }

    });

}