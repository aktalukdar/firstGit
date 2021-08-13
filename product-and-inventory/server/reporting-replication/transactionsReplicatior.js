'use strict';

const app = require('../server');
const Promise = require('bluebird');
const _ = require('underscore');
const esUtils = require('./esUtils.js');

module.exports = {
    fetchBatch: function (limit, offset, whereClause = {}, callback) {
        const promise = new Promise(function (resolve, reject) {
            
            app.models.transaction.find({
                where: whereClause,
                order: 'id ASC',
                include: [
                    {
                        relation: 'appUser',
                        scope: {
                            fields: ['fullName']
                        }
                    },
                    {
                        relation: 'product',
                        scope: {
                            fields: ['name']
                        }
                    }
                ],
                limit: limit,
                offset: offset
            })
                .then(resolve)
                .catch(reject)
        });
        if (callback !== null && typeof callback === 'function') {
            promise.then(function (data) { return callback(null, data); }).catch(function (err) { return callback(err); });
        } else {
            return promise;
        }
    },

    formatRecord: function (fullTransactionObject) {
        let reportingObj={};
        reportingObj.productName=NaN;
        reportingObj.customerName=NaN;
        let u=fullTransactionObject.appUser();
        let p=fullTransactionObject.product();
        reportingObj.customerName=u?u.fullName:NaN;
        reportingObj.productName=p?p.name:NaN;
        reportingObj.transactionId=fullTransactionObject.id;
        reportingObj.customerId=fullTransactionObject.fkIdUser;
        reportingObj.productId=fullTransactionObject.fkIdProduct;
        reportingObj.transactionDate=fullTransactionObject.date;
        reportingObj.quantity=fullTransactionObject.quantity;
        reportingObj.totalAmount=fullTransactionObject.amount;
        return reportingObj;
    },

    insertRecord:function(data,callback){
        const promise=new Promise(function(resolve,reject){
            if(data && data.length>0){
            esUtils.bulkIndex(app.models.TransactionsReporting,data,'transactionId')
            .then(()=>{
                return resolve();
            })
            .catch((err)=>{
                console.error(err)
                return resolve(err);
            });
                
            }else{
                return reject(new Error('data is required!'));
            }
            
        });

        if (callback !== null && typeof callback === 'function') {
            promise.then(function (data) { return callback(null, data); }).catch(function (err) { return callback(err); });
          } else {
            return promise;
          }
    }

    


}