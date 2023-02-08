import type { AddStopsResult, Info, Stop } from '../../../types.ts'

const url = import.meta.env.MODE === "development" ? "http://localhost:8000/api" : "/api"

// const a = import.meta.env

export async function getStops(): Promise<Stop[]> {
    const resp = await fetch(`${url}/stops`)
    const stops = await resp.json()
    return stops as Stop[]
}

export async function getInfo(stop: Stop): Promise<Info> {
    const resp = await fetch(`${url}/info/${stop.id}`)
    const info = await resp.json()
    return info as Info
}

export async function tryAddStop(query: string): Promise<boolean> {
    const resp = await fetch(`${url}/stops/${query}`, { method: "POST" })
    const result: AddStopsResult = await resp.json()
    return result.added.length !== 0 || result.updated.length !== 0
}