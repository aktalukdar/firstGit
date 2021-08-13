'use strict';

module.exports = function (appUser) {

    appUser.edit = (appUserId, content, cb) => {

        appUser.findById(appUserId)
            .then((appUserData) => {
                if (!appUserData) {
                    return cb(new Error("User not found"));

                }
                
                const keys = Object.keys(content);
                keys.forEach((currentKey) => {
                    appUserData[currentKey] = content[currentKey];
                });
                return appUserData.save();
            })
            .then((updatedUserData) => {
                if (updatedUserData) {
                    return cb(null, { success: true, data: updatedUserData })
                }
                return cb('Some error occured!');
            })
            .catch((err) => {
                return cb(err);
            });
    }
    appUser.remoteMethod('edit', {
        accepts: [{
            arg: 'appUserId',
            type: 'number',
            required: true
        },{
            arg: 'content',
            type: 'object',
            required: true,
            http:{
                source:'body'
            }
        }],
        returns:{
            arg:'data',
            type:'object',
            root:true
        },
        http:{
            verb:'PUT',
            path:'/editUser'
        },
        description:'API to edit an user details'
    })


    appUser.mapUserRole=function(content,cb){

        if(!content || !content.fk_id_user || !content.fk_id_role){
            return cb(new Error('please check fk_id_user or fk_id_role'))
        }
        let obj={
            fk_id_user:content.fk_id_user,
            fk_id_role:content.fk_id_role
        }
        appUser.app.models.userRoleMapping.create(obj,(err,userData)=>{
            if(err){
                return cb(err);
            }
            return cb(null,{ success: true, data: userData })
        });
    }

    appUser.remoteMethod('mapUserRole', {
        accepts: [{
            arg: 'content',
            type: 'object',
            required: true,
            http:{
                source:'body'
            }
        }],
        returns:{
            arg:'data',
            type:'object',
            root:true
        },
        http:{
            verb:'POST',
            path:'/mapUserRole'
        },
        description:'API for mapping user role'
    })

};
