import firebase from 'firebase/app'
import 'firebase/firestore'
import Task from './Task'

firebase.initializeApp({
  apiKey: "AIzaSyCYNdyjj1AztBqUTdXNdHzVhrJBK_jQADU",
  authDomain: "tastytasks.firebaseapp.com",
  databaseURL: "https://tastytasks.firebaseio.com",
  projectId: "tastytasks",
  storageBucket: "tastytasks.appspot.com",
  messagingSenderId: "550018200555",
  appId: "1:550018200555:web:178e122b85cfdcd5399fae"
})

export class Cloud {
  static tasks = firebase.firestore().collection('tasks')
  static write = (task: Task): void => {
    Cloud.tasks.doc(task.id).set({...task}, { merge: true })
  }
  static retrieve = async () => {
    let cloudTasks = await Cloud.tasks.get()
    return cloudTasks.docs
      .map(d => d.data())
      .map(d => Task.fromDocument(d))
  }
}
