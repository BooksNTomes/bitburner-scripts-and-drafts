/** @param {NS} ns */
export async function main(ns) {
    const target = ns.args[0];
    try {
        await ns.grow(target);
    } catch (err) {
      // Do Nothing
    }
}