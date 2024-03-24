FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

COPY package.json .

RUN npm install --force && npm install -g pm2

COPY . .

ENV NODE_OPTIONS="--max-old-space-size=512"

EXPOSE 5000

CMD ["pm2-runtime", "index.js", "--cron-reload", "0 17 * *"]
