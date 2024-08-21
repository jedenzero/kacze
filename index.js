var x = 0, y = 0;
var kerning = 2, leading = 5;
var font_size = 20;
var font_weight = 1;
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
  y = font_size*10;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.lineWidth = font_weight*font_size;
  
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
  let coordinates = [];
  
  for(let i=0;i<code.split(' ').length;i++){
    const command = code.split(' ')[i];
    if(command.startsWith('(')){
      coordinates = movePoint(command);
      
      ctx.beginPath();
      ctx.moveTo(...coordinates);
      if(toArray(command)[0]>width){
        width = toArray(command)[0];
      }
    }
    if(command.startsWith('L')){
      coordinates = movePoint(command.slice(1));
      
      ctx.lineTo(...coordinates);
      if(toArray(command.slice(1))[0]>width){
        width = toArray(command.slice(1))[0];
      }
    }
    if(command.startsWith('C')){
      const command_array = toArray(command.slice(1));
      const coordinates_after = movePoint(`(${command_array[0]},${command_array[1]})`);
      const radius = Math.sqrt((coordinates[0]-coordinates_after[0])**2+(coordinates[1]-coordinates_after[1])**2);
      const start_angle = Math.atan2(coordinates[1]-coordinates_after[1],coordinates[0]-coordinates_after[0]);
      
      ctx.arc(...coordinates_after,radius,start_angle,start_angle+command_array[2]/180*Math.PI,command_array[2]);
      coordinates = coordinates_after;
    }
    if(i==code.split(' ').length-1||code.split(' ')[i+1].startsWith('(')){
      ctx.stroke();
    }
  }
  x += (width+kerning)*font_size;
}

function toArray(str){
  return str.slice(1, -1).split(',').map(el=>isNaN(Number(el))?el:Number(el));
}

function movePoint(point){
  point_before=toArray(point);
  return [point_before[0]*font_size+x, -point_before[1]*font_size+y];
}
