/** @param {NS} ns */
export async function main(ns) {
    /** This script is an attempt of initializing buying hacknet servers
     * - based on their costs and user's current money
     * - if the total cost of buying a hacknet server/and upgrade is less than the projected
     * - total profits of the hacknet server nodes, then upgrade or buy a server.
     */
    while (true){
        // Update Hacknet Node Count
        let totalNodes = await updateHacknetNodes(ns);
        
        // Iterate Through Nodes
        await hacknetNodeIterator(ns, totalNodes);
        await ns.sleep(1000);

    }
}


function updateHacknetNodes(ns){
    // Get Total Production
    let totalProduction = 0;
    let totalNodes = ns.hacknet.numNodes();
    for (let i = 0; i < totalNodes; i++) {
        totalProduction += ns.hacknet.getNodeStats(i).totalProduction;
    }

    ns.print(`Checking if buying new node:`);
    ns.print(`${totalProduction} > ${1.5 * ns.hacknet.getPurchaseNodeCost()}?`);
    ns.print(`${totalProduction > (1.5 * ns.hacknet.getPurchaseNodeCost())}`);


    if (totalProduction > (1.5 * ns.hacknet.getPurchaseNodeCost()) &&
        ns.getServerMoneyAvailable("home") > (1.5 * ns.hacknet.getPurchaseNodeCost())){
        
        ns.hacknet.purchaseNode();
        totalNodes += 1;
    }
        
    return totalNodes;
}

// TODO : Have a reference to previous hacknet node upgrade production
async function hacknetNodeIterator(ns, totalNodes){
    let i = 0;
    ns.print(totalNodes);
    while(i < totalNodes){
        let production = ns.hacknet.getNodeStats(i).totalProduction;

        ns.print(`Checking if upgrading level`);
        ns.print(`${production} > ${(1.1 * ns.hacknet.getLevelUpgradeCost(i, 1))}?`);
        ns.print(`${production > (1.1 * ns.hacknet.getLevelUpgradeCost(i, 1))}`);

        ns.print(`Checking if upgrading core`);
        ns.print(`${production} > ${(1.1 * ns.hacknet.getRamUpgradeCost(i, 1))}?`);
        ns.print(`${production > (1.1 * ns.hacknet.getRamUpgradeCost(i, 1))}`);

        ns.print(`Checking if upgrading ram`);
        ns.print(`${production} > ${1.1 * ns.hacknet.getCoreUpgradeCost(i, 1)}?`);
        ns.print(`${production > (1.1 * ns.hacknet.getCoreUpgradeCost(i, 1))}`);

        if (production > (1.1 * ns.hacknet.getLevelUpgradeCost(i, 1)) &&
        ns.getServerMoneyAvailable("home") > (1.5 * ns.hacknet.getLevelUpgradeCost(i, 1))){
            ns.hacknet.upgradeLevel(i, 1);
        }

        else if (production > (1.1 * ns.hacknet.getRamUpgradeCost(i, 1)) &&
        ns.getServerMoneyAvailable("home") > (1.5 * ns.hacknet.getRamUpgradeCost(i, 1))){
            ns.hacknet.upgradeRam(i, 1);
        }

        else if (production > (1.1 * ns.hacknet.getCoreUpgradeCost(i, 1) &&
        ns.getServerMoneyAvailable("home") > (1.5 * ns.hacknet.getCoreUpgradeCost(i, 1)))){
            ns.hacknet.upgradeCore(i, 1);
        }
        
        i++;
    }
}