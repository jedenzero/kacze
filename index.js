var x, y = 0;
var kerning, leading = 10;
var font_size = 16;
var font_weight = 2;
var codes = [];

function setCode(){
  let raw_code = document.querySelector('#code-textarea').value;

  raw_code.split('\n').forEach(row=>{
    codes.push([row.split(': ')[0], row.split(': ')[1]]);
  });
}

function drawLetters(){
  let input = document.querySelector('#input-textarea').value;
  
  while(input!=''){
    for(const code of codes){
      const codeReg=new RegExp(`^${code[0]}`);
      if(codeReg.test(input)){
        input=input.replace(codeReg,'');
        drawLetter(code[1]);
        break;
      }
      if(code==codes[codes.length-1]){
        input=input.slice(1);
      }
    }
  }
}

function drawLetter(code){
  
}
