Tech use:

1. [express ](https://www.npmjs.com/package/express)`npm i express`
2. [jsonwebtoken ](https://www.npmjs.com/package/jsonwebtoken)`npm i jsonwebtoken`
3. [bcrypt ](https://www.npmjs.com/package/bcrypt)`npm i bcrypt`
4. [mongoose ](https://www.npmjs.com/package/mongoose)`npm i mongoose`
5. [nodemon ](https://www.npmjs.com/package/nodemon)`npm i nodemon`
6. [svix v1.42.0 ](https://www.npmjs.com/package/svix/v/1.42.0)`npm i svix@1.42.0`
7. [cors ](https://www.npmjs.com/package/cors)`npm i cors`
8. [multer ](https://www.npmjs.com/package/multer)`npm i multer`
9. [dotenv ](https://www.npmjs.com/package/dotenv)`npm i dotenv`
10. [cloudinary](https://www.npmjs.com/package/cloudinary)`npm i cloudinary`
11. [sentry](https://www.npmjs.com/package/@sentry/profiling-node)`npm install @sentry/node @sentry/profiling-node --save`

one line command:

```
npm install express@4.21.1 jsonwebtoken@9.0.2 bcrypt@5.1.1 mongoose@8.8.3 nodemon svix@1.42.0 cors@2.8.5 multer@1.4.5-lts.1 dotenv cloudinary@2.5.1
```

### [Clerk Express Middleware](https://clerk.com/docs/guides/development/upgrading/upgrade-guides/node-to-express)

- [@clerk/express](https://www.npmjs.com/package/@clerk/express)

### Use [Sentry](https://sentry.io/welcome/) for app performance

- [Sentry Express Doc.](https://docs.sentry.io/platforms/javascript/guides/express/)
- [Sentry mongoDB Doc.](https://docs.sentry.io/platforms/javascript/guides/express/configuration/integrations/mongo/)

### Generate Hash

```
require('crypto').randomBytes(64).toString('hex')
```
