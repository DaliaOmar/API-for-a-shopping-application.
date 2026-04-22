'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
 exports.up = function (db) {
  return db.createTable('orders', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    user_id: 'int',
    status: 'string'
  });
};

exports.down = function (db) {
  return db.dropTable('orders');
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
