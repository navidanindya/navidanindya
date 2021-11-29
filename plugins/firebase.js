import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.fbApiKey,
  authDomain: process.env.fbAuthDomain,
  projectId: process.env.fbProjectId,
  storageBucket: process.env.fbStorageBucket,
  messagingSenderId: process.env.fbmMessagingSenderId,
  appId: process.env.fbAppId,
  measurementId: process.env.fbMeasurementId
}

const apps = getApps()
const firebaseApp = (!apps.length) ? initializeApp(firebaseConfig) : apps[0]
const db = getFirestore(firebaseApp, {})

export { db }
