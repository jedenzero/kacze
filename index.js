var x = 0, y = 0;
var kerning = 10, leading = 10;
var font_size = 16;
var font_weight = 2;
var codes = [];
const ctx = document.querySelector('#output-canvas').getContext('2d');

function setCode(){
  let raw_code = document.querySelector('#code-textarea').value;
  codes=[];
  
  raw_code.split('\n').forEach(row=>{
    codes.push([row.split(': ')[0], row.split(': ')[1]]);
  });
}

function drawLetters(){
  let input = document.querySelector('#input-textarea').value;
  x = 0;
  y = font_size;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.lineWidth = font_weight*font_size/16;
  
  while(input!=''){
    for(const code of codes){
      const codeReg = new RegExp(`^${code[0]}`);
      if(codeReg.test(input)){
        input = input.replace(codeReg,'');
        drawLetter(code[1]);
        break;
      }
      if(code==codes[codes.length-1]){
        input = input.slice(1);
      }
    }
  }
}

function drawLetter(code){
  let width = 0;
  
  for(const [index,command] of Object.entries(code.split(' '))){
    if(command.startsWith('(')){
      ctx.beginPath();
      ctx.moveTo(...movePoint(command));
      if(toArray(command)[0]>width){
        width = toArray(command)[0];
      }
    }
    if(command.startsWith('L')){
      ctx.lineTo(...movePoint(command.slice(1)));
      if(toArray(command.slice(1))[0]>width){
        width = toArray(command.slice(1))[0];
      }
    }
    if(command.startsWith('C')){
      //arc
    }
    if(index==code.split(' ').length||command[index+1].startsWith('(')){
      ctx.stroke();
    }
  }
  x += width+kerning;
}

function toArray(point){
  return point.slice(1, -1).split(',').map(Number);
}

function movePoint(point){
  point_before=toArray(point);
  return [point_before[0]*font_size/8+x, -point_before[1]*font_size/8+y];
}
