FROM node:12

RUN mkdir -p /app
WORKDIR /app

# copy the project code
COPY src /app/src
COPY static /app/static
COPY .eslintrc package.json package-lock.json rollup.config.js /app/

# install our dependencies
RUN npm install

# expose the server port
EXPOSE 3000
# Expose a Sapper dev port. Only for development
EXPOSE 10000

# define the default command to run when starting the container
CMD ["npm", "run", "dev"]
