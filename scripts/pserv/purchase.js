/** @param {NS} ns */
export async function main(ns) {
    const ram = ns.args[0];

    let i = 0;

    while (i < ns.getPurchasedServerLimit()) {
        while (ns.getServerMoneyAvailable("home") <= ns.getPurchasedServerCost(ram)) {
            await ns.sleep(10000);
        }
        ns.purchaseServer("pserv-" + i, ram);
        ++i;
        await ns.sleep(1000);
    }

    // Execute scp scripts immediately
    ns.exec('gwh/scp.js', 'home', 1);
    await ns.sleep(1500);
    ns.exec('hgw/scp.js', 'home', 1);
    await ns.sleep(1500);

}