FROM node:13-alpine

RUN mkdir -p /app
WORKDIR /app

# install our dependencies
COPY .eslintrc package.json yarn.lock rollup.config.js /app/
RUN yarn

# copy the project code
COPY src /app/src
COPY static /app/static

# expose the server port
EXPOSE 3000
# Expose a Sapper dev port. Only for development
EXPOSE 10000

# define the default command to run when starting the container
CMD ["yarn", "dev"]
