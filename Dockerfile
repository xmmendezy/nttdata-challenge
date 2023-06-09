FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./
RUN npm install --global pnpm
RUN pnpm install
COPY --chown=node:node . .
USER node

FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build
ENV NODE_ENV production
USER node

FROM node:18-alpine As production

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node --from=build /usr/src/app/dist .

RUN npm install --global pnpm
RUN pnpm install --prod

CMD [ "node", "main" ]
