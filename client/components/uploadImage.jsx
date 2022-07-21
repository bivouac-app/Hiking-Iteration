import React, { useState } from 'react';
import {storage} from './firebase'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import axios from 'axios';
import Cookies from 'js-cookie'
// User.findById(id).exec().then((user) => user.gallery.push(link))

function UploadImage(id) {

  // let userId = await fetch('/api/users/cookieID');
  
  const [imageUpload, setImageUpload] = useState(null);
  const uploadImage = () => {
    if (imageUpload) {
      const imgRef = ref(storage, `images/${imageUpload.name}`)
      uploadBytes(imgRef, imageUpload)
      .then(() => {
        console.log('it worked')
        getDownloadURL(imgRef).then((data) => {
        //   console.log(data);
        //   document.getElementById('img').src = data;
            axios.post('/api/users/upload', {link: data, id: Cookies.get('id')})

        });
      })
    }

    else {
      console.log('it failed')
    }
  }

  return (
    <div>
      <input type={"file"} onChange={(e) => setImageUpload(e.target.files[0])}></input>
      <button type='submit' onClick={uploadImage}>Upload Image</button>
    </div>
  );
}

export default UploadImage;
