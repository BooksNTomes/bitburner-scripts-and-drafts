/** @param {NS} ns */
export async function main(ns) {

    /** This program is an attempt to get and crack every single server in the game
     *  - Relies on being able to scan every existing server (except private/purchased servers)
     *  - Only nukes servers as the player progresses by buying all cracking programs in order:
     *    - 1 BruteSSH
     *    - 2 FTPCrack
     *    - 3 relaySMTP
     *    - 4 HTTPWorm
     *    - 5 SQLInject
     *  - When the script is finished it means all servers have been nuked / can be hacked
     *  RAM : 2.30GB
     *  TODO : Optimize / Try different approaches
     */

    // Scan: Get Servers
    let servers = ['home']; // Used to navigate through all servers; inefficient for now
    let partitionedServers = [[], [], [], [], [], []];
    let pserv = "pserv";
    for (let i = 0; i < servers.length; i++){
        let neighbors = ns.scan(servers[i]);
        for (let j = 0; j<neighbors.length; j++){
            if (!servers.includes(neighbors[j]) && !neighbors[j].includes(pserv)) {
                servers.push(neighbors[j]);
                if (ns.getServerNumPortsRequired(neighbors[j]) === 0){
                    partitionedServers[0].push(neighbors[j]);
                }
                else if (ns.getServerNumPortsRequired(neighbors[j]) === 1){
                    partitionedServers[1].push(neighbors[j]);
                }
                else if (ns.getServerNumPortsRequired(neighbors[j]) === 2){
                    partitionedServers[2].push(neighbors[j]);
                }
                else if (ns.getServerNumPortsRequired(neighbors[j]) === 3){
                    partitionedServers[3].push(neighbors[j]);
                }
                else if (ns.getServerNumPortsRequired(neighbors[j]) === 4){
                    partitionedServers[4].push(neighbors[j]);
                }
                else if (ns.getServerNumPortsRequired(neighbors[j]) === 5){
                    partitionedServers[5].push(neighbors[j]);
                }
            }
        }
    }

    // OPEN: Crack Servers
    // - Will await endlessly if not all port-opening programs are made/bought.
    for (let i = 0; i < partitionedServers.length; i++){
        for (let j = 0; j < partitionedServers[i].length; j++){
            let target = partitionedServers[i][j];
            if (i > 0){
                while (!ns.fileExists("BruteSSH.exe")) {
                    await ns.sleep(60000);
                }
                ns.brutessh(target);
            }
            if (i > 1) {
                while (!ns.fileExists("FTPCrack.exe")) {
                    await ns.sleep(60000);
                }
                ns.ftpcrack(target);
            }
            if (i > 2) {
                while (!ns.fileExists("RelaySMTP.exe")) {
                    await ns.sleep(60000);
                }
                ns.relaysmtp(target);
            }
            if (i > 3) {
                while (!ns.fileExists("HTTPWorm.exe")) {
                    await ns.sleep(60000);
                }
                ns.httpworm(target);
            }
            if (i > 4) {
                while (!ns.fileExists("SQLInject.exe")) {
                    await ns.sleep(60000);
                }
                ns.sqlinject(target);
            }
            ns.nuke(target);
        }
    }
}