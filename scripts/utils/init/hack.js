/** @param {NS} ns */
export async function main(ns) {
    /** Script starter after augmentation / bitnode reset */
    const startingTarget = "n00dles";

    // Hacking scripts [Current Implementation: gwh loop scripts]
    //--------------------------------------------------------------
    ns.exec("hack/gwh/init.js", "home", 1, startingTarget);
    //--------------------------------------------------------------
}