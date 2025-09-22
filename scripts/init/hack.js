/** @param {NS} ns */
export async function main(ns) {
    /** Script starter after augmentation / bitnode reset */

    // 1. Cracker / Port Open and Nuke (cracker.js)
    ns.exec("cracker.js", "home");

    // 2. Scan and Create List Textfile (scan.js)
    ns.exec("scan.js", "home");

    // 3. Hacking scripts [Current Implementation: gwh loop scripts]
    //--------------------------------------------------------------
    ns.exec("gwh-scp.js", "home");
    const startingTarget = "joesguns";
    ns.exec("gwh-manager.js", "home", 1, "joesguns");
    //--------------------------------------------------------------
}