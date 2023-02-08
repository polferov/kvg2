import { oak } from "./deps.ts";
import { getInfo, lookup } from "./kvg.ts";
import { addStop, AddStopEffect, getStops } from "./persistence.ts";
import { InfoMode, AddStopsResult } from "./types.ts";

type Router = oak.Router

export function mapEndpoints(router: Router) {
    mapGetStops(router)
    mapAddStops(router)
    mapGetInfo(router)
}

function mapGetStops(router: Router) {
    router.get("/stops", async ctx => {
        const stops = await getStops()
        ctx.response.body = stops
    })
}

function mapAddStops(router: Router) {
    router.post("/stops/:query", async ctx => {
        const stops = await lookup(ctx.params.query)
        const effect: AddStopsResult = { added: [], updated: [] }
        for (const stop of stops)
            switch (await addStop(stop)) {
                case AddStopEffect.Added: effect.added.push(stop); break
                case AddStopEffect.Updated: effect.updated.push(stop); break
                default:
            }
        ctx.response.body = effect
    })
}

function mapGetInfo(router: Router) {
    router.get("/info/:stopId", async ctx => {
        const info = await getInfo(ctx.params.stopId)
        ctx.response.body = info
    })

    router.get("/info/:stopId/:mode", async ctx => {
        let mode;
        if (ctx.params.mode === "arrival")
            mode = InfoMode.Arrival
        else if (ctx.params.mode === "departure")
            mode = InfoMode.Departure
        else {
            ctx.response.status = 400
            return
        }
        const info = await getInfo(ctx.params.stopId, mode)
        ctx.response.body = info
    })
}