'use strict';

module.exports = function(app, cb) {
  console.log('Register custom roles');
  const Role = app.models.Role;

  app.models.AppRole.find()
  .then(function(roles) {
    roles.forEach(function(role) {
      console.log('Current role: ', role.name);

      Role.registerResolver(role.name, function resolver(r, context, next) {
        
        if (context.remotingContext.req.headers['x-role-id'] && context.remotingContext.req.headers['x-role-id'] == role.id) {
          return next(null, true);
        } else {
          return next(false);
        }
      });
    });
    return cb(null);
  })
  .catch(function(error) {
    return cb(error);
  });
}