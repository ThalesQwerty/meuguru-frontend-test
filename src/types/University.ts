import { Region, RegionType, StateAcronym } from "./locations"

export type University = {
    Name: string,
    Initial: string,
    Region: Region,
    State: StateAcronym,
    RegionType: RegionType,
    Type: "Privada" | "Pública"
}
