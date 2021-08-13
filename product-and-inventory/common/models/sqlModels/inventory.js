'use strict';

module.exports = function (Inventory) {

    Inventory.updateInventory = function (fkIdProduct,batchNumber, content, cb) {

        Inventory.findOne({
            where:{
            fk_id_product:fkIdProduct,
            batch_number:batchNumber
            }
        })
        .then((inventoryData) => {
            if(!inventoryData){
                return cb(new Error('Inventory not found!'));
            }
            const keys=Object.keys(content);
            keys.forEach((currentKey)=>{
                inventoryData[currentKey]=content[currentKey];
            });
            return inventoryData.save();
        })
        .then((updateInventoryData)=>{
            if(updateInventoryData){
                return cb(null, {success:true, data:updateInventoryData});
            }
            return cb(new Error('Some error occured'));
        })
        .catch((err)=>{
            return cb(err);
        });
    }

    Inventory.remoteMethod('updateInventory',{
        accepts:[
            {
                arg: 'fkIdProduct',
                type: 'number',
                required: true
            },
            {
                arg: 'batchNumber',
                type: 'string',
                required: true
            },
            {
                arg: 'content',
                type: 'object',
                required: true,
                http:{
                    source:'body'
                }
            }
        ],
        returns:{
            arg:'data',
            type:'object',
            root:true
        },
        http:{
            verb:'PUT',
            path:'/updateInventory'
        },
        description:'API to update an Inventory '
    })

}