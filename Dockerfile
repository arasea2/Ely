FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

COPY package.json .

RUN npm install && npm install qrcode-terminal && npm i -g pm2

ENV PM2_PUBLIC_KEY zblsx5829u87ho7
ENV PM2_SECRET_KEY 5nbvre8sixzkr19

COPY . .

EXPOSE 5000

CMD ["pm2-runtime" , "index.js"]
CMD ["pm2-runtime", "monitor.js"]
