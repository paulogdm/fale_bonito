import firebase from '../firebase'

export const wordsRef = firebase.firestore().collection('words')
