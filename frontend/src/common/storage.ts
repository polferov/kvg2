import type { Stop } from '../../../types.ts'

const stopsCacheKey = "cache__stops"
const lastSelectedStopKey = "storage__last-stop"
const historyKey = "storage__history"

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

export function getLastSelectedStop(): Stop | null {
    const json = localStorage.getItem(lastSelectedStopKey)
    if (json === null)
        return null
    try {
        return JSON.parse(json) as Stop
    } catch {
        return null
    }
}

export function setLastSelectedStop(stop: Stop) {
    const json = JSON.stringify(stop)
    localStorage.setItem(lastSelectedStopKey, json)
    addToHistory(stop)
}

function addToHistory(stop: Stop) {
    let history = getHistory()
    history = history.filter(s => s.id !== stop.id)
    history.push(stop)
    const json = JSON.stringify(history)
    localStorage.setItem(historyKey, json)
}

export function getHistory(): Stop[] {
    const json = localStorage.getItem(historyKey)
    if (json === null)
        return []
    try {
        return JSON.parse(json)
    }
    catch {
        return []
    }
}

export function getHistoryIndex(stop: Stop) {
    const history = getHistory()
    return history.findLastIndex(s => s.id === stop.id)
}