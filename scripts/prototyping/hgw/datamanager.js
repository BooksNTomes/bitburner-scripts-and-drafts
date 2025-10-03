/** @param {NS} ns */
export async function main(ns) {

    /** - This experimental script gets thread percentages and creates a list of servers and their thread assignments,
     * without executing the scripts for them.
     * - This is meant to be a prototype subfunction for my hgw implementation.
     */
    
    /**
     *  Fully based on the gwh manager script, but without the executions;
     */

    // Basic Parameters
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

}