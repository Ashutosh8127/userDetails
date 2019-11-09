import { toFormData, isNetworkError } from './utils';

export const url = 'http://103.51.20.9/erp-manager';

const ANALYTICSFOX = 'ANALYTICSFOX';
const method = 'POST';
const fixedHeaders = {
  'cache-control': 'no-cache'
};
const headers = new Headers({
   ANALYTICSFOX,
  ...fixedHeaders
});


const timeout = 6000;
const networkErrorMsg = 'Please check your internet connection and try again.';

export var api = {
  authUser(username, password) {
    var data = {
      username: username.toLowerCase().trim(),
      password: password,
    };
    
    var options = {
      method,
      headers,
      body: toFormData(data),
      timeout
    };

    return fetch(`${url}/login`, options).then((res) => {
      setTimeout(() => null, 0);
      return res.json().then((res) => {
        setTimeout(() => null, 0);
        if (res.success == false && res.error == true) {
          throw new Error('Invalid username or password');
        } else {
          return res.data[0];
        }
      });
    }).catch(e => {
      let msg = isNetworkError(e) ? networkErrorMsg : e.message;
      throw new Error(msg);
    });
  },
  signUp(name, email, contactNo, username, password) {
    var data = {
      name,
      email,
      contactno: contactNo,
      username: username.toLowerCase().trim(),
      password: password,
    };
    
    var options = {
      method,
      headers,
      body: toFormData(data),
      timeout
    };
    return fetch(`${url}/signup`, options).then((res) => {
      setTimeout(() => null, 0);
      return res.json().then((res) => {
        setTimeout(() => null, 0);
        if (res.success == false && res.error == true) {
          throw new Error('Invalid username or password');
        } else {
          return res.message;
        }
      });
    }).catch(e => {
      let msg = isNetworkError(e) ? networkErrorMsg : e.message;
      throw new Error(msg);
    });
  },
  updateUser(name, email, contactNo, username, password, Id) {
    var data = {
        name,
        contactno: contactNo,
        email,
        username: username.toLowerCase().trim(),
        password: password,
        Id
    };
    
    var options = {
      method,
      headers,
      body: toFormData(data),
      timeout
    };

    return fetch(`${url}/update`, options).then((res) => {
      setTimeout(() => null, 0);
      return res.json().then((res) => {
        setTimeout(() => null, 0);
        if (res.success == false && res.error == true) {
          throw new Error('Invalid username or password');
        } else {
          return res.data;
        }
      });
    }).catch(e => {
      let msg = isNetworkError(e) ? networkErrorMsg : e.message;
      throw new Error(msg);
    });
  }
}