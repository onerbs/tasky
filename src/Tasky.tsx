import React, { useEffect, useState } from 'react'
import { Heading } from 'rebass'
import { Cloud } from './Database'
import Task, { Viewer } from './Task'

const Title = (props: any) =>
  <Heading
    fontSize={[6,6,7]}
    marginBottom={['auto','auto','1.5rem']}
    color='primary'
    textAlign='center'
    {...props}
    />

export default () => {
  const [localTasks, setLocalTasks] = useState(new Array<Task>())
  const find = (id: string) => localTasks.filter(task => task.id === id)[0]
  useEffect(() => {
    console.log('populating...')
    Cloud.tasks.get()
      .then(self => self.docs.map(d => d.data()))
      .then(self => self.map(d => Task.from(d)))
      .then(self => setLocalTasks(self))
      .then(() => { console.log('finished') })
      .catch(console.log)
  }, [])
  return <>
    <Title>Tasky</Title>
    <Viewer data={localTasks} find={find}/>
    <div>controls</div>
  </>
}
