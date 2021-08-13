'use strict';

const _ = require('underscore');
module.exports = {
    bulkIndex: function (model, data, idProperty, callback) {
      const promise = new Promise(function (resolve, reject) {
        console.log(model.settings)
  
        
      if (!idProperty) {
        return reject(new Error(`idProperty is required !`));
      }
      if (model.getDataSource().connector.name != 'elasticsearch') {
        return reject(new Error(`Model should be of elasticsearch !`));
      }

      if (!model.settings.elasticsearch) {
        return reject(new Error(`Model does not have elasticsearch definition object !`));
      }

      let body = [];
      let _index = model.settings.elasticsearch.index;
      let _type = model.settings.elasticsearch.type;

  
        _.each(data, function (item) {
          if (item[idProperty]) {
            let _id = item[idProperty];
            let obj = {
            };
            obj = Object.assign(obj, item);
            body.push({ index: { _index: _index, _type: _type, _id: _id } });
            body.push(obj);
          }
        });
  
        if (!body || !Array.isArray(body) || body.length == 0) {
          return reject(new Error(`Invalid data !`));
        }
  
        model.getDataSource().connector.db.bulk({
          body: body
        })
          .then(function (data) {
            if (!data) {
              return Promise.reject(new Error(`Invalid Response Received from Elasticsearch !`));
            } else if (data.errors) {
              console.log(data.items);
              return Promise.reject(new Error(`Error in Bulk API in Elasticsearch !`));
            }
            return resolve({ success: true });
          })
          .catch(reject);
  
      });
  
      if (callback && typeof callback == 'function') {
        promise.then(function (data) { callback(null, data); }).catch(function (err) { callback(err); });
      } else {
        return promise;
      }
    },
}