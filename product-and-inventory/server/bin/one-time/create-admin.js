'use strict';

const app = require('../../server');

app.models.AppUser.create([
    {
        'fullName': 'Admin',
        'mobileNumber' : '9854678923',
        'dateOfBirth':'2000-01-10',
        'emailAddress':'admin@gmail.com',
        'password':'admin'
    }
])
.then(function(data) {
  console.log('Admin created');
  process.exit(0);
})
.catch(function(err) {
  console.log(err.message);
  process.exit(1);
});
