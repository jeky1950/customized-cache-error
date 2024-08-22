"# customized-cache-error" 

1. npm i

2. npx prisma migrate dev --name init

3. npm start

4. Hit the endpoint http://localhost:3000/cache to see it `cache: true`

5. Hit the endpoint http://localhost:3000/custom-cache to see the error on the customized cache error

6. Hit the endpoint http://localhost:3000/uncache to uncache