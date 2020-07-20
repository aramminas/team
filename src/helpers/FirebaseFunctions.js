import Firebase from '../Firebase'

/* Upload Image  */ /* (public) */
const uploadImage = (data) => {
    return new Promise((resolve, reject) => {
        let url = ""
        if(data.file){
            let storageRef = Firebase.storage.ref(`storage/teamBuilder`)
            let uploadTask = storageRef.child(`/${data.name}`).put(data.file)
            uploadTask.on('state_changed', function(snapshot){
                // 😷 handling promise Id | let id = snapshot?.metadata?.generation || null
            }, function(error) {
                reject({message:`Failed to upload image: ${error.message}`})
            }, function() {
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    if(downloadURL){
                        resolve({downloadURL})
                    }else{
                        reject({message:`Failed to load image's URL: ${url}`})
                    }
                })
            })
        }
    })
}

const FirebaseFunctions = {
    uploadImage, // upload image to firebase storage
}

export default FirebaseFunctions