/** @param {NS} ns */
export async function main(ns) {
    const target = ns.args[0];
    try {
        await ns.hack(target);
    } catch (err) {
      // Do Nothing
    }
}