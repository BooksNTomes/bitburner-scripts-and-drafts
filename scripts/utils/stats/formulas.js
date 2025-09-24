/** @param {NS} ns */
export async function main(ns) {
    //** This script is an attempt at an alternative to the formulas.exe program 
    // - This script is starting to be my study grounds for the api functions*/

    // check for existence of formulas api
    const formulas = fileExists("Formulas.exe", "home") ? ns.formulas : null;
    const targetHost = ns.args[0];

    // ns functions
    // getGrowTime(host) Get the execution time of a grow() call.
    // getHackTime(host) Get the execution time of a hack() call.
    // getWeakenTime(host) 	Get the execution time of a weaken() call.
    
    // growthAnalyze(host, multiplier, cores) 	Calculate the number of grow threads needed for a given multiplicative growth factor.
    // growthAnalyzeSecurity(threads, hostname, cores) 	Calculate the security increase for a number of grow threads.
    
    // hackAnalyze(host) 	Get the part of money stolen with a single thread.
    // hackAnalyzeChance(host) 	Get the chance of successfully hacking a server.
    // hackAnalyzeSecurity(threads, hostname) 	Get the security increase for a number of threads.
    // hackAnalyzeThreads(host, hackAmount) 	Calculate the decimal number of threads needed to hack a specified amount of money from a target host.
    
    // weakenAnalyze(threads, cores) 	Predict the effect of weaken.
    
    // getServer(host) 	Returns a server object for the given server. Defaults to the running script's server if host is not specified.
    // getServerGrowth(host) 	Get a server growth parameter.

    // getServerBaseSecurityLevel(host) 	Get the base security level of a server.
    // getServerMinSecurityLevel(host) 	Returns the minimum security level of the target server.
    // getServerSecurityLevel(host) 	Get server security level.

    // getServerMaxMoney(host) 	Get the maximum money available on a server.
    // getServerMaxRam(host) 	Get the maximum amount of RAM on a server.

    // getServerRequiredHackingLevel(host) 	Returns the required hacking level of the target server.
    // getServerUsedRam(host) 	Get the used RAM on a server.
    // getServerMoneyAvailable(host) 	Get money available on a server.
    // getServerNumPortsRequired(host) 	Returns the number of open ports required to successfully run NUKE.exe on the specified server.
    // hasRootAccess(host) 	Check if you have root access on a server.
    // hasTorRouter() 	Returns whether the player has access to the darkweb.
    
    // getFunctionRamCost(name) Get the ram cost of a netscript function.
    // getHackingMultipliers() Get hacking related multipliers.
    // getHackingLevel() Returns the player’s current hacking level.
    // getHacknetMultipliers() Get hacknet related multipliers.
    // getBitNodeMultipliers(n, lvl) Get the current BitNode multipliers.
    // getHostname() Returns a string with the hostname of the server that the script is running on.
    // getMoneySources() Get information about the sources of income for this run.
    // getPlayer() Get information about the player.
    // getPortHandle(portNumber) Get all data on a port.
    // getResetInfo() 	Get information about resets.

    
    // isLogEnabled(fn) 	Checks the status of the logging for the given NS function.
    // isRunning(script, host, args) 	Check if a script is running.
    // kill(pid) 	Terminate the script with the provided PID.
    // kill(filename, hostname, args) 	Terminate the script(s) with the provided filename, hostname, and script arguments.
    // killall(host, safetyGuard) 	Terminate all scripts on a server.
    // ls(host, substring) 	List files on a server.

    // formulas functions

    // GANGS
    // ascensionMultiplier(points) 	Calculate ascension mult.
    // ascensionPointsGain(exp) 	Calculate ascension point gain.
    // moneyGain(gang, member, task) 	Calculate money gain per tick.
    // respectGain(gang, member, task) 	Calculate respect gain per tick.
    // wantedLevelGain(gang, member, task) 	Calculate wanted gain per tick.
    // wantedPenalty(gang) 	Calculate the wanted penalty.

    // HACKING
    // growAmount(server, player, threads, cores) 	
    // - Calculate the amount of money a grow action will leave a server with. Starting money is server.moneyAvailable. Note that when simulating the effect of grow, what matters is the state of the server and player when the grow *finishes*, not when it is started.
    // - The growth amount depends both linearly *and* exponentially on threads; see grow for more details.
    // - The inverse of this function is formulas.hacking.growThreads, although it rounds up to integer threads.
    // growPercent(server, threads, player, cores) 	
    // - Calculate the growth multiplier constant for a given server and threads.
    // - The actual amount of money grown depends both linearly *and* exponentially on threads; this is only giving the exponential part that is used for the multiplier. See grow for more details.
    // - As a result of the above, this multiplier does *not* depend on the amount of money on the server. Changing server.moneyAvailable and server.moneyMax will have no effect.
    // - For the most common use-cases, you probably want either formulas.hacking.growThreads or formulas.hacking.growAmount instead.
    // growThreads(server, player, targetMoney, cores) 	
    // - Calculate how many threads it will take to grow server to targetMoney. Starting money is server.moneyAvailable. Note that when simulating the effect of grow, what matters is the state of the server and player when the grow *finishes*, not when it is started.
    // - The growth amount depends both linearly *and* exponentially on threads; see grow for more details.
    // - The inverse of this function is formulas.hacking.growAmount, although it can work with fractional threads.
    // growTime(server, player) 	Calculate grow time.
    // hackChance(server, player) 	Calculate hack chance. (Ex: 0.25 would indicate a 25% chance of success.)
    // hackExp(server, player) 	Calculate hack exp for one thread.
    // hackPercent(server, player) 	Calculate hack percent for one thread. (Ex: 0.25 would steal 25% of the server's current value.)
    // hackTime(server, player) 	Calculate hack time.
    // weakenTime(server, player) 	Calculate weaken time.
}
