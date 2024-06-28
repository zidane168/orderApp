export default function Log({ content } : { content: any } ): void { 

    console.log("env: ", process.env.ENV)
    // if ("local" == process.env.ENV) {
        if (typeof content == 'object') {
            console.log(JSON.stringify(content))
        
        } else if (Array.isArray(content)) {
            console.log(JSON.stringify(content))

        } else {
            console.log(content)
        }
    // }
}