/** @param {NS} ns */
export async function main(ns) {
    //** This script is an attempt at an alternative to the formulas.exe program */

    // check for existence of formulas api
    const formulas = fileExists("Formulas.exe", "home") ? ns.formulas : null;
    const targetHost = ns.args[0];

    // ns functions
    // getFunctionRamCost(name) Get the ram cost of a netscript function.
    // getGrowTime(host) Get the execution time of a grow() call.
    // getHackingLevel() Returns the player’s current hacking level.
    // getBitNodeMultipliers(n, lvl) Get the current BitNode multipliers.
    // getHackingMultipliers() Get hacking related multipliers.
    // getHacknetMultipliers() Get hacknet related multipliers.
    // getHackTime(host) Get the execution time of a hack() call.
    // getHostname() Returns a string with the hostname of the server that the script is running on.
    // getMoneySources() Get information about the sources of income for this run.
    // getPlayer() Get information about the player.
    // getPortHandle(portNumber) Get all data on a port.
    // getResetInfo() 	Get information about resets.
    // getServer(host) 	Returns a server object for the given server. Defaults to the running script's server if host is not specified.
    // getServerBaseSecurityLevel(host) 	Get the base security level of a server.
    // getServerGrowth(host) 	Get a server growth parameter.
    // 
    //
    //

    // formulas functions

}