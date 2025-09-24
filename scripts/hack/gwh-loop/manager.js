/** @param {NS} ns */
export async function main(ns) {
    /**
     * Grow-Weaken-Hack Manager
     * - an attempt at managing the grow-weaken-hack scripts in hacking a target server
     * - implements 'loop algorithm'
     * - RAM: 5.25GB
     */

    // Basic Parameters
    let avgScriptRam = 1.75;
    let targettedServer = ns.args[0];
    // Get all servers
    let servers = ['home'];
    let pserv = "pserv";
    for (let i = 0; i < servers.length; i++){
        let neighbors = ns.scan(servers[i]);

        for (let j = 0; j<neighbors.length; j++){
            if (!servers.includes(neighbors[j])) {
                servers.push(neighbors[j]);
            }
        }
    }
    servers = servers.filter((server) => server !== "home");

    // Initial Ratio [Testing]
    let hackThreadRatio = .01;
    let growThreadRatio = .50;
    let weakenThreadRatio = .49;

    let totalRam = 0;
    for (let i = 0; i < servers.length; i++){
        let server = servers[i];
        let ports = ns.getServer(server).openPortCount;
        if (ports === ns.getServerNumPortsRequired(server) || server.includes(pserv)){
            totalRam += ns.getServerMaxRam(server);
        }
    }

    let hackThreads = Math.floor(hackThreadRatio * (totalRam / Math.ceil(avgScriptRam)));
    let groThreads = Math.floor(growThreadRatio * (totalRam / Math.ceil(avgScriptRam)));
    let weakenThreads = Math.floor(weakenThreadRatio * (totalRam / Math.ceil(avgScriptRam)));

    let gi = hackThreads;
    let wi = hackThreads + groThreads;

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
                ns.exec("gwh/hack.js", server, currAddedThreads, targettedServer);
            }
            threads += currAddedThreads;
        }
        
        if (threads < wi && (ports === ns.getServerNumPortsRequired(server) || server.includes(pserv))){
            let currAddedThreads = 0;
            while (threads + addedThreads < wi && addedThreads < maxThreads){
                addedThreads+=1;
                currAddedThreads+=1;
            }
            if (currAddedThreads !== 0){
                ns.exec("gwh/grow.js", server, currAddedThreads, targettedServer);
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
                ns.exec("gwh/weaken.js", server, currAddedThreads, targettedServer);
            }
            threads += currAddedThreads;
        }
    }
}