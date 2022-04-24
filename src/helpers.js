const axios = require('axios');

export const saveClientUserToDB = (
    name,
    dateOfBirth,
    email,
    password,
    number
    ) => {
    axios.post('http://127.0.0.1:5000/addclientuser', {
      name: name,
      dateOfBirth: dateOfBirth,
      email: email,
      password: password,
      number: number
    })
    .then( (response) => {
      console.log('User saved to the Database.');
    })
    .catch( (error) => {
      console.log(error);
    })
}