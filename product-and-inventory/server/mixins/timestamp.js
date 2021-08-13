'use strict'

module.exports=function(Model,aptions){

    Model.observe('before save',function(ctx,next){
        if(ctx.instance){
            if(ctx.instance.id){
                next();
            }else{
                let d=new Date();
                ctx.instance.date=d;
                console.log("hi",ctx.instance.date)
            }
        }
        next();
    })
}