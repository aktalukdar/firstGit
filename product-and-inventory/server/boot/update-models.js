'use strict';
// Run on workbench "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Rippon@123';"
module.exports = function (server) {
    server.dataSources.my_db.autoupdate().then((result)=>{
        
    }).catch((err)=>{
        console.error(err);
    });
    server.dataSources.esReporting.autoupdate().then((result)=>{
        
    }).catch((err)=>{
        console.error(err);
    });
}