FROM node:18

RUN npm i -g @nestjs/cli

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 10000

CMD ["npm", "run", "start:prod"]