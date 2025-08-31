/** @param {NS} ns */
export async function main(ns) {

    // ! Basic hacking script thought at the in-game documentation.

    // Defines the "target server", which is the server
    // that we're going to hack. In this case, it's "joesguns"
    const target = "joesguns";
    // ! I can use ns.args[0] to make the target more flexible

    // Defines how much money a server should have before we hack it
    // In this case, it is set to the maximum amount of money.
    const moneyThresh = ns.getServerMaxMoney(target);
    // ! I can work on adjusting this using a percentage. Maybe it's fine to try 90% or 80% instead of 100% max money

    // Defines the minimum security level the target server can
    // have. If the target's security level is higher than this,
    // we'll weaken it before doing anything else
    const securityThresh = ns.getServerMinSecurityLevel(target);
    // ! I can work on using a percentage here too (same with moneyThresh)

    // If we have the BruteSSH.exe program, use it to open the SSH Port
    // on the target server
    if (ns.fileExists("BruteSSH.exe", "home")) {
        ns.brutessh(target);
    }
    
    // Get root access to target server
    ns.nuke(target);
    // ! I can probably separate that section as a scan->openPorts->nuke focused script, to reduce ram usage for hacking.
    
    // Infinite loop that continously hacks/grows/weakens the target server
    while(true) {
        if (ns.getServerSecurityLevel(target) > securityThresh) {
            // If the server's security level is above our threshold, weaken it
            await ns.weaken(target);
        } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
            // If the server's money is less than our threshold, grow it
            await ns.grow(target);
        } else {
            // Otherwise, hack it
            await ns.hack(target);
        }
    }
    // ! Docs suggest separating the weaken, grow, and hack scripts, 
    // ! and have a manager that can calculate the best thread usage for each operation. Not sure how to do that yet
}