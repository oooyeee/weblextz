FROM node:18.5

WORKDIR /app

COPY index.js ./
COPY package*.json ./

RUN npm install

EXPOSE 9999

RUN which node

CMD ["node", "./index.js"]
