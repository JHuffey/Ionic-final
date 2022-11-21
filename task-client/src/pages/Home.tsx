import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonCheckbox, IonList, IonListHeader, IonButton } from '@ionic/react';
import './Home.css';
import { useAxios } from '../hooks/useAxios';
import { useState, useEffect} from 'react';
import React from 'react';
import { Dialog } from '@capacitor/dialog';
import axios from 'axios';




const Home: React.FC = () => {

const { getAllTasks } = useAxios()

const [task, setTask] = useState([]);

let [newTask, setNewTask ] = useState({
  title: "", 
  completed: "",
});

const baseUrl = "http://localhost:3000/tasks/";

useEffect(() => {
  async function getTasks() {
      await Tasks();
  }
  getTasks();
}, []);



async function Tasks() {
  return getAllTasks().then((response: any) => {
    setTask(response.data)
    
  })
  
}

const displayTasks = () => {
  
  return task.map((t:any) => {
    return (
      <IonItem key={t._id}>
        <IonLabel>{t.title}</IonLabel>
        <IonCheckbox slot="end"></IonCheckbox>
      </IonItem>
    );
  });
}

function addTask(task: any) {
  return axios.post(baseUrl, task).then(response => {
    Tasks();
     return new Promise(resolve => resolve(response.data));
  })
}

function handleChange(event: any) {
  setNewTask((prevValue: any) => {
      return { ...prevValue, [event.target.name]: event.target.value }
  });
}

const showPrompt = async (title: string, message: string, okButtonTitle: string ) => {
  const { value } = await Dialog.prompt({
      title,
      message,
      okButtonTitle
  });

  return value;
};

const prompt = async () => {
  showPrompt('Hey','Task title','OK').then(title => {
      console.log('tasktitle: ' + title);
  });
}


return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <IonTitle>Task List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
        <IonListHeader color="tertiary">
            <IonLabel class="list">Incomplete</IonLabel>
          </IonListHeader>
          {displayTasks()}
        </IonList>
        <IonList>
        <IonListHeader color="tertiary">
            <IonLabel class="list">Complete</IonLabel>
          </IonListHeader>
          
        </IonList>
        <IonButton color="secondary" onClick={prompt}>Create Task</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
