import { CURRENT_ENV } from "./configs/constants"

export default function Log(content: string): void { 
 
    console.log( CURRENT_ENV  ) 
    if ("local" == CURRENT_ENV) { 
        console.log( (content)) 
    }
}