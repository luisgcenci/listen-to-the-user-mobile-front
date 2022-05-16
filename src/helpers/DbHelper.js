const axios = require('axios');

export const saveObjectUserToDB = (_userObject) => {

  saveClientUserToDB(
    _userObject.name,
    _userObject.cpf,
    _userObject.bday,
    _userObject.email,
    _userObject.newPassword,
    _userObject.countryCode + _userObject.number
  );
}

export const saveClientUserToDB = (
  name,
  cpf,
  dateOfBirth,
  email,
  password,
  number,
  authProvider
  ) => {

  // const emailCheck = await checkIfEmailIsRegistered(email);

  // if (emailCheck){

  //   axios.post('http://127.0.0.1:5000/updateclientuser'),{

  //   }
  // }

  axios.post('http://127.0.0.1:5000/addclientuser', {
    name: name,
    cpf: cpf,
    dateOfBirth: dateOfBirth,
    email: email,
    password: password,
    number: number,
    authProvider: authProvider
  })
  .then( (response) => {
    console.log('User saved to the Database.');
  })
  .catch( (error) => {
    console.log(error);
  })
}

export const checkIfPhoneIsRegistered = async (countryCode, phoneNumber) => {

  return new Promise((resolve, reject) => {

    let fullNumber = countryCode + phoneNumber; 
    
    fullNumber = fullNumber.replace(/[^0-9,+]/g, '');
    let phoneIsRegistered = false;

    axios.post('http://localhost:5000/isuserphoneregistered', {
      number: fullNumber
    })
    .then( (response) => {
  
      phoneIsRegistered = response.data ? true : false;
      
      if (phoneIsRegistered){
        resolve(true);
      }
      else{
        resolve(false);
      }
    })
    .catch( (e) => {
      reject(e);
    })
  })
}

export const checkIfCpfIsRegistered = async (cpf) => {

  return new Promise((resolve, reject) => {
    let cpfIsRegistered = false;

    axios.post('http://localhost:5000/isusercpfregistered', {
      cpf: cpf
    })
    .then( (response) => {
  
      cpfIsRegistered = response.data ? true : false;
      
      if (cpfIsRegistered){
        resolve(true);
      }
      else{
        resolve(false);
      }
    })
    .catch( (e) => {
      reject(e);
    })
  })
}

export const checkIfEmailIsRegistered = async (email) => {

  return new Promise((resolve, reject) => {

    axios.post('http://localhost:5000/isuseremailregistered', {
      email: email
    })
    .then( (response) => {
      
      const data = response.data;
      const emailIsRegistered = data ? true : false;
      
      if (emailIsRegistered){

        let providers = [];
        data.map((user) => {
          user.authProviders.map((provider) => {
            providers.push(provider.provider);
          })
        })
        resolve(providers);
      }
      else{
        resolve(false);
      }
    })
    .catch( (e) => {
      reject(e);
    })
  })
}