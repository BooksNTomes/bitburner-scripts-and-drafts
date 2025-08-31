/** @param {NS} ns */
export async function main(ns) {
    // Array of all servers that don't need any ports opened
    // to gain root access. These have 16 GB of RAM
    const servers0Port = ["sigma-cosmetics",
                        "joesguns",
                        "nectar-net",
                        "hong-fang-tea",
                        "harakiri-sushi"];

    // Array of all servers that only need 1 port opened
    // to gain root access. These have 32 GB of RAM
    const servers1Port = ["neo-net",
                        "zer0",
                        "max-hardware",
                        "iron-gym"];

    // ! There's probably a way to automate all that as a 'scan' function so that I could scan->openPort->nuke using the api.

    // Copy our scripts onto each server that requires 0 ports
    // to gain root access. Then use nuke() to gain admin access and
    // run the scripts.
    for (let i = 0; i < servers0Port.length; ++i) {
        const serv = servers0Port[i];

        ns.scp("early-hack-template.js", serv);
        ns.nuke(serv);
        ns.exec("early-hack-template.js", serv, 6);
    }

    // Wait until we acquire the "BruteSSH.exe" program
    while (!ns.fileExists("BruteSSH.exe")) {
        await ns.sleep(60000);
    }

    // Copy our scripts onto each server that requires 1 port
    // to gain root access. Then use brutessh() and nuke()
    // to gain admin access and run the scripts.
    for (let i = 0; i < servers1Port.length; ++i) {
        const serv = servers1Port[i];

        ns.scp("early-hack-template.js", serv);
        ns.brutessh(serv);
        ns.nuke(serv);
        ns.exec("early-hack-template.js", serv, 12);
    }

    // ! might be possible as a separate script taht focuses on script delivery and execution of main hacking script, after the 
    // ! scan->openPort->nuke operation.
}