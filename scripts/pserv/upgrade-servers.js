/** @param {NS} ns */
export async function main(ns) {

    const ram = ns.args[0];
    const pserv = "pserv";
    let servers = ['home'];

    for (let i = 0; i < servers.length; i++){
        let neighbors = ns.scan(servers[i]);

        for (let j = 0; j<neighbors.length; j++){
            if (neighbors[j].includes(pserv)) {
                servers.push(neighbors[j]);
            }
        }
    }

    for (let i = 0; i < servers.length; i++){
        if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)){
            ns.upgradePurchasedServer("pserv-" + i, ram);
        }
        else{
            i--;
            await ns.sleep(1000);
        }
    }
}