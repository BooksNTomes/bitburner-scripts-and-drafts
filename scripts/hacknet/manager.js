/** @param {NS} ns */
export async function main(ns) {
    /** This script is an attempt of initializing buying hacknet servers
     * - based on their costs and user's current money
     * - if the total cost of buying a hacknet server/and upgrade is less than the projected
     * - total profits of the hacknet server nodes, then upgrade or buy a server.
     */

    if (ns.hacknet.numNodes < 1){
        ns.hacknet.purchaseNode();
    }
    ns.exec("hacknet-auto-purchase.js", "home", 1);
    ns.exec("hacknet-auto-upgrade.js", "home", 1)
    
}