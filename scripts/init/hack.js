/** @param {NS} ns */
export async function main(ns) {
    /** Script starter after augmentation / bitnode reset */
    const startingTarget = "n00dles";

    // Hacking scripts [Current Implementation: gwh loop scripts]
    //--------------------------------------------------------------
    ns.exec("gwh-scp.js", "home");
    ns.exec("gwh-manager.js", "home", 1, startingTarget);
    //--------------------------------------------------------------
}