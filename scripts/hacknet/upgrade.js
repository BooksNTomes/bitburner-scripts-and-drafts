/** @param {NS} ns */
export async function main(ns) {
    while (true){

        function debugLogs(ns, currentProduction){
            ns.print(`Checking if upgrading level`);
            ns.print(`${currentProduction} > ${(2 * ns.hacknet.getLevelUpgradeCost(i, 1))}?`);
            ns.print(`${currentProduction > (2 * ns.hacknet.getLevelUpgradeCost(i, 1))}`);

            ns.print(`Checking if upgrading ram`);
            ns.print(`${currentProduction} > ${(2 * ns.hacknet.getRamUpgradeCost(i, 1))}?`);
            ns.print(`${currentProduction > (2 * ns.hacknet.getRamUpgradeCost(i, 1))}`);

            ns.print(`Checking if upgrading core`);
            ns.print(`${currentProduction} > ${2 * ns.hacknet.getCoreUpgradeCost(i, 1)}?`);
            ns.print(`${currentProduction > (2 * ns.hacknet.getCoreUpgradeCost(i, 1))}`);
        }

        let initialProductionList = [];
        let currentNodes = ns.hacknet.numNodes();
        for (let i = 0; i < currentNodes; i++) {
            initialProductionList.push(ns.hacknet.getNodeStats(i).totalProduction);
        }

        while (currentNodes === ns.hacknet.numNodes()){
            for(let i = 0; i < currentNodes; i++){
                let currentProduction = ns.hacknet.getNodeStats(i).totalProduction - initialProductionList[i];
                
                debugLogs(ns, currentProduction);

                if ((currentProduction > (2 * ns.hacknet.getLevelUpgradeCost(i, 1))) &&
                ns.getServerMoneyAvailable("home") > (1.5 * ns.hacknet.getLevelUpgradeCost(i, 1)))
                {
                    ns.hacknet.upgradeLevel(i, 1);
                }

                else if ((currentProduction > (2 * ns.hacknet.getRamUpgradeCost(i, 1))) &&
                ns.getServerMoneyAvailable("home") > (1.5 * ns.hacknet.getRamUpgradeCost(i, 1)))
                {
                    ns.hacknet.upgradeRam(i, 1);
                }

                else if ((currentProduction > (2 * ns.hacknet.getCoreUpgradeCost(i, 1)) &&
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