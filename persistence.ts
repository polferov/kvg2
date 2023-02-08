import { Stop } from "./types.ts";
import { path } from './deps.ts'

let stops: Stop[] = []

export enum AddStopEffect {
    Added,
    Updated,
    None
}

const stopsFileName = `${path.dirname(path.fromFileUrl(import.meta.url))}/stops.json`

export async function addStop(stop: Stop): Promise<AddStopEffect> {
    await restoreStops()
    const index = stops.findIndex(s => s.id === stop.id)
    if (index >= 0) {
        if (stops[index].name === stop.name)
            return AddStopEffect.None

        stops[index].name = stop.name
        await storeStops()
        return AddStopEffect.Updated
    }
    stops.push(stop)
    await storeStops()
    return AddStopEffect.Added
}


let initialized = false
export async function getStops(): Promise<Stop[]> {
    if (initialized)
        return stops
    await restoreStops()
    initialized = true
    return stops
}

async function storeStops() {
    await Deno.writeTextFile(stopsFileName, JSON.stringify(stops, null, 4))
}

async function restoreStops() {
    try {
        const json = await Deno.readTextFile(stopsFileName)
        stops = JSON.parse(json)
        // deno-lint-ignore no-empty
    } catch { }
}