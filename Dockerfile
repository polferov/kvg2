FROM node:alpine AS frontend-build 
WORKDIR /build/frontend
COPY frontend/package.json .
RUN npm i
COPY types.ts ..
RUN npm run build

FROM denoland/deno:alpine as backend-build
WORKDIR /build
COPY deps.ts .
RUN deno cache deps.ts
COPY . .
RUN deno bundle main.ts server.js

FROM denoland/deno:alpine 
WORKDIR /app
COPY --from=frontend-build /build/frontend/build static
COPY --from=backend-build /build/server.js .
ENTRYPOINT [ "deno", "--allow-net", "--allow-read", "--allow-write", "server.js" ]