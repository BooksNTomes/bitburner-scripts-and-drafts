/** @param {NS} ns */
export async function main(ns) {
    while (true){

        let productionList = [];
        let totalNodes = ns.hacknet.numNodes();
        for (let i = 0; i < totalNodes; i++) {
            productionList.push(ns.hacknet.getNodeStats(i).totalProduction);
        }
        let nodeCount = ns.hacknet.numNodes();

        while (nodeCount === ns.hacknet.numNodes()){
            for(let i = 0; i < totalNodes; i++){
                let production = ns.hacknet.getNodeStats(i).totalProduction - productionList[i];

                ns.print(`Checking if upgrading level`);
                ns.print(`${production} > ${(2 * ns.hacknet.getLevelUpgradeCost(i, 1))}?`);
                ns.print(`${production > (2 * ns.hacknet.getLevelUpgradeCost(i, 1))}`);

                ns.print(`Checking if upgrading ram`);
                ns.print(`${production} > ${(2 * ns.hacknet.getRamUpgradeCost(i, 1))}?`);
                ns.print(`${production > (2 * ns.hacknet.getRamUpgradeCost(i, 1))}`);

                ns.print(`Checking if upgrading core`);
                ns.print(`${production} > ${2 * ns.hacknet.getCoreUpgradeCost(i, 1)}?`);
                ns.print(`${production > (2 * ns.hacknet.getCoreUpgradeCost(i, 1))}`);

                if ((production > (2 * ns.hacknet.getLevelUpgradeCost(i, 1))) &&
                ns.getServerMoneyAvailable("home") > (1.5 * ns.hacknet.getLevelUpgradeCost(i, 1)))
                {
                    ns.hacknet.upgradeLevel(i, 1);
                }

                else if ((production > (2 * ns.hacknet.getRamUpgradeCost(i, 1))) &&
                ns.getServerMoneyAvailable("home") > (1.5 * ns.hacknet.getRamUpgradeCost(i, 1)))
                {
                    ns.hacknet.upgradeRam(i, 1);
                }

                else if ((production > (2 * ns.hacknet.getCoreUpgradeCost(i, 1)) &&
                ns.getServerMoneyAvailable("home") > (1.5 * ns.hacknet.getCoreUpgradeCost(i, 1))))
                {
                    ns.hacknet.upgradeCore(i, 1);
                }

                if (nodeCount !== ns.hacknet.numNodes()){
                  break;
                }
                
            }
            await ns.sleep(10000);
        }
    }
}