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

const fs = firebase.firestore()

class Cloud {
  state: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
  tasks: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
  constructor() {
    this.state = fs.collection('state').doc('current')
    this.tasks = fs.collection('tasks')
  }
  delete = (task: Task, cbk = () => {}) => {
    this.tasks.doc(task.id).delete().then(cbk)
      .catch(console.error)
  }
  send = (task: Task, cbk?: () => void, nid = false): void => {
    this.tasks.doc(task.id).set({
      id: task.id,
      value: task.value,
      date: task.date,
      checked: task.checked,
      archived: task.archived
    }).then(() => {
      cbk && cbk()
      nid && this.state.get()
        .then(state => state.data())
        .then(data => {
          if (data) this.state.set({ counter: data.counter + 1 })
        })
    })
  }
  taskArray = async () => {
    return this.tasks.get().then(res => res.docs)
      .then(docs => docs.map(doc => Task.fromDocumentData(doc.data())))
  }
}

const cloud = new Cloud()
export default cloud
