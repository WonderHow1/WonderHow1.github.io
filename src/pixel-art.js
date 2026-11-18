function rect(ctx,x,y,w,h,c){ctx.fillStyle=c;
ctx.fillRect(x,y,w,h)}
function tree(c,x,y){rect(c,x+5,y+10,3,11,'#745644');
rect(c,x,y+5,14,9,'#58864d');
rect(c,x+3,y,8,18,'#58864d');
rect(c,x+3,y+4,5,7,'#7ba65e')}
function scene(canvas,type){const c=canvas.getContext('2d');
canvas.width=240;
canvas.height=160;
c.imageSmoothingEnabled=false;

// Conceptual product previews, not actual product screenshots.
if(type==='phone'){rect(c,90,8,63,140,'#284435');
rect(c,94,12,55,132,'#fcfcf2');
rect(c,110,16,22,4,'#284435');
rect(c,102,33,35,4,'#3c5d44');
rect(c,102,43,24,3,'#9ea993');
rect(c,101,56,41,34,'#d8e4b5');
for(let i=0;
i<5;
i++)rect(c,106+i*6,79-i*4,4,8+i*4,'#5c7c4e');
rect(c,102,100,36,4,'#7d906b');
rect(c,102,111,26,3,'#b0bba0');
rect(c,102,126,36,8,'#476b4f');
tree(c,47,101);
tree(c,180,112)}
if(type==='map'){rect(c,19,24,202,115,'#f7fafb');
rect(c,19,24,202,12,'#334d67');
rect(c,28,44,32,88,'#e2e8ea');
rect(c,78,79,50,19,'#c0d9bd');
rect(c,151,54,48,16,'#cbdeed');
rect(c,151,105,48,16,'#e4d2e7');
rect(c,127,87,12,2,'#7b93a0');
rect(c,138,62,2,52,'#7b93a0');
rect(c,139,62,12,2,'#7b93a0');
rect(c,139,112,12,2,'#7b93a0');
for(let i=0;
i<6;
i++)rect(c,32,51+i*11,22-(i%2)*7,2,'#8799a5')}
if(type==='flow'){const colors=['#e8bf77','#adc2d0','#b5ca9e'];
for(let i=0;
i<3;
i++){let x=17+i*74;
rect(c,x,37,59,85,'#fff8e8');
rect(c,x+6,44,47,6,colors[i]);
for(let j=0;
j<3;
j++){rect(c,x+6,61+j*17,47,12,colors[i]);
rect(c,x+11,65+j*17,26,2,'#5b6054')}}}
if(type==='chart'){rect(c,14,22,211,118,'#fffdf8');
rect(c,14,22,211,12,'#5b5770');
for(let i=0;
i<7;
i++){let h=[18,29,24,43,33,55,68][i];
rect(c,30+i*14,120-h,8,h,i%2?'#a798bb':'#6e819d')}rect(c,141,47,68,3,'#b6adc6');
for(let i=0;
i<4;
i++)rect(c,143+i*5,60+i*16,62-i*10,10,['#7f8baa','#a19aba','#b8adca','#d6c8df'][i])}
if(type==='content'){for(let i=0;
i<3;
i++){let x=21+i*67;
rect(c,x,29+i*5,59,99,'#fff8f3');
rect(c,x+5,35+i*5,49,10,['#b8685d','#9a887e','#648879'][i]);
rect(c,x+8,54+i*5,43,36,['#e2b8ac','#e0d4bb','#c0d5bf'][i]);
for(let j=0;
j<3;
j++)rect(c,x+8,99+i*5+j*6,38-j*7,2,'#a38a81')}}
}
