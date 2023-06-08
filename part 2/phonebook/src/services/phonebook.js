import axios from "axios";
const baseUrl = 'http://localhost:3001/persons';

const getAllPersons = () => {
      const request = axios.get(baseUrl);
      return request.then(response => response.data)
}

const creatNewPerson = (newPersonObejct) => {
      const request = axios.post(baseUrl, newPersonObejct);
      return request.then(response => response.data)
}

const deletePerson = id => {
      const request = axios.delete(`${baseUrl}/${id}`);
      return request
}

const updatePerson = (id, updatedData) => {
      const request = axios.put(`${baseUrl}/${id}`, updatedData);
      return request
}

export default { getAllPersons, creatNewPerson, deletePerson, updatePerson }

// export default {
//       getAllPersons: getAllPersons,
//       creatNewPerson: creatNewPerson
// }