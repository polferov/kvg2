import { oak } from "./deps.ts";
import { mapEndpoints } from "./endpoints.ts";

const api = new oak.Router({prefix: "/api"})
mapEndpoints(api)


const app = new oak.Application()
app.use(api.routes())
app.use(api.allowedMethods())

await app.listen({port: 8000})