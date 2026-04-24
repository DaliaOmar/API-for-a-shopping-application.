'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
 exports.up = function (db) {
  return db.createTable('users', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    firstname: 'string',
    lastname: 'string',
    email: { type: 'string', unique: true },
    password: 'string'
  });
};

exports.down = function (db) {
  return db.dropTable('users');
};



exports._meta = {
  "version": 1
};
