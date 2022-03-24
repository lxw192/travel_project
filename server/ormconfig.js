const { SnakeNamingStrategy } = require('typeorm-naming-strategies')

module.exports = {
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "123456",
  "database": "travel",
  "entities": ["./src/module/**/*.entity.{ts,js}"],
  "migrationsTableName": "",
  "migrations": ["migration/*.js"],
  "namingStrategy": new SnakeNamingStrategy(),
  "cli": {
    "migrationsDir": "migrations"
  }
};
