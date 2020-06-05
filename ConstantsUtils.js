// ==UserScript==

// @exclude *
// @homepageURL https://openuserjs.org/scripts/Tr4nki/ConstantsUtilLib
// @supportURL https://openuserjs.org/scripts/Tr4nki/ConstantsUtilLib/issues
// @updateURL https://openuserjs.org/meta/Tr4nki/ConstantsUtilLib.meta.js
// @downloadURL https://openuserjs.org/src/scripts/Tr4nki/ConstantsUtilLib.js

// ==UserLibrary==

// @name ConstantsUtilLib
// @description Selfcontained script to help getting marketplace constants data from server
// @copyright 2020, Tr4nki (https://openuserjs.org/users/Tr4nki)
// @license MIT
// @version 1.1.2

// ==/UserScript==
// ==/UserLibrary==
// changes: added name and value identification to tradeOptions object
// ==OpenUserJS==
// @author Tr4nki
// ==/OpenUserJS==

var ConstUtils={
	injectConstantsColector(){
		//Inject code via eval function is required due to usage of opener object and postMessage function and must be native objects to access properly
		unsafeWindow.eval("!function(){try{var e={minPriceRange:marketplace.priceRangeLower,maxPriceRange:marketplace.priceRangeUpper,ratios:marketplace.currentRatio,htmlIDs_objectValues:{},objectTradeOptions:{}};for(var a in marketplace.itemOptions)marketplace.itemOptions[a].forEach(function(t){'items'==a?e.htmlIDs_objectValues[t.itemImage]=t.value:'resources'==a?e.htmlIDs_objectValues[t.cssClass]=t.value:'ships'==a&&(e.htmlIDs_objectValues[t.cssClass.replace('large','small')]=t.value),e.objectTradeOptions[t.value]={priceCalculatedInMCD:t.priceCalculatedInMCD,type:t.type,value:t.value,name:t.name}});localStorage.setItem('CLT_MPT_Marketplace_Constants',JSON.stringify(e))}catch(e){if(console.log(`Error getting constants ${e}`),opener)return void opener.postMessage('fail',location.origin)}opener&&opener.postMessage('done',location.origin)}();");
    },
    getConstants(){
        return new Promise(function(res,rej){
            var ret=JSON.parse(localStorage.getItem("CLT_MPT_Marketplace_Constants"));
            if(ret)
                res(ret);
            else{
                var constantsTab=this.open(location.origin+"/game/index.php?page=ingame&component=marketplace&tab=create_offer");
                this.addEventListener("message",function(ev){
                    var msg=ev.data;
                    if(msg=="done"){
                        constantsTab.close();
                        res(JSON.parse(localStorage.getItem("CLT_MPT_Marketplace_Constants")));
                        //poner un botoncito en verde en señal de que se han cargado las constantes
                    }else{
                        throw new Error("constants couldn\\'t be loaded");
                        //poner un botoncito en rojo en señal de que no se han cargado las constantes
                    }
                },false);
            }
        });
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
                    priceCalculatedInMCD:item.priceCalculatedInMCD,
                    type:item.type,
                    value:item.value,
                    name:item.name
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