export interface Stop {
    id: StopId
    name: string
}

export type StopId = string

export async function lookup(query: string): Promise<Stop[]> {
    const url = `https://www.kvg-kiel.de/internetservice/services/lookup/autocomplete?query=${query}`
    const resp = await fetch(url)
    const body = await resp.text()
    // the body will have following format:

    // <ul>
    // <li stop="9052">Gerhart-Hauptmann-Schule</li>
    // <li stop="2387">Hauptbahnhof</li>
    // <li stop="2541">Hauptfeuerwache</li>
    // </ul>


    let lines = body.split('\n')
    lines = lines.slice(1) // remove <ul>
    lines = lines.slice(0, lines.length - 1) // remove </ul>
    lines = lines.map(l => l.replace(/^<li stop="/, "")) // remove <li stop="
    lines = lines.map(l => l.replace(/<\/li>$/, "")) // remove </li>

    const stops = lines.map(l => {
        return {
            id: parseInt(l).toString(), // parse id from string like '2387">Hauptbahnhof'
            name: l.replace(/^[0-9]+">/, "") // remove prefix like 2387">
        } as Stop
    })

    return stops
}

export async function getStop(id: StopId): Promise<Stop | null> {
    const url = `https://www.kvg-kiel.de/internetservice/services/stopInfo/stop?stop=${id}`
    const resp = await fetch(url)
    // body looks like this:
    // {
    //     "id": "60837103646281571",
    //     "passengerName": "Hauptbahnhof"
    // }

    // for some reason the stop also has an internal id that differs from what we call id.
    // their id will be ignored as it is not used anywhere.

    if (resp.status === 404)
        return null

    const stop = await resp.json()

    return {
        id: id,
        name: stop.passengerName
    } as Stop
}

export enum InfoMode {
    Arrival,
    Departure
}

export interface Info {
    mode: InfoMode,
    actual: InfoItem[]
}

export interface InfoItem {
    actualRelativeTime: number,
    actualTime: string,
    direction: string,
    patternText: string,
    plannedTime: string,
    tripId: string
}

export async function getInfo(id: StopId, mode: InfoMode = InfoMode.Arrival) {
    const modeStr = mode === InfoMode.Departure ? "departure" : "arrival"
    const url = `http://www.kvg-kiel.de//internetservice/services/passageInfo/stopPassages/stop?mode=${modeStr}&stop=${id}`
    const resp = await fetch(url)
    const info = await resp.json()
    info.mode = mode
    return info as Info
}