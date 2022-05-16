import moment from 'moment';

const axios = require('axios');

// Custom default rules to validate form fields

const FormRules = {
  numbers: /^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/,
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  cpf: /\d{3}\.\d{3}\.\d{3}\-\d{2}/,
  required: /\S+/,
  hasNumber: /\d/,
  hasUpperCase: /(?=.*[A-Z])/,
  hasLowerCase: /(?=.*[a-z])/,
  hasSpecialCharacter: /(\W)/,
  phoneNumber(phoneNumber){

    const phoneRegex = /\(\d\d\)\s\d\d\d\d\d-\d\d\d\d/i;

    if (!phoneRegex.test(phoneNumber)){
      return false;
    }
    
    return true;
  },
  birthday(value) {
    const dateRegex = /\d\d\/\d\d\/\d\d\d\d/i;

    //check format
    if (!dateRegex.test(value)){
      return false;
    }

    const days = parseInt(value.slice(0, 2));
    const monthIndex = parseInt(value.slice(3,5)) - 1;
    const year = parseInt(value.slice(6));

    const date = new Date(year, monthIndex, days)

    //days in monthDate is set to 1 to prevent creating incorrect date based
    //on user's input
    const monthDate = moment(new Date(year, monthIndex, 1));
    const dateMoment = moment(date);

    //January, March, May, July, August, October, and December.

    const daysInMonth = monthDate.daysInMonth();

    //makes sure user doesn't put an incorrect day or month given a month and year
    if (
      days > daysInMonth ||
      days < 1 || 
      monthIndex < 0 ||
      monthIndex > 11 
    ){
      return false;
    }
    //makes sure user is between 12yo - 120yo
    else if (
      dateMoment.isAfter(moment().subtract(12, 'years')) ||
      dateMoment.isBefore(moment().subtract(120, 'years'))
    ){
      return false;
    }

    return true;
  },
  minlength(length, value) {
    if (length === void 0) {
      throw 'ERROR: It is not a valid length, checkout your minlength settings.';
    } else if (value.length >= length) {
      return true;
    }
    return false;
  },
  maxlength(length, value) {
    if (length === void 0) {
      throw 'ERROR: It is not a valid length, checkout your maxlength settings.';
    } else if (value.length > length) {
      return false;
    }
    return true;
  },
  equalPassword(dataToCompare, value) {
    return dataToCompare === value;
  }
};

export default FormRules;
