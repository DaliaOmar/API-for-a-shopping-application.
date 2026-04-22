'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
 exports.up = function (db) {
  return db.createTable('order_products', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    order_id: 'int',
    product_id: 'int',
    quantity: 'int'
  });
};

exports.down = function (db) {
  return db.dropTable('order_products');
};

exports.up = function(db) {
  return null;
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
