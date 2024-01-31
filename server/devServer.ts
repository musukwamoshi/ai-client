import {config} from "dotenv";
import path from "path"
config({path:path.join(__dirname,"../.env")})

import {includes} from "lodash";
import ngrok from "ngrok";
import nodemon from "nodemon";

import {getRootUrl} from "../shared/utils/env";

nodemon({
    watch: [".","../shared"],
    script: "server.ts",
    ext: "ts"
});

const hasNgrokUrl = includes(getRootUrl(), "ngrok.io");
let isNgrokConnected = false;

const onExit = async(): Promise<void> => {
    if(hasNgrokUrl){
        try{
            console.debug("stopping dev server...");
            await ngrok.kill();
            isNgrokConnected=false;
            process.exit();
        }catch(error){
            console.error(`Unable to kill ngrok: ${error}`);
        }
    }
};


nodemon.on("start",async()=>{
    console.debug("starting dev server...");
    
    if(!isNgrokConnected && hasNgrokUrl){
        const rootUrl = getRootUrl();
        const match = rootUrl.match(/\/\/([^.]*)\./);
        const subdomain = match?match[1]:undefined;
        const port = process.env.PORT||3001;
        try{
            const url = await ngrok.connect({subdomain,port});
            console.debug(`ngrok connected. ${url} -> http://localhost:${port}`);
            isNgrokConnected = true;
        }catch(error:any){
            console.error(
                `Unable to start ngrok(${subdomain}:${port})`,
                error.msg || JSON.stringify(error)
            );
        }
    }
}).on("restart",() => {
    console.debug("\n\n\nServer source changed, restarting!");
})
.on("crash", onExit)
.on("quit", onExit);

process.on("SIGTERM", onExit)