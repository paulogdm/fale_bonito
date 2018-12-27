import firebase from 'firebase/app'
import 'firebase/firestore'

const settings = { timestampsInSnapshots: true }

const config = {
	apiKey: 'AIzaSyAIbAQe3UFx6kFMyJv2Ej9TW8-QiI86K5Y',
	authDomain: 'words-project-1ccab.firebaseapp.com',
	databaseURL: 'https://words-project-1ccab.firebaseio.com',
	projectId: 'words-project-1ccab',
	storageBucket: 'words-project-1ccab.appspot.com',
	messagingSenderId: '27178880541'
}
firebase.initializeApp(config).firestore().settings(settings)

export default firebase