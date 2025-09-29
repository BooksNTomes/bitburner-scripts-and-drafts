/** @param {NS} ns */
export async function main(ns) {
    /** Script starter after augmentation / bitnode reset */
    const gang = ns.gang;
    const faction = ns.args[0];

    try{
        gang.createGang(faction)
    } catch (error) {
        ns.tprintf(`Error in creating gang: ${error}`);
    }
}