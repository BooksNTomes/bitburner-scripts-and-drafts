/** @param {NS} ns */
export async function main(ns) {
    const target = ns.args[0];

    ns.exec("gwh-killall.js", "home", 1);
    ns.exec("gwh-manager.js", "home", 1, target);
}