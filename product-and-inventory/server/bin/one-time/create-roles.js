'use strict';

const app = require('../../server');

app.models.AppRole.create([
    {'name': 'Admin'},{'name':'Seller'},{'name':'Customer'}
])
.then(function(data) {
  console.log('Roles created');
  process.exit(0);
})
.catch(function(err) {
  console.log('Error in role creation');
  process.exit(1);
});
