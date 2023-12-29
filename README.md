![image](https://github.com/ahmedoshelmy/Qwitter-Backend/assets/55411484/899ccd14-c937-4258-bc27-cfbbbcbbf5c8)
# Qwitter-Backend
**Complete Backend Application implemented using Express.js, Typescript , Prisma and PostgreSQL.**

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Documentaion](#documentaion)
- [Contributors](#contributors)

## Features  
- User authentication and authorization (signup, login, Google Authentication)
- Tweet creation, retrieval, update, and deletion
- User Relations management (follow, mute, block)
- Timeline/ For you 
- Real-time notifications
- Real-time Chatting 

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

1- Clone the repository:

   ```bash
   git clone git@github.com:ahmedoshelmy/Qwitter-Backend.git
   ``` 
2- Navigate to project folder

```shell
cd Qwitter-Backend
```
3 - Install libraries & modules
```
npm install
```

4 - Create .env file

> PORT=<your_port_number><br>
URL=<your_url><br>
HOST=<your_host><br>
DATABASE_URL="<your_database_url>"<br>
NODE_ENV=development<br>
EMAIL=<your_email><br>
EMAIL_SMTP_PASSWORD=<your_email_smtp_password><br>
GOOGLE_CLIENT_ID=<your_google_client_id><br>
GOOGLE_CLIENT_SECRET=<your_google_client_secret><br>
GOOGLE_CALLBACK_URL=<your_google_callback_url><br>
JWT_SECRET=<your_jwt_secret><br>
JWT_EXPIRES_IN=<your_jwt_expires_in><br>
SALT="<your_salt>"<br>
CLIENT_SIDE=<your_client_side_url><br>
AZURE_CONTAINER=<your_azure_container><br>
AZURE_BUCKET_URL="<your_azure_bucket_url>"<br>
AZURE_KEY="<your_azure_key>"<br>
AZURE_ACCOUNT_NAME=<your_azure_account_name><br>


5- Generate Primsa Client and Migrate the schema 

```shell
npm run psrisma:generate
npm run psrisma:migrate
```
6- Run server 

```shell
npm run start
```
7- Generate Unit testing reports

```shell
npm run test
```
8- Generate functional documentation 

```shell
npm run docs
```

## Documentaion 
- [API Documentation](http://back.qwitter.cloudns.org:3000/docs/)
- [Functional Documentation](http://back.qwitter.cloudns.org:3000/doc/index.html)

  
## Contributors 

<table align="center" >
  <tr>
      <td align="center"><a href="https://github.com/ahmedoshelmy"><img src="https://avatars.githubusercontent.com/u/55411484?v=4" width="150px;" alt=""/><br /><sub><b>Ahmed Osama Helmy</b></sub></a><br /></td>
          <td align="center"><a href="https://github.com/AhmedZahran02"><img src="https://avatars.githubusercontent.com/u/87142232?v=4" width="150px;" alt=""/><br /><sub><b>Ahmed Osama Zahran</b></sub></a><br /></td>
          <td align="center"><a href="https://github.com/ahmedibrahim404"><img src="https://avatars.githubusercontent.com/u/34144004?v=4" width="150px;" alt=""/><br /><sub><b>Ahmed Ibrahim</b></sub></a><br /></td>
          <td align="center"><a href="https://github.com/Ghaithq"><img src="https://media.licdn.com/dms/image/C5603AQFhMbdlh-mccw/profile-displayphoto-shrink_800_800/0/1645747633649?e=1709164800&v=beta&t=xfZIwpt0lcfgL0io_Zf8XjQ1zaUXD9sCIRTGraG2rog" width="150px;" alt=""/><br /><sub><b>Ghaith</b></sub></a><br /></td>
  </tr>
</table>

