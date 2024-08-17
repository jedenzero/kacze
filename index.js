var x = 0, y = 0;
var kerning = 0, leading = 10;
var font_size = 16;
var font_weight = 2;
var codes = [];

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
  const ctx = document.querySelector('#output-canvas').getContext('2d');
  ctx.lineWidth = font_weight*font_size/10;
  code.split(', ').forEach(stroke=>{
    ctx.beginPath();
    ctx.moveTo(...movePoint(stroke.split(' ')[0]));
    stroke.split(' ').slice(1).forEach(command=>{
      if(command.startsWith('L')){
        ctx.lineTo(...movePoint(command.slice(1)));
      }
      if(command.startsWith('C')){
        //arc
      }
    });
    ctx.stroke();
  });
  x += kerning;
}

function movePoint(point_before){
  point_before = point_before.slice(1, -1).split(',').map(Number);
  const point_after = [point_before[0]*font_size/8+x, point_before[1]*font_size/8+y]
  return point_after;
}
