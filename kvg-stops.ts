export interface Stop {
    id: string
    name: string
}

export async function lookup(query: string) : Promise<Stop[]> {
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