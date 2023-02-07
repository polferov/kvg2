export type StopId = string

export interface Stop {
    id: StopId
    name: string
}

export enum InfoMode {
    Arrival = "arrival",
    Departure = "departure"
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