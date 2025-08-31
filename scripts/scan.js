/** @param {NS} ns */
export async function main(ns) {

    /** Basic scanning script to get a list of all servers and their details using server interface.
     *  Said server details are also printed to the terminal.
     *  RAM: 3.80GB (Due to ns.getServer)
    */

    let servers = ['home'];
    let pserv = "pserv";

    for (let i = 0; i < servers.length; i++){
        let neighbors = ns.scan(servers[i]);

        for (let j = 0; j<neighbors.length; j++){
            if (!servers.includes(neighbors[j]) && !neighbors[j].includes(pserv)) {
                servers.push(neighbors[j]);
            }
        }
    }

    for (let i = 0; i < servers.length; i++){
        ns.tprintf("\n");
        
        let server = ns.getServer(servers[i]);
        // OPTIONAL TODO : add other variables if needed
        ns.tprintf(`Host Name: ${server.hostname}`);
        ns.tprintf(`IP : ${server.ip}`);
        ns.tprintf(`Backdoor Installed: ${server.backdoorInstalled}`);
        ns.tprintf(`Max RAM: ${server.maxRam}`);
        ns.tprintf(`Base Security: ${server.baseDifficulty}`);
        ns.tprintf(`Min Security: ${server.minDifficulty}`);
        ns.tprintf(`Money Available: ${server.moneyAvailable}`);
        ns.tprintf(`Max Money: ${server.moneyMax}`);
        ns.tprintf(`Required Ports for NUKE: ${server.numOpenPortsRequired}`);
        ns.tprintf(`Current Open Ports: ${server.openPortCount}`);
        ns.tprintf(`Required Hacking Skill: ${server.requiredHackingSkill}`);
        ns.tprintf(`Growth Rate: ${server.serverGrowth}`);

        ns.tprintf("\n");
    }
}
