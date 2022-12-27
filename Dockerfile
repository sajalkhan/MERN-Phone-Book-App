FROM node:14-alpine3.14

WORKDIR /home/node/app


COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
COPY src/views build/src/views
COPY src/public build/src/public
RUN cat app.txt | tr -d '\r' > app.sh
RUN chmod 777 app.sh

ENTRYPOINT ["sh","/home/node/app/app.sh"]