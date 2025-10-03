/** @param {NS} ns */
export async function main(ns) {

    /** This script is an attempt to make the HGW algorithm work and optimize profits. */
    let timeParams = [];
    let targettedServer;
    let data = [];
    
    while (true){
        /** We'll need these functions to figure out how to optimize the hack grow weaken flow */
        timeParams = [  ns.getHackTime(targettedServer), 
                        ns.getGrowTime(targettedServer), 
                        ns.getWeakenTime(targettedServer)];

        /** We'll then need to execute the scripts using server data, with the required threads, and as
         * well as the proper timing, using await.sleep(optimal milliseconds)
         */

        const getData = () => {
            let data = [];
            const avgScriptRam = 1.75;
            const targettedServer = ns.args[0];
            const pserv = "pserv";

            // GET Servers
            let servers = ['home'];
            for (let i = 0; i < servers.length; i++){
                let neighbors = ns.scan(servers[i]);

                for (let j = 0; j<neighbors.length; j++){
                    if (!servers.includes(neighbors[j])) {
                        servers.push(neighbors[j]);
                    }
                }
            }
            servers = servers.filter((server) => server !== "home");

            // GET RAM Available
            let totalRam = 0;
            for (let i = 0; i < servers.length; i++){
                let server = servers[i];
                let ports = ns.getServer(server).openPortCount;
                if (ports === ns.getServerNumPortsRequired(server) || server.includes(pserv)){
                    totalRam += ns.getServerMaxRam(server);
                }
            }

            // GET RAM Assignments
            /**
             * 1. Thread Ratios: 
             * 2. Set Thread Counts/Indices
             */
            let hackThreadRatio = .01;
            let growThreadRatio = .50;
            let weakenThreadRatio = .49;
            
            let hackThreads = Math.floor(hackThreadRatio * (totalRam / Math.ceil(avgScriptRam)));
            let groThreads = Math.floor(growThreadRatio * (totalRam / Math.ceil(avgScriptRam)));
            let weakenThreads = Math.floor(weakenThreadRatio * (totalRam / Math.ceil(avgScriptRam)));

            let gi = hackThreads;
            let wi = hackThreads + groThreads;

            // Create Data List
            let threads = 0
            for (let i = 0; i < servers.length; i++){
                let server = servers[i];
                let ports = ns.getServer(server).openPortCount;
                let maxThreads = ns.getServerMaxRam(server) / Math.ceil(avgScriptRam);
                let addedThreads = 0;
                
                if (threads < gi && (ports === ns.getServerNumPortsRequired(server) || server.includes(pserv))){
                    let currAddedThreads = 0;
                    while (threads + addedThreads < gi && addedThreads < maxThreads){
                        addedThreads+=1;
                        currAddedThreads+=1;
                    }
                    if (currAddedThreads !== 0){
                        data.push([server, 'hack', currAddedThreads, targettedServer, ns.getHackTime(targettedServer)])
                        // ns.exec("gwh/scp/hack.js", server, currAddedThreads, targettedServer);
                    }
                    threads += currAddedThreads;s
                }
                
                if (threads < wi && (ports === ns.getServerNumPortsRequired(server) || server.includes(pserv))){
                    let currAddedThreads = 0;
                    while (threads + addedThreads < wi && addedThreads < maxThreads){
                        addedThreads+=1;
                        currAddedThreads+=1;
                    }
                    if (currAddedThreads !== 0){
                        data.push([server, 'weaken', currAddedThreads, targettedServer, ns.getGrowTime(targettedServer)])
                        // ns.exec("gwh/scp/grow.js", server, currAddedThreads, targettedServer);
                    }
                    threads += currAddedThreads;
                }
                
                if (threads >= wi && (ports === ns.getServerNumPortsRequired(server) || server.includes(pserv))) {
                    let currAddedThreads = 0;
                    while (threads + addedThreads >= wi && addedThreads < maxThreads){
                        addedThreads+=1;
                        currAddedThreads+=1;
                    }
                    if (currAddedThreads !== 0){
                        data.push([server, 'grow', currAddedThreads, targettedServer, ns.getWeakenTime(targettedServer)])
                        // ns.exec("gwh/scp/weaken.js", server, currAddedThreads, targettedServer);
                    }
                    threads += currAddedThreads;
                }
            }

            let returnData = [[],[],[]]
            for (let i = 0; i < data.length; i++){
                if (data[i][1] === 'weaken'){
                    returnData[0].push(data[i]);
                }
                else if (data[i][1] === 'grow'){
                    returnData[1].push(data[i]);
                }
                else if (data[i][1] === 'hack'){
                    returnData[2].push(data[i]);
                }
            }
            return returnData;
        }

        /** Optimizing the loop, and possibly sustainably:
         *  * - execution period - most important part is the end, as the end is the trigger point.
         *  & - sleep duration - to enable synchronization, even if it results in not 'the most optimized per millisecond' algorithm
         * 
         * weaken usually takes longest:                **************&&&
         * grow does not take as long:                       **********&&
         * hack takes the fastest, and must be delayed:             ****&
         * 
         */

        const WEAKEN = 0;
        const GROW = 1;
        const HACK = 2;

        // Weaken - Grow - Hack 
        const data = getData();
        for (let i = 0; i < data.length; i++){

            if (i === WEAKEN){
                await ns.sleep(0);
            }
            else if (i === GROW){
                await ns.sleep((timeParams[2] + 20) - timeParams[1]);
            }
            else if (i === HACK){
                await ns.sleep((timeParams[2] + 40) - timeParams[0]);
            }

            for (let j = 0; j < data[i].length; j++) {
                ns.exec(`scp/${data[i][j].script}.js`, data[i][j].serverName, data[i][j].threads, targettedServer);
            }

        }

        // initial prototype loop, to be changed to call all 'weaken' first, then cal 'all' grow next and so on.
        // for (let i = 0; i < data.length; i++){
        //     // Based on hacktime/growtime/weakentime calculations, execute script with needed time
            
        //     // Awaits to synchronize with previous function
        //     if (data[i].script === 'weaken'){
        //         await ns.sleep(data[i].executionTime - (timeParams[2]));
        //     }
        //     else if (data[i].script === 'grow') {
        //         await ns.sleep(data[i].executionTime - (timeParams[2] + 20));
        //     }
        //     ns.exec(`scp/${data[i].script}.js`, data[i].serverName, data[i].threads, targettedServer);
            
        // }

        await ns.sleep(10000);
    }


}