# SecretSanta

Test project for Yalantis School.

1. Clone this repo.
2. Install all dependencies via `npm install` or `yarn install`
3. Build database via `npm prisma:p` or `yarn run prisma:p`
4. Start project in a dev mode via `npm start:dev / start:dev:n` or `yarn run start:dev / start:dev:n` :n means launch with nodemon.
5. Build project via `npm build` or `yarn run build` and then launch it by: `npm start:prod` or `yarn run start:prod`

Also here is swagger documentation.
After you launch project, navigate to -> `http://localhost:5000/api-docs` to see documentation.

For some routes like `/api/users/{amount}` & `/api/shuffle` response time will take a half of a minute or even a minute.
