const plans=[
{id:'push',day:'شنبه',name:'فشار + میان‌تنه',items:[['شنا',3,'۶ تا ۱۰'],['شنا پایک',3,'۵ تا ۸'],['شنا دست روی سطح بلند',2,'۱۰ تا ۱۲'],['دیپ نیمکت',2,'۸ تا ۱۰'],['پلانک',3,'۳۰ ثانیه'],['هالو بادی هولد',3,'۲۰ ثانیه']]},
{id:'pull',day:'دوشنبه',name:'کشش + میان‌تنه',items:[['بارفیکس با کمک کش',3,'۵ تا ۸'],['پارویی با کش',3,'۸ تا ۱۲'],['اسکاپولار پول‌آپ',2,'۶ تا ۸'],['فیس پول با کش',3,'۱۲ تا ۱۵'],['بالا آوردن زانو از بار',3,'۸ تا ۱۲'],['ددباگ',2,'۱۰ تکرار']]},
{id:'legs',day:'چهارشنبه',name:'پا + کل بدن',items:[['اسکوات وزن بدن',3,'۱۲ تا ۱۵'],['لانج معکوس',3,'۸ هر پا'],['پل باسن',3,'۱۲'],['ساق پا',3,'۱۵'],['برپی بدون پرش',2,'۶ تا ۸'],['پیشرفت ال‌سیت',3,'۱۰ تا ۱۵ ثانیه']]}
];
const $=s=>document.querySelector(s);let current=null,seconds=90,interval=null;
function renderDays(){ $('#days').innerHTML=plans.map(p=>`<button class="day ${current===p.id?'active':''}" data-id="${p.id}"><b>${p.day}</b>${p.name}</button>`).join(''); }
function renderSession(){const p=plans.find(x=>x.id===current);if(!p){$('#session').innerHTML='<div class="empty">برای شروع، یکی از روزهای تمرین را انتخاب کن.</div>';return;}$('#session').innerHTML=`<div class="panel"><div class="workout-title"><div><small class="muted">${p.day}</small><h2>${p.name}</h2></div><span class="done" id="count">۰ از ${p.items.reduce((a,x)=>a+x[1],0)} ست</span></div><div class="progress"><span id="bar"></span></div></div>`+p.items.map((it,i)=>`<article class="exercise"><h3>${it[0]}</h3><div class="target">هدف: ${it[1]} ست × ${it[2]}</div><div class="sets">${Array.from({length:it[1]},(_,j)=>`<label class="set"><input type="checkbox" class="check"> ست ${j+1}</label>`).join('')}</div><input type="text" placeholder="یادداشت موقت (اختیاری)" aria-label="یادداشت ${it[0]}"></article>`).join('');document.querySelectorAll('.check').forEach(c=>c.addEventListener('change',updateProgress));updateProgress();}
function updateProgress(){let all=[...document.querySelectorAll('.check')],n=all.filter(x=>x.checked).length;$('#count').textContent=`${n} از ${all.length} ست`;$('#bar').style.width=(all.length?n/all.length*100:0)+'%';}
$('#days').addEventListener('click',e=>{let b=e.target.closest('[data-id]');if(!b)return;current=b.dataset.id;renderDays();renderSession();});
function show(){let m=String(Math.floor(seconds/60)).padStart(2,'0'),s=String(seconds%60).padStart(2,'0');$('#clock').textContent=`${m}:${s}`;}
$('#start').onclick=()=>{if(interval)return;interval=setInterval(()=>{if(seconds>0){seconds--;show();}else{clearInterval(interval);interval=null; if(navigator.vibrate)navigator.vibrate(200);}},1000);};
$('#pause').onclick=()=>{clearInterval(interval);interval=null;};$('#reset').onclick=()=>{clearInterval(interval);interval=null;seconds=90;show();};
renderDays();renderSession();show();
