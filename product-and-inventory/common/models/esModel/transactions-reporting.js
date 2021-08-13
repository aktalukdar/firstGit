'use strict';

module.exports = function(Transactionsreporting) {
    
    Transactionsreporting.countOfLast10DaysTransactions=function(cb){
        
        Transactionsreporting.find((err,data)=>{
            
            if(err){
                return cb(err);
            }
            return cb(null,data);
        })
        
    };

    Transactionsreporting.remoteMethod('countOfLast10DaysTransactions',{
        returns: {
            arg: 'data',
            type: 'object',
            root: true
          },
          http: {
            verb: 'GET',
            path: '/countOfLast10DaysTransactions'
          },
          description: 'API to view Count Of Last 10 Days Transactions'
    })
};
