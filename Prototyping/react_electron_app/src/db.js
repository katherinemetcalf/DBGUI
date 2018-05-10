const { Pool, Client } = require('pg')

let globalClient;

module.exports =  {

  connect: function(state, callback) {
    // Configure
    // AUTO-FILL PLACEHOLDER
    globalClient = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: 'TYty1414',
      port: 5432,
    });
    // REAL CODE
    // const client = new Client({
    //   user: state.user,
    //   host: state.host,
    //   database: state.db,
    //   password: state.pass,
    //   port: 5432,
    // });
    return globalClient.connect(callback);
  },

  createUser: function(username) {
    // THIS IS VERY DANGEROUS FOR SQL INJECTION!!!!!!!
    // ONLY DEV CODE

    console.log("trying to add user: " + username);
    globalClient.query('CREATE USER ' + username, (err, res) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log(res.rows[0])
      }
    });
  },

  dropUser: function(username) {
    // THIS IS VERY DANGEROUS FOR SQL INJECTION!!!!!!!
    // ONLY DEV CODE

    console.log("trying to drop user: " + username);
    globalClient.query('DROP USER IF EXISTS ' + username, (err, res) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log(res.rows[0])
      }
    });
  },

  getAllUsers: function(callback) {
    console.log("querying for all users");

    globalClient.query('SELECT * FROM pg_catalog.pg_user', callback);

    // (err, res) => {
    //   if (err) {
    //     console.log(err.stack)
    //   } else {
    //     console.log(res.rows[0])
    //   }
    // });
  },

  createDatabase: function(database) {
    // THIS IS VERY DANGEROUS FOR SQL INJECTION!!!!!!!
    // ONLY DEV CODE

    console.log("trying to add databse: " + database);
    globalClient.query('CREATE DATABASE ' + database, (err, res) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log(res.rows[0])
      }
    });
  },

  dropDatabase: function(database) {
    console.log("trying to drop databse: " + database);
    globalClient.query('DROP DATABASE IF EXISTS ' + database, (err, res) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log(res.rows[0])
      }
    });
  }

}
