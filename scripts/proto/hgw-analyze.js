/** @param {NS} ns */
export async function main(ns) {

    /** Experimental Script For Analyzing Server Optimal Thread Assignments */
    let tempTarget = 'n00dles';
    let cores = 1;
    ns.print(`Target is ${tempTarget}`);
    
    /** Analysis functions
     * hackAnalyze(host) 	                    Get the part of money stolen with a single thread.
     * hackAnalyzeChance(host) 	                Get the chance of successfully hacking a server.
     * hackAnalyzeSecurity(threads, hostname) 	Get the security increase for a number of threads.
     * hackAnalyzeThreads(host, hackAmount) 	Calculate the decimal number of threads needed to hack a specified amount of money from a target host.
     * growthAnalyze(host, multiplier, cores) 	Calculate the number of grow threads needed for a given multiplicative growth factor.
     * growthAnalyzeSecurity(threads, hostname, cores) 	Calculate the security increase for a number of grow threads.
     * weakenAnalyze(threads, cores) 	Predict the effect of weaken.
    */

    /** Hack Thread Experiment 
     * - Check if hackTotal == actualHackingMoneyGain
    */
    let hackThreads = 1;
    let hackTotal = 0;
    for (let i = 0; i < hackThreads; i++){
        hackTotal += ns.hackAnalyze(tempTarget);
    }
    ns.print(`${hackThreads} hack threads results in ${hackTotal * ns.getServerMoneyAvailable(tempTarget)}`)
    ns.print(`checking with hackAnalyzeThreads: ${ns.hackAnalyzeThreads(tempTarget, hackTotal * ns.getServerMoneyAvailable(tempTarget))}`);

    /** Resutlts
     * hackTotal is actually the fraction showing: 'actual money stolen' / 'total money in the server'
     * it follows that the actual hacktotal is "hackTotal * ns.getServerMoneyAvailable"
    */

    /** Grow Thread Experiment 
     * - Check for effects of a given multiplicative growth factor
    */
    let multiplier = 1.2;
    let growTotal = 0;
    let targetMoney = ns.getServerMoneyAvailable(tempTarget);
    growTotal = targetMoney * multiplier;
    let growThreads = ns.growthAnalyze(tempTarget, multiplier, cores);
    ns.print(`${growThreads} grow threads results in ${growTotal}`);
    
    // TODO: check what growth does
    let growth = ns.getServerGrowth(tempTarget);

    /** Results
     * - can be used for determining optimal grow threads, possibly
     * - main limitation is the amount of available threads itself
    */

    /** Weaken Threads Experiment 
     * - Check for power of weakenat 1 core
    */
    let weakenThreads = 10;
    ns.print(`weaken with ${weakenThreads} results in ${ns.weakenAnalyze(weakenThreads, cores)}`)

    /** Results
     * - it's a constant 0.5, effects of threads stack up additively, can easily be determined
    */

    /** Requires above test for trial and error observation */

    /** Thread assignment experiment 
     * - from a certain thread count available, assign threads for certain operations (hack, weaken, grow)
    */

    let threadTotal = 100000;
   
    let n00dlesAvailableMoney = getServerMoneyAvailable(host);
    let n00dlesMaxMoney = getServerMaxMoney(host);
    let n00dlesSecurity = getServerSecurityLevel(tempTarget);
    let n00dlesMinSecurity = getServerMinSecurityLevel(tempTarget);

    /** Todo Idea: perhaps we can do a preliminary operation of fully weakening the server before it 
     * undergoes the full hacking loop. For effectiveness */

    /** Consideration: perhaps this hgw script is best used once we have sufficient threads? It seems that the basic script is best
     * for starting out, then the gwh script once there is a good threadcount, and then the hgw script once there is a really good 
     * threadcount
     */

    // We assume that we have enough threads (100000)

    // Loop: Weaken Server to Base -> Create Threads for Growing Server 
    // -> Analyze Grow Threads Effect -> Weaken Ends -> Create Counter Weaken Threads For Grow
    // -> Create Threads for Hacking -> Weaken Ends -> Create Counter Weaken Threads For Hacking 
    // ... -> Create Threads for Growing Server -> ...

    /** 1 -  */



}