import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.0.66:5000/'

export const saveObjectUserToDB = (_userObject) => {

  saveClientUserToDB(
    _userObject.name,
    _userObject.cpf,
    _userObject.bday,
    _userObject.email,
    _userObject.newPassword,
    _userObject.countryCode + _userObject.number,
  );
}

export const saveClientUserToDB = (
  _name,
  _cpf,
  _bday,
  _email,
  _newPassword,
  _number,
  ) => {
  axios.post('addclientuser', {
    name: _name,
    cpf: _cpf,
    dateOfBirth: _bday,
    email: _email,
    password: _newPassword,
    number: _number,
  })
  .then( (response) => {
    console.log('User saved to the Database.');
  })
  .catch( (error) => {
    console.log(error);
  })
}

export const updateUserInDb = (
  _userObject
  ) => {

    axios.post('updateclientuserinfo', {
      name: _userObject.name,
      cpf: _userObject.cpf,
      dateOfBirth: _userObject.bday,
      email: _userObject.email,
      password: _userObject.newPassword,
      number: _userObject.countryCode + _userObject.number,
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

    axios.post('isuserphoneregistered', {
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
      console.log(e);
      reject(e);
    })
  })
}

export const checkIfCpfIsRegistered = async (cpf) => {

  return new Promise((resolve, reject) => {
    let cpfIsRegistered = false;

    axios.post('isusercpfregistered', {
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
      console.log(e);
      reject(e);
    })
  })
}

export const checkIfEmailIsRegistered = async (_email) => {

  return new Promise((resolve, reject) => {

    axios.post('isuseremailregistered', {
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