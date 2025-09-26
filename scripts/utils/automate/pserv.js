/** @param {NS} ns */
export async function main(ns) {
    /** 
     * This script merges the purchase script and upgrade script for purchased servers. Automating the whole process.
     * Still needs to undergo testing
     */

    const initialMemory = 1;
    const maximumMemory = 524288000;

    // Initial Purchase
    let ram = initialMemory;
    let i = 0;
    while (i < ns.getPurchasedServerLimit()) {
        while (ns.getServerMoneyAvailable("home") <= ns.getPurchasedServerCost(ram)) {
            await ns.sleep(10000);
        }
        ns.purchaseServer("pserv-" + i, ram);
        ++i;
        await ns.sleep(1000);
    }

    // Continued Upgrade
    ram *= 2;
    while (ram < maximumMemory){
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
            while (ns.getServerMoneyAvailable("home") <= ns.getPurchasedServerCost("pserv-" + i, ram)){
                await ns.sleep(10000);
            }
            ns.upgradePurchasedServer("pserv-" + i, ram);
        }
        
        ram *= 2;
    }
}