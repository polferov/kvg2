FROM alpine/git AS GETHASH
WORKDIR /app
COPY .git .git
RUN git rev-parse HEAD > /hash

FROM node:alpine AS frontend-build 
WORKDIR /build/frontend
COPY frontend/package.json .
RUN npm i
COPY --from=GETHASH /hash /hash
COPY types.ts ..
COPY frontend/ ./
RUN sed -i "s/::COMMIT::/$(cat /hash)/g" src/routes/settings/+page.svelte
RUN sed -i "s/::DATE::/$(date)/g" src/routes/settings/+page.svelte
RUN npm run build

FROM lukechannings/deno as backend-build
WORKDIR /app
COPY deps.ts .
RUN deno cache deps.ts
COPY . .
RUN deno bundle main.ts server.js

FROM lukechannings/deno AS final
WORKDIR /app
COPY --from=frontend-build /build/frontend/build static
COPY --from=backend-build /app/server.js .
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
ENTRYPOINT [ "./entrypoint.sh" ]
