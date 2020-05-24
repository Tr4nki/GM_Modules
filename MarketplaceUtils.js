// ==UserScript==
// @name Marketplace_Ratio_Utils
// @description Singleton to help converting resources and ships to MCD and calculate the trade ratio
// @copyright 2020, Tr4nki (https://openuserjs.org/users/Tr4nki)
// @license MIT
// @icon https://s168-es.ogame.gameforge.com/favicon.ico
// @homepageURL https://openuserjs.org/scripts/Tr4nki/Marketplace_Ratio_Utils
// @supportURL https://openuserjs.org/scripts/Tr4nki/Marketplace_Ratio_Utils/issues
// @version 1.0.5
// @updateURL https://openuserjs.org/meta/Tr4nki/Marketplace_Ratio_Utils.meta.js
// @downloadURL https://openuserjs.org/src/scripts/Tr4nki/Marketplace_Ratio_Utils.user.js
//
// @include https://*.ogame*gameforge.com/game/index.php?page=ingame&component=marketplace
// @exclude https://*.ogame*gameforge.com/game/index.php?page=chat
// @exclude https://*.ogame*gameforge.com/game/index.php?page=messages
// ==/UserScript==

// ==OpenUserJS==
// @author Tr4nki
// ==/OpenUserJS==

function MP_Ratio_Utils(mktConst){
    this.marketConstants=mktConst;
}

MP_Ratio_Utils.prototype.convertToMetal=function(currency,ammount){
    var ret;
    switch(currency){
    case "deuterium":
        ret=this.deuteriumToMetal(ammount);
    break;
    case "crystal":
        ret=this.crystalToMetal(ammount);
    break;
    case "metal":
        ret=ammount;
    break;
    default:
        ret=ammount;
    break;
    }
    return ret;
};
    
MP_Ratio_Utils.prototype.deuteriumToMetal=function(ammount){
    //M=2.5*D
    return ammount*this.marketConstants.ratios.metal;
};

MP_Ratio_Utils.prototype.crystalToMetal=function(ammount){
    //1.- D=M/2.5
    //2.- D=C/1.5
    //3.- M/2.5=C/1.5
    //4.- ===> M=2.5C/1.5 <===
    return (this.marketConstants.ratios.metal*ammount)/this.marketConstants.ratios.crystal;
};

MP_Ratio_Utils.prototype.calcRatio=function(itemOptions,ammountOffered,currencyOffered,ammountRequested,currencyRequested,buyingID){
    var ret;
    var ammountOfferedInMCD;
    var ammountRequestedInMCD;
    var standarPriceInMCD;

    ammountOfferedInMCD=this.convertToMetal(currencyOffered,ammountOffered);//cantidad ofrecida en metal

    standarPriceInMCD=itemOptions.priceCalculatedInMCD*ammountRequested;
    ret=ammountOfferedInMCD/standarPriceInMCD;

    ret=(Math.round(ret*100))/100;

    return ret;
}