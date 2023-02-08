import type { Stop } from '../../../types.ts'

const stopsCacheKey = "cache__stops"

export function getCachedStops(): Stop[] {
    const json = localStorage.getItem(stopsCacheKey)
    if (json === null)
        return []
    return JSON.parse(json) as Stop[]
}

export function cacheStops(stops: Stop[]) {
    const json = JSON.stringify(stops)
    localStorage.setItem(stopsCacheKey, json)
}