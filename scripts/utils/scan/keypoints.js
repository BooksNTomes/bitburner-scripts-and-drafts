/** @param {NS} ns */
export async function main(ns) {
    const redPill = ns.args[0] === 'yes' ? true : false;
    const keyTargets = [
        "CSEC",
        "avmnite-02h",
        "I.I.I.I",
        "run4theh111z",
        "fulcrumassets",
        "The-Cave",
    ]
    if (redPill){
        keyTargets.push("w0r1d_d43m0n");
    }

    for (let i = 0; i < keyTargets.length; i++){
        ns.exec("utils/scan/path.js", "home", 1, keyTargets[i], 'note');
        await ns.sleep(1000);
    }
}
