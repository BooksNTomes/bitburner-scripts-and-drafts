/**
 * 
 * 
 * 

acceptInvestmentOffer() 	Accept the investment offer. The value of offer is based on current corporation valuation.
bribe(factionName, amountCash) 	

Bribe a faction. You must satisfy these conditions:

- The corporation valuation must be greater than or equal to a threshold. You can use getCorporation and getConstants to get this information.

- You must be a member of the specified faction.

- The specified faction must offer at least 1 type of work. You can use getFactionWorkTypes to get the list of work types of a faction.
buyBackShares(amount) 	Buyback shares. Spend money from the player's wallet to transfer shares from public traders to the CEO.
canCreateCorporation(selfFund) 	Return whether the player can create a corporation. Does not require API access.
createCorporation(corporationName, selfFund) 	

Create a Corporation. You should use canCreateCorporation to check if you are unsure you can do it, because it throws an error in these cases:

- Use seed money outside BitNode 3.

- Be in a BitNode that has CorporationSoftcap (a BitNode modifier) less than 0.15.
expandCity(divisionName, city) 	Expand to a new city.
expandIndustry(industryType, divisionName) 	Expand to a new industry.
getBonusTime() 	Get bonus time. Bonus time is accumulated when the game is offline or if the game is inactive in the browser. Bonus time makes the corporation progress faster.
getConstants() 	Get corporation-related constants.
getCorporation() 	Get corporation data.
getDivision(divisionName) 	Get division data.
getIndustryData(industryName) 	Get constant data of an industry.
getInvestmentOffer() 	Get an offer for investment based on current corporation valuation.
getMaterialData(materialName) 	Get constant data of a material.
getUnlockCost(upgradeName) 	Get the cost to unlock a one-time unlockable upgrade.
getUpgradeLevel(upgradeName) 	Get the level of a levelable upgrade.
getUpgradeLevelCost(upgradeName) 	Get the cost to unlock the next level of a levelable upgrade.
goPublic(numShares) 	Go public.
hasCorporation() 	Return whether the player has a corporation. Does not require API access.
hasUnlock(upgradeName) 	Check if you have a one-time unlockable upgrade.
issueDividends(rate) 	Issue dividends.
issueNewShares(amount) 	Issue new shares.
levelUpgrade(upgradeName) 	Level up an upgrade.
nextUpdate() 	Sleep until the next Corporation update happens.
purchaseUnlock(upgradeName) 	Unlock an upgrade.
sellDivision(divisionName) 	Sell a division.
sellShares(amount) 	Sell shares. Transfer shares from the CEO to public traders to receive money in the player's wallet.


* 
 * 
 * 
 * 
 * 
 */