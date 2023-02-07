import { Stop } from "./kvg.ts";

const stops : Stop[] = []

export enum AddStopEffect {
    Added,
    Updated,
    None
}

// deno-lint-ignore require-await
export async function addStop(stop: Stop): Promise<AddStopEffect> {
    const index = stops.findIndex(s => s.id === stop.id)
    if(index >= 0){
        if(stops[index].name === stop.name)
            return AddStopEffect.None

        stops[index].name = stop.name
        return AddStopEffect.Updated
    }
    stops.push(stop)
    return AddStopEffect.Added
}

// deno-lint-ignore require-await
export async function getStops(): Promise<Stop[]>{
    return stops
}