![image](https://github.com/ahmedoshelmy/Qwitter-Backend/assets/55411484/899ccd14-c937-4258-bc27-cfbbbcbbf5c8)
# Qwitter-Backend
**Complete Backend Application implemented using Express.js, Typescript , Prisma and PostgreSQL.**

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Documentaion](#documentaion)

## Features  
- User authentication (signup, login, logout)
- Tweet creation, retrieval, update, and deletion
- User Relations management (follow, mute, block)
- Timeline/ For you 
- Real-time notifications
- Rela-time Chatting 

## Technologies Used

- JSDoc and Swagger for API documentation
- Zod for Schema Validation
- Prisma as an ORM
- Socket.io for real-time notifications and chatting
- Azure Blob for images and videos upload
- Nodemailer and Gmail for sending emails
- Passport for OAuth
- Jest and SuperTest for  testing
- Bcrypt for hashing passwords 

## Installation

- Add your envoironment variables similar to the .env.example provided
- Generate a prisma client using: `npm run prisma:generate`
- Migrate the schema to PostgreSQL using  `npm run prisma:migrate`
- To Run the server in production mode: `npm start`
- To Run the server in dev mode: `npm run serve`
- To Run the unit tests: `npm run test`
- To Run the functional documentation: `npm run docs`


## Documentaion 
- [API Documentation](http://back.qwitter.cloudns.org:3000/docs/)
- [Functional Documentation](http://back.qwitter.cloudns.org:3000/doc/index.html)
