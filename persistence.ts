import { Stop } from "./kvg.ts";

const stops : Stop[] = []

// deno-lint-ignore require-await
export async function addStop(stop: Stop): Promise<Stop[]> {
    const index = stops.findIndex(s => s.id === stop.id)
    if(index >= 0){
        stops[index].name = stop.name
        return stops
    }
    stops.push(stop)
    return stops
}

// deno-lint-ignore require-await
export async function getStops(): Promise<Stop[]>{
    return stops
}