/** @param {NS} ns */
export async function main(ns) {
    /** Script starter after augmentation / bitnode reset */

    // Hacking scripts [Current Implementation: gwh loop scripts]
    //--------------------------------------------------------------
    ns.exec("gwh-scp.js", "home");
    const startingTarget = "joesguns";
    ns.exec("gwh-manager.js", "home", 1, "joesguns");
    //--------------------------------------------------------------
}