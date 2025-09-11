/** @param {NS} ns */
export async function main(ns) {
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

    // Kill All Running Scripts
    for (let i = 0; i < servers.length; i++){
        let server = servers[i];
        ns.killall(server)
    }
}