import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where, 
  orderBy, serverTimestamp,
  getDoc, updateDoc
} from 'firebase/firestore'

import {
  getAuth
} from 'firebase/auth'

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
  const auth = getAuth()
  
  // collection ref
  const colRef = collection(db, 'books')

  // queries
  const q = query(colRef, orderBy('createdAt'))


  // real time  collection data
  onSnapshot(q, (snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id})
    })
    console.log(books)
  })

  // adding documents
  const addBookForm = document.querySelector('.add')
  addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
      title: addBookForm.title.value,
      author: addBookForm.author.value,
      createdAt: serverTimestamp()
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

// get a single document
const docRef = doc(db, 'books', 'RTBjFuNKpwOBaEbOfBrr')

onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id)
})

// update a document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', updateForm.id.value)

  updateDoc(docRef, {
    title: 'updated title'
  })
  .then(() => {
    updateForm.reset()
  })

})