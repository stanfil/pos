
'use strict';

let summary = 0.00;
function printReceipt(inputs) {
  for(let i=0;i<inputs.length;i++){
    if(i==0){
      inputs[i].count=1;
      continue;
    }
    let isExist = 0;
    for(let j=0;j<i;j++){
      if(inputs[i].barcode==inputs[j].barcode){
        inputs[j].count++;
        isExist = 1;
        inputs.splice(i,1);
        i--;
        break;
      }
    }
    if(isExist==0){
      inputs[i].count=1;
      continue;
    }
  }

  let stringArray = buildStringArray(inputs);
  let print = `***<没钱赚商店>收据***\n`;
  for(let i=0;i<stringArray.length;i++){
    print+=stringArray[i]+'\n';
  }
  print += `----------------------\n`;
  print += `总计：${summary.toFixed(2)}(元)
**********************`;
  console.log(print);
}

function buildStringArray(inputs){
  for(let i=0;i<inputs.length;i++){
    inputs[i].sum = inputs[i].price*inputs[i].count;
    summary += inputs[i].sum;
  }
  let stringArray = [];
  for(let i=0;i<inputs.length;i++){
    stringArray[i]=`名称：${inputs[i].name}，数量：${inputs[i].count}${inputs[i].unit}，单价：${inputs[i].price.toFixed(2)}(元)，小计：${inputs[i].sum.toFixed(2)}(元)`;
  }
  return stringArray;
}

