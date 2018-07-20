## DATABASE STRUCTURE
 - database url - `mongodb://localhost:27017/`
 - database name - `Calendar`
 - collection name - `users`
 - document structure:
1. `_id` type - ObjectId
2. `name` type - String
3. `password` type - String
4. `tasks` type Array
 - 4.1 type Object
 -   4.1.1 `id` type Number
 -   4.1.2 `title` type String
 -   4.1.3 `start` type String
 -   4.1.4 `duration` type String

## STEPS TO INSTALL AND RUN DEVELOPMENT ENV
1. install NODE.js from official site https://nodejs.org/
2. run CMD and make sure that you are in root of a project
3. run `npm install` - this will install all required packages
4. install MONGODB.js from official site https://www.mongodb.com/
5. create database
6. add some users to the database
7. run `npm start` command - this will rise server on http://localhost:3000
