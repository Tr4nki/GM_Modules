// ==UserScript==
// @name Constants_Utils
// @description Singleton to help getting constants data from server
// @copyright 2020, Tr4nki (https://openuserjs.org/users/Tr4nki)
// @license MIT
// @icon https://s168-es.ogame.gameforge.com/favicon.ico
// @homepageURL https://openuserjs.org/scripts/Tr4nki/Constants_Utils
// @supportURL https://openuserjs.org/scripts/Tr4nki/Constants_Utils/issues
// @version 1.0.3
// @updateURL https://openuserjs.org/meta/Tr4nki/Constants_Utils.meta.js
// @downloadURL https://openuserjs.org/src/scripts/Tr4nki/Constants_Utils.user.js
//
// @include https://*.ogame*gameforge.com/game/index.php?page=ingame&component=marketplace
// @exclude https://*.ogame*gameforge.com/game/index.php?page=chat
// @exclude https://*.ogame*gameforge.com/game/index.php?page=messages
// ==/UserScript==

// ==OpenUserJS==
// @author Tr4nki
// ==/OpenUserJS==

var ConstUtils={
	injectConstantsColector(){
		//Inject code via eval function is required due to usage of opener object and postMessage function and must be native objects to access properly
		unsafeWindow.eval("!function(){try{var e={minPriceRange:marketplace.priceRangeLower,maxPriceRange:marketplace.priceRangeUpper,ratios:marketplace.currentRatio,htmlIDs_objectValues:{},objectTradeOptions:{}};for(var a in marketplace.itemOptions)marketplace.itemOptions[a].forEach(function(t){'items'==a?e.htmlIDs_objectValues[t.itemImage]=t.value:'resources'==a?e.htmlIDs_objectValues[t.cssClass]=t.value:'ships'==a&&(e.htmlIDs_objectValues[t.cssClass.replace('large','small')]=t.value),e.objectTradeOptions[t.value]={priceCalculatedInMCD:t.priceCalculatedInMCD}});localStorage.setItem('CLT_MPT_Marketplace_Constants',JSON.stringify(e))}catch(e){if(console.log(`Error getting constants ${e}`),opener)return void opener.postMessage('fail',location.origin)}opener&&opener.postMessage('done',location.origin)}();");
	}
};

/* This is the code injected in unsafeWindow.

!function loadMarketConstants(){
	
	try{
		var constants={
			minPriceRange:marketplace.priceRangeLower,
			maxPriceRange:marketplace.priceRangeUpper,
			ratios:marketplace.currentRatio,
			htmlIDs_objectValues:{},
			objectTradeOptions:{}
		};
		
		for(var itemType in marketplace.itemOptions){
			//console.log(itemType);
			marketplace.itemOptions[itemType].forEach(function(item){
				if(itemType=="items"){
					constants.htmlIDs_objectValues[item.itemImage]=item.value; 
				}else if(itemType=="resources"){
					constants.htmlIDs_objectValues[item.cssClass]=item.value; 
				}else if(itemType=="ships"){
					constants.htmlIDs_objectValues[item.cssClass.replace("large","small")]=item.value; 
				}
				constants.objectTradeOptions[item.value]={
					priceCalculatedInMCD:item.priceCalculatedInMCD
				}
			});
		}
		
		//console.log(constants);
		localStorage.setItem("CLT_MPT_Marketplace_Constants",JSON.stringify(constants));
	}catch(e){
		console.log(`Error getting constants ${e}`);
		if(opener){
			opener.postMessage("fail",location.origin);
			return
		}
	}

	//console.log("Trying to comunicate with opener");
	if(opener){
		//console.log("there is opener");
		opener.postMessage("done",location.origin);
		//console.log("done");
	}else{
		//console.log("there is no opener");
	}
	//console.log("my window-> %O",window);
}();
*/