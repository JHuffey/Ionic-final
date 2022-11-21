import axios from "axios";

const baseUrl = "http://localhost:3000/tasks/";


const getAllTasks = async () => {
    return axios.get(baseUrl)


}

function deleteTask(id: string) {

    return axios.delete(baseUrl + id).then(response => {
        return new Promise(resolve => resolve(response.data));
    });
}


export function useAxios() {
    return {

        getAllTasks,
        deleteTask
    }


}