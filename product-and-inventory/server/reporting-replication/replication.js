const replicatorObj=require('./transactionsReplicatior');
replicatorObj.fetchBatch(20000,0)
.then(async function(data){
    
    data =await data.map(function (d) { 
        
        let dd=replicatorObj.formatRecord(d);
        if(!dd){
            return
        } 
        return dd;
    });
    replicatorObj.insertRecord(data)
    .then(()=>{
        console.log("Done!");
    })
    .catch((err)=>{
        console.error(err)
    })
})
.catch((err)=>{
    console.error(err);
})