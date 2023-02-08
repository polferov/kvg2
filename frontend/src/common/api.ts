import type {Info, Stop} from '../../../types.ts'

const url = "http://localhost:8000/api"

export async function getStops(): Promise<Stop[]>{
    const resp = await fetch(`${url}/stops`)
    const stops = await resp.json()
    return stops as Stop[]
}

export async function getInfo(stop: Stop): Promise<Info> {
    const resp = await fetch(`${url}/info/${stop.id}`)
    const info = await resp.json()
    return info as Info
}