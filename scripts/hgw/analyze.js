/** @param {NS} ns */
export async function main(ns) {

    /** Experimental Script For Analyzing Server Optimal Thread Assignments */
    let tempTarget = 'n00dles';
    let cores = 1;
    console.log(`Target is ${tempTarget}`);
    
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
    let hackThreads = 5;
    let hackTotal = 0;
    for (let i = 0; i < hackThreads; i++){
        hackTotal += hackAnalyze(tempTarget);
    }
    console.log(`${hackThreads} hack threads results in ${hackTotal}`)
    console.log(`checking with hackAnalyzeThreads: ${ns.hackAnalyzeThreads(tempTarget, hackTotal)}`);

    /** Grow Thread Experiment 
     * - Check for effects of a given multiplicative growth factor
    */
    let multiplier = 0.2;
    let growTotal = 0;
    let targetMoney = ns.getMoneyAvailable(tempTarget);
    growTotal = targetMoney + (targetMoney * multiplier);
    let growThreads = ns.growthAnalyze(tempTarget, multiplier, cores);
    console.log(`${growThreads} grow threads results in ${growTotal}`);
    
    /** Weaken Threads Experiment 
     * - Check for power of weakenat 1 core
    */
   let weakenThreads = 20;
   console.log(`weaken with ${weakenThreads} results in ${ns.weakenAnalyze(weakenThreads, cores)}`)
}