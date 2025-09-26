/** @param {NS} ns */
export async function main(ns) {
    
    function getTotalProduction(ns) {
        let totalProduction = 0;
        let totalNodes = ns.hacknet.numNodes();
        for (let i = 0; i < totalNodes; i++) {
            totalProduction += ns.hacknet.getNodeStats(i).totalProduction;
        }
        return totalProduction;
    }

    let initialProduction = getTotalProduction(ns);
    while (true){
        const currentProduction = getTotalProduction(ns) - initialProduction;

        ns.print(`Checking if buying new node:`);
        ns.print(`Condition: ${currentProduction} > ${1.5 * ns.hacknet.getPurchaseNodeCost()}?`);
        ns.print(`Condition Satisfied?: ${currentProduction > (1.5 * ns.hacknet.getPurchaseNodeCost())}`);

        if ((currentProduction > (2 * ns.hacknet.getPurchaseNodeCost())) &&
            ns.getServerMoneyAvailable("home") > (1.5 * ns.hacknet.getPurchaseNodeCost())){

            ns.hacknet.purchaseNode();
            initialProduction = getTotalProduction(ns);
        }
        await ns.sleep(60000)
    }
}