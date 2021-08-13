'use strict';

module.exports = function (product) {

    product.updateProduct = function (productId, content, cb) {
        product.findById(productId)
            .then((productData) => {
                if (!productData) {
                    return cb(new Error('Product not found'));
                }
                const keys = Object.keys(content);
                keys.forEach(function (currentKey) {
                    productData[currentKey] = content[currentKey];
                });
                return productData.save();
            })
            .then((updatedProductData) => {
                if (updatedProductData) {
                    return cb(null, { success: true, data: updatedProductData });
                }
                return cb('Some error occured!');
            })
            .catch((err) => {
                return cb(err);
            });
    }
    product.remoteMethod('updateProduct', {
        accepts: [{
            arg: 'productId',
            type: 'number',
            required: true
        }, {
            arg: 'content',
            type: 'object',
            required: true,
            http: {
                source: 'body'
            }
        }],
        returns: {
            arg: 'data',
            type: 'object',
            root: true
        },
        http: {
            verb: 'PUT',
            path: '/updateProduct'
        },
        description: 'API to update an existing product'
    });

    product.delete = function (productId, cb) {
        product.findById(productId)
            .then((productData) => {
                if (!productData) {
                    return cb(new Error('Product not found'));
                }
                product.destroyById(productId, (err) => {
                    if (err) {
                        return cb('some error occured!');
                    }
                    return cb(null, { success: true, data: "deleted" })
                })
            }).catch((err) => {
                return cb(err);
            })
    }

    product.remoteMethod('delete',{
        accepts: [{
            arg: 'productId',
            type: 'number',
            required: true
          }],
          returns: {
            arg: 'data',
            type: 'object',
            root: true
          },
          http: {
            verb: 'DELETE',
            path: '/deleteProduct'
          },
          description: 'API to delete a product'
    })

    product.viewProducts=function(cb){
        const query= 'SELECT p.`id`,p.`name`,p.`description`,p.`price` '+
        'FROM product p JOIN inventory i ON p.`id`=i.`fk_id_product` '+
        'WHERE i.`quantity`>0';
        product.app.dataSources.my_db.connector.execute(query,(err,data)=>{
            if(err){
                return cb(err);
            }
            return cb(null,data);
        })
    }
    product.remoteMethod('viewProducts',{
        returns: {
            arg: 'data',
            type: 'object',
            root: true
          },
          http: {
            verb: 'GET',
            path: '/viewProducts'
          },
          description: 'API to view list of product'
    })

};