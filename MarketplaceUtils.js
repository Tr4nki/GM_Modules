// ==UserScript==

// @exclude *
// @homepageURL https://openuserjs.org/scripts/Tr4nki/MarketRatioUtilsLib
// @supportURL https://openuserjs.org/scripts/Tr4nki/MarketRatioUtilsLib/issues
// @updateURL https://openuserjs.org/meta/Tr4nki/MarketRatioUtilsLib.meta.js
// @downloadURL https://openuserjs.org/src/scripts/Tr4nki/MarketRatioUtilsLib.user.js

// ==UserLibrary==

// @name MarketRatioUtilsLib
// @description Selfcontained script to help converting resources and ships to MCD and calculate the trade ratio
// @copyright 2020, Tr4nki (https://openuserjs.org/users/Tr4nki)
// @license MIT
// @version 1.0.0

// ==/UserScript==
// ==/UserLibrary==

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