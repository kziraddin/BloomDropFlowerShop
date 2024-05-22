module.exports = {
  HOST: "database-1.ccmd6j6rmnku.us-east-1.rds.amazonaws.com",
  USER: "admin",
  PASSWORD: "password",
  DB: "BloomDrop", //name of database
  dialect: "mysql",
  pool: {
    max: 5, // maximum number of connections in the pool
    min: 0, // minimum number of connections in the pool
    acquire: 30000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
    idle: 10000, // maximum time, in milliseconds, that a connection can be idle before being released
  },
};
