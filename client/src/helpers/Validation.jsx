import XRegExp from 'xregexp';
const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const stringValidation = (string) => {
  var regex = new XRegExp('^\\p{L}*$');
  return regex.test(string);
};

const phoneValidation = (phone) => {
  const re = /^\d{10}$/;
  return re.test(phone);
};
export { validateEmail, stringValidation, phoneValidation };
