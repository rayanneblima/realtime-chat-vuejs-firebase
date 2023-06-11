import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import {
  getFirestore,
  collection,
  onSnapshot,
  orderBy,
  query,
  limit,
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';

import {
  computed,
  ref,
  onUnmounted,
} from 'vue'

const app = initializeApp({
  apiKey: "AIzaSyB6WG42U-wKBEaVC3y_u_-EtooV9SyesGI",
  authDomain: "realtime-chat-65d32.firebaseapp.com",
  projectId: "realtime-chat-65d32",
  storageBucket: "realtime-chat-65d32.appspot.com",
  messagingSenderId: "633290658408",
  appId: "1:633290658408:web:3641799feb64376a44a1dd"
})

const auth = getAuth(app);

export function useAuth() {
  const user = ref(null)
  const isLoggedIn = computed(() => user.value !== null)

  const unsubscribe = auth.onAuthStateChanged(_user => user.value = _user)

  const signIn = async () => {
    const googleProvider = new GoogleAuthProvider()
    await signInWithPopup(auth, googleProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = googleProvider.credentialFromResult(result)
      // const token = credential.accessToken
      user.value = result.user
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.customData.email
      // The AuthCredential type that was used.
      const credential = googleProvider.credentialFromError(error)
      console.log({ errorCode, errorMessage, email, credential })
    })
  }

  const signOut = () => auth.signOut()

  onUnmounted(unsubscribe)

  return {
    user,
    isLoggedIn,
    signIn,
    signOut,
  }
}

const db = getFirestore(app);
const messagesRef = collection(db, 'messages')
const messagesQuery = query(messagesRef,
  orderBy('createdAt', 'desc'),
  limit(100))

export function useChat() {
  const { user, isLoggedIn } = useAuth()
  const messages = ref([])

  const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
    messages.value = snapshot.docs.map(doc =>
      ({ id: doc.id, ...doc.data() }))
      .reverse()
  })

  const sendMessage = async (text) => {
    if (!isLoggedIn.value) return

    const { photoURL, uid, displayName } = user.value

    await setDoc(doc(messagesRef), {
      userName: displayName,
      userId: uid,
      userPhotoURL: photoURL,
      text: text,
      createdAt: serverTimestamp()
    });
  }

  onUnmounted(unsubscribe)

  return {
    messages,
    sendMessage,
  }
}