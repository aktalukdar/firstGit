
filter={
    "from": 0,
    "size": 3,
    
    "_source": ["id","customerId","customerName","quantity","totalAmount"], 
    
  }
filter = Object.assign({ index: "transactionsreporting", scroll:undefined }, filter);
const app = require('../server');
model=app.models.TransactionsReporting;
model.getDataSource().connector.db.search(filter).then((data)=>{
    
    console.log(data.body.hits.hits)
    data.body.hits.hits.forEach((i)=>{
        console.log(i)
    })
}).catch((err)=>[
    console.log(err)
])