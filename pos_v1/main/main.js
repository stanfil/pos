'use strict';

function printReceipt(tags){
  let protags = buildObject(tags);
  protags = rmSameObject(protags);
  protags = finalObject(protags);
  let sheet = buildString(protags);
  let string = print(sheet);
  console.log(string);
}

//buildObject
function buildObject(tags){
  const list = loadAllItems();
  let protags = [];
  for(let tagsi=0;tagsi<tags.length;tagsi++){
    if(tags[tagsi].length==10){
      for(let listi=0;listi<list.length;listi++) {
        if (tags[tagsi] == list[listi].barcode) {
          protags[tagsi] = deepCopy(list[listi]);
          protags[tagsi].count = 1;
        }
      }
    }
    else{
      for(let listi=0;listi<list.length;listi++) {
        if (tags[tagsi].substring(0,10) == list[listi].barcode) {
          protags[tagsi] = deepCopy(list[listi]);
          protags[tagsi].count = parseFloat(tags[tagsi].substring(11));
        }
      }
    }
  }
  return protags;
}


//remove the same objects;
function rmSameObject(protags) {
  for(let pi=0;pi<protags.length;pi++){
    if(pi>0){
      for(let i=0;i<pi;i++){
        if(protags[pi].barcode==protags[i].barcode){
          protags[i].count+=protags[pi].count;
          protags.splice(pi,1);
          pi--;
          break;
        }
      }
    }
  }
  return protags;
}

let totalsum = 0,totalsave = 0;
//take sale into account
function finalObject(protags) {
  const onsale = loadPromotions()[0].barcodes;
  let isOnsale = 0;
  for(let pi=0;pi<protags.length;pi++){
    isOnsale = 0;
    for(let i=0;i<onsale.length;i++){
      if(protags[pi].barcode == onsale[i]){
        // add sum;
        protags[pi].sum = protags[pi].price*(protags[pi].count-parseInt(protags[pi].count/3));
        totalsum += protags[pi].sum;
        totalsave += (protags[pi].price*protags[pi].count-protags[pi].sum);
        isOnsale = 1;
        break;
      }
    }
    if(isOnsale==0){
      protags[pi].sum = protags[pi].price*protags[pi].count;
      totalsum += protags[pi].sum;
    }
  }
  return protags;
}


//buildString
function buildString(protags) {
  let sheet=[];
  for(let i=0;i<protags.length;i++){
    sheet[i]=`名称：${protags[i].name}，数量：${protags[i].count}${protags[i].unit}，单价：${protags[i].price.toFixed(2)}(元)，小计：${protags[i].sum.toFixed(2)}(元)`;
  }
  return sheet;
}

//print
function print(sheet) {
  let string='';
  string+=`***<没钱赚商店>收据***\n`;
  for(let i=0;i<sheet.length;i++){
    string+=sheet[i]+'\n';
  }
  string+=`----------------------
总计：${totalsum.toFixed(2)}(元)
节省：${totalsave.toFixed(2)}(元)
**********************`;

  return string;
}


//deepcopy
let deepCopy = function(source) {
  let result = {};
  for(let key in source){
    result[key] = typeof source[key] === "object" ? deepCopy(source[key]) : source[key];
  }
  return result;
}

/*
const tags = [
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000003-2.5',
  'ITEM000005',
  'ITEM000005-2',
];
printReceipt(tags);
*/
