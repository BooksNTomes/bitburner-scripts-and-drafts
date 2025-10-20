/** @param {NS} ns */
export async function main(ns) {
    /** Script starter after augmentation / bitnode reset */
    const corporation = ns.corporation;
    const name = ns.args[0];
    const selfFund = ns.args[1]

    if (corporation.canCreateCorporation(selfFund)){
        corporation.createCorporation(name, selfFund);
    }
}