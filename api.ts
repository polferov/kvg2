import { lookup } from "./kvg.ts";
import { addStop } from "./persistence.ts";

export async function addMissingStops(query: string) {
    const stops = await lookup(query)
    for (const stop of stops)
        await addStop(stop)
}

