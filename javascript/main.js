//フォームの入力値をvalue配列にまとめる関数
function arr() {
  let value = new Array();
  let output =new Array();
  
  for(i=0; i<8; i++){
    let current = i * 2;
    let limit = current + 1;
    
    let current_value = document.F1.elements[current].value;
    let limit_value = document.F1.elements[limit].value;
 
    value[i] = [current_value, limit_value];
  }

  passValue(value);
}

//judgに数値を渡す
function passValue(value){
  let tmp = judg(value);
  let status = ["HP", "力", "魔", "守", "精", "速", "技", "運"];
  alert("パララをそれぞれ以下の通りに振ってください\n"
          + status[0] + "に" + tmp[0] + "体\n"
          + status[1] + "に" + tmp[1] + "体\n"
          + status[2] + "に" + tmp[2] + "体\n"
          + status[3] + "に" + tmp[3] + "体\n"
          + status[4] + "に" + tmp[4] + "体\n"
          + status[5] + "に" + tmp[5] + "体\n"
          + status[6] + "に" + tmp[6] + "体\n"
          + status[7] + "に" + tmp[7] + "体\n"
  );
}

//引き継ぎ値の計算
function calcNextValue(value){
  let next = 1;
  if(value%10 !== 0) {
    next = Math.floor(value / 10);
    next += 1;
  }else{
    next = Math.floor(value / 10);
  }
  return next;
}

//強化値の計算
function calcStrengthen(str_num, current, limit){
  let parara = 0;

  parara = (Math.floor(limit / 10) * 10 + 1) - current;
  if(parara > 0 && str_num >= parara){
    str_num -= parara;
  }else{
    parara = 0;
  }
  
  return {parara, str_num}; //{パララ使用数, 残りの強化値}
}

//パララの振り分け
function judg(value){
  let output = new Array();
  let str_num = document.Strengthen.elements[0].value;
  let priority = [5,6,7,1,2,3,4,0];

  for(i=0; i<8; i++){
    let current = calcNextValue(value[ priority[i] ][0]);
    let limit = calcNextValue(value[ priority[i] ][1]);
    let sub = limit - current;
    if(str_num > 0 && sub > 0){
      tmp = calcStrengthen(str_num, value[ priority[i] ][0], value[ priority[i] ][1]);
      output[ priority[i] ] = tmp.parara;
    }else{
      output[ priority[i] ] = 0;
    }
    str_num = tmp.str_num;
  }
  
  return output; //パララの振り分けを  [HP, 力, 魔, 守, 精, 速, 技, 運]  として出力
}
