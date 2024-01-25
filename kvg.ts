import { dom } from "./deps.ts"
import { Info, InfoMode, Stop, StopId } from "./types.ts"

const parser = new dom.DOMParser()

export async function lookup(query: string): Promise<Stop[]> {
    const url = `https://kvg-internetservice-proxy.p.networkteam.com/internetservice/services/lookup/autocomplete?query=${query}`
    const resp = await fetch(url)
    const body = await resp.text()
    // the body will have following format:

    // <ul>
    // <li stop="9052">Gerhart-Hauptmann-Schule</li>
    // <li stop="2387">Hauptbahnhof</li>
    // <li stop="2541">Hauptfeuerwache</li>
    // <li id="">...</li>                           // this is returned when there are too many items to show
    // </ul>

    const ul = parser.parseFromString(body, "text/html")!

    const lis = ul.getElementsByTagName("li").filter(li => li.getAttribute("stop") !== "")

    const stops = lis.map(li => {
        return {
            id: li.getAttribute("stop")!,
            name: li.innerText
        }
    })

    return stops
}


export async function getStop(id: StopId): Promise<Stop | null> {
    const url = `https://kvg-internetservice-proxy.p.networkteam.com/internetservice/services/stopInfo/stop?stop=${id}`
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


export async function getInfo(id: StopId, mode: InfoMode = InfoMode.Arrival) {
    const modeStr = mode === InfoMode.Departure ? "departure" : "arrival"
    const url = `https://kvg-internetservice-proxy.p.networkteam.com/internetservice/services/passageInfo/stopPassages/stop?mode=${modeStr}&stop=${id}`
    const resp = await fetch(url)
    const info = await resp.json()
    info.mode = mode
    return info as Info
}