/** @param {NS} ns */
export async function main(ns) {
    while (true){
        let totalProduction = 0;
        let totalNodes = ns.hacknet.numNodes();
        for (let i = 0; i < totalNodes; i++) {
            totalProduction += ns.hacknet.getNodeStats(i).totalProduction;
        }

        ns.print(`Checking if buying new node:`);
        ns.print(`Condition: ${totalProduction} > ${1.5 * ns.hacknet.getPurchaseNodeCost()}?`);
        ns.print(`Condition Satisfied?: ${totalProduction > (1.5 * ns.hacknet.getPurchaseNodeCost())}`);

        if ((totalProduction > (2 * ns.hacknet.getPurchaseNodeCost())) &&
            ns.getServerMoneyAvailable("home") > (1.5 * ns.hacknet.getPurchaseNodeCost())){
            
            ns.hacknet.purchaseNode();
            totalNodes += 1;
        }
        await ns.sleep(60000)
    }
}