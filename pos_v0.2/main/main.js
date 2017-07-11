
'use strict';

let summary = 0.00;
function printReceipt(inputs) {

//pos_v0.2
  let inputs1 = [];
  const list = loadAllItems();
  for(let i=0;i<inputs.length;i++){
    for(let j=0;j<list.length;j++){
      if(inputs[i]==list[j].barcode){
        inputs1[i] = list[j];
      }
    }
  }




//pos_v0.1
  for(let i=0;i<inputs1.length;i++){
    if(i==0){
      inputs1[i].count=1;
      continue;
    }
    let isExist = 0;
    for(let j=0;j<i;j++){
      if(inputs1[i].barcode==inputs1[j].barcode){
        inputs1[j].count++;
        isExist = 1;
        inputs1.splice(i,1);
        i--;
        break;
      }
    }
    if(isExist==0){
      inputs1[i].count=1;
      continue;
    }
  }

  let stringArray = buildStringArray(inputs1);
  let print = `***<没钱赚商店>收据***\n`;
  for(let i=0;i<stringArray.length;i++){
    print+=stringArray[i]+'\n';
  }
  print += `----------------------\n`;
  print += `总计：${summary.toFixed(2)}(元)
**********************`;
  console.log(print);
}

function buildStringArray(inputs1){
  for(let i=0;i<inputs1.length;i++){
    inputs1[i].sum = inputs1[i].price*inputs1[i].count;
    summary += inputs1[i].sum;
  }
  let stringArray = [];
  for(let i=0;i<inputs1.length;i++){
    stringArray[i]=`名称：${inputs1[i].name}，数量：${inputs1[i].count}${inputs1[i].unit}，单价：${inputs1[i].price.toFixed(2)}(元)，小计：${inputs1[i].sum.toFixed(2)}(元)`;
  }
  return stringArray;
}
/*
const inputs = [
  'ITEM000000',
  'ITEM000000',
  'ITEM000000',
  'ITEM000000',
  'ITEM000000',
  'ITEM000001',
  'ITEM000001',
  'ITEM000004'
];


printReceipt(inputs);
*/

