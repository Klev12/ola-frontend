FROM node
WORKDIR /home/app
COPY package.json .
RUN npm install pnpm -g
RUN pnpm install
COPY . .
EXPOSE 5173
CMD ["pnpm", "run", "dev", "--host"]