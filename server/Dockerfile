###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:19-alpine As development

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:19-alpine As build

WORKDIR /app

ENV NODE_ENV production

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /app/node_modules ./node_modules

RUN npm ci --only=production && npm i -g @nestjs/cli && npm cache clean --force

COPY --chown=node:node . .

RUN npm run build

USER node

###################
# PRODUCTION
###################

FROM node:19-alpine As production

COPY --chown=node:node --from=build /app/node_modules ./node_modules/

COPY --chown=node:node --from=build /app/package*.json ./

COPY --chown=node:node --from=build /app/dist ./dist/

CMD [ "node", "dist/main.js" ]
