FROM node:22-alpine3.19
WORKDIR /home/app
RUN mkdir src
COPY package.json .
RUN npm install pnpm -g
RUN npm install --force
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--host"]