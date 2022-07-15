FROM node:18.5

WORKDIR /app

COPY index.js ./
COPY package*.json ./

RUN npm install

COPY test/saveport.sh ./
RUN chmod 751 saveport.sh

RUN /bin/bash /app/saveport.sh

#heroku (or railway.app) ignores EXPOSE and picks a random port itself
EXPOSE 9999

# RUN apt-get update


CMD /bin/bash /app/saveport.sh; node ./index.js
