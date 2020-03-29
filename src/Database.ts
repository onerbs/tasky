import firebase from 'firebase'
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
  static push = (task: Task): void => {
    Cloud.tasks.add({...task})
  }
}

export class Local {
  static tasks: Task[] = []
  static rename = (id: string, new_name: string) => {
    for (let task of Local.tasks)
    if (task.id === id)
    task.name = new_name
  }
  static update = (id: string, new_date: Date) => {
    for (let task of Local.tasks)
    if (task.id === id)
    task.date = new_date
  }
}
