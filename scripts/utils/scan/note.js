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

    let data = "";
    for (let i = 0; i < servers.length; i++){
        let server = ns.getServer(servers[i]);
        data += "\n";

        data += `Host Name: ${server.hostname}\n`;
        data += `IP : ${server.ip}\n`;

        data += `Backdoor Installed: ${server.backdoorInstalled}\n`;
        data += `Max RAM: ${server.maxRam}\n`;
        data += `CPU Cores: ${server.cpuCores}\n`;

        data += `Base Security: ${server.baseDifficulty}\n`;
        data += `Current Security: ${server.hackDifficulty}\n`;
        data += `Min Security: ${server.minDifficulty}\n`;

        data += `Money Available: ${server.moneyAvailable}\n`;
        data += `Max Money: ${server.moneyMax}\n`;

        data += `Required Ports for NUKE: ${server.numOpenPortsRequired}\n`;
        data += `Current Open Ports: ${server.openPortCount}\n`;
        data += `With Admin Rights: ${server.hasAdminRights}\n`;

        data += `Organization: ${server.organizationName}\n`;

        data += `Required Hacking Skill: ${server.requiredHackingSkill}\n`;
        data += `Growth Rate: ${server.serverGrowth}\n`;
        data += "\n";
    }
    ns.write("texts/note.txt", data, "w");
}
