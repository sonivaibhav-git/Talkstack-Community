import { useAllSubstacks, useTopSubstacks } from "../features/substacks/substack.queries"

export const substackPageCall = ()=>{
    useTopSubstacks()
    useAllSubstacks()
}

