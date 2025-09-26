/** @param {NS} ns */
export async function main(ns) {

    const destPath = "gwh/scp"

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

    // Deploy scripts to servers
    let scripts = [`${destPath}/hack.js`, `${destPath}/grow.js`, `${destPath}/weaken.js`];
    for (let i = 0; i < servers.length; ++i) {
        const server = servers[i];
        ns.scp(scripts, server);
    }
}