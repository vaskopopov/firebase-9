import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, doc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBuKBBHaycfH79LRLdyyMrZuUwTZxEVBWI",
    authDomain: "fir-9-dojo-2676e.firebaseapp.com",
    projectId: "fir-9-dojo-2676e",
    storageBucket: "fir-9-dojo-2676e.appspot.com",
    messagingSenderId: "181856333130",
    appId: "1:181856333130:web:315bbedace6f32bb8b25b3"
  };

  // init firebase app
  initializeApp(firebaseConfig)

  // init services
  const db = getFirestore()
  
  // collection ref
  const colRef = collection(db, 'books')

  // get collection data
  getDocs(colRef)
    .then((snapshot) => {
      let books = []
      snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id})
      })
      console.log(books)
    })
    .catch(err => {
      console.log(err.message)
    })

    // adding documents
    const addBookForm = document.querySelector('.add')
    addBookForm.addEventListener('submit', (e) => {
      e.preventDefault()

      addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value
      })
      .then(() => {
        addBookForm.reset()
      })

    })


    // deleting documents
    const deleteBookForm = document.querySelector('.delete')
    deleteBookForm.addEventListener('submit', (e) => {
      e.preventDefault()

      const docRef = doc(db, 'books', deleteBookForm.id.value)

      deleteDoc(docRef)
        .then(() => {
          deleteBookForm.reset()
        })
    })