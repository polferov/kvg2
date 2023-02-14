import type { AddStopsResult, Info, Stop } from '../../../types.ts'


// deno-lint-ignore no-explicit-any
const url = (import.meta as any).env.MODE === "development" ? `${location.protocol}//${location.hostname}:8000/api` : "/api"

// const a = import.meta.env

export async function getStops(): Promise<Stop[]> {
    const resp = await fetch(`${url}/stops`)
    const stops = await resp.json()
    return stops as Stop[]
}

export async function getInfo(stop: Stop): Promise<Info> {
    const resp = await fetch(`${url}/info/${stop.id}/departure`)
    const info = await resp.json()
    return info as Info
}

export async function tryAddStop(query: string): Promise<boolean> {
    const resp = await fetch(`${url}/stops/${query}`, { method: "POST" })
    const result: AddStopsResult = await resp.json()
    return result.added.length !== 0 || result.updated.length !== 0
}