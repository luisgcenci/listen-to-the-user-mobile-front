const axios = require('axios');

export const saveObjectUserToDB = (_userObject, _authProvider) => {

  saveClientUserToDB(
    _userObject.name,
    _userObject.cpf,
    _userObject.bday,
    _userObject.email,
    _userObject.newPassword,
    _userObject.countryCode + _userObject.number,
    _authProvider
  );
}

export const saveClientUserToDB = (
  _name,
  _cpf,
  _bday,
  _email,
  _newPassword,
  _number,
  _authProvider
  ) => {

  axios.post('http://127.0.0.1:5000/addclientuser', {
    name: _name,
    cpf: _cpf,
    dateOfBirth: _bday,
    email: _email,
    password: _newPassword,
    number: _number,
    authProvider: _authProvider
  })
  .then( (response) => {
    console.log('User saved to the Database.');
  })
  .catch( (error) => {
    console.log(error);
  })
}

export const updateUserInDb = (
  _userObject,
  _authProvider
  ) => {

    axios.post('http://127.0.0.1:5000/updateclientuserinfo', {
      name: _userObject.name,
      cpf: _userObject.cpf,
      dateOfBirth: _userObject.bday,
      email: _userObject.email,
      password: _userObject.newPassword,
      number: _userObject.countryCode + _userObject.number,
      authProvider: _authProvider
    })
    .then( (response) => {
      console.log('User updated in the Database.');
    })
    .catch( (error) => {
      console.log(error);
    })
}

export const checkIfPhoneIsRegistered = async (countryCode, phoneNumber) => {

  return new Promise((resolve, reject) => {
    
    let fullNumber = countryCode + phoneNumber;
    fullNumber = fullNumber.replace(/[^0-9,+]/g, '');

    axios.post('http://localhost:5000/isuserphoneregistered', {
      number: fullNumber
    })
    .then( (response) => {
      
      const data = response.data;
      const phoneIsRegistered = response.data ? true : false;
      
      if (phoneIsRegistered){
        resolve(data);
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

export const checkIfEmailIsRegistered = async (_email) => {

  return new Promise((resolve, reject) => {

    axios.post('http://localhost:5000/isuseremailregistered', {
      email: _email
    })
    .then( (response) => {
      
      const data = response.data;
      const emailIsRegistered = data ? true : false;
      
      if (emailIsRegistered){
        resolve(data);
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