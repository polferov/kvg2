import { oak, path } from "./deps.ts";
import { mapEndpoints } from "./endpoints.ts";


const api = new oak.Router({prefix: "/api"})
mapEndpoints(api)


const app = new oak.Application()
app.use(api.routes())
app.use(api.allowedMethods())

const staticDir = `${path.dirname(path.fromFileUrl(import.meta.url))}/static`

app.use(async (context, next) => {
  try {
    await context.send({
      root: staticDir,
      index: "index.html",
    });
  } catch {
    await next();
  }
});

await app.listen({port: 8000})