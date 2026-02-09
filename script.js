// ---------- AUTH ----------
function showLogin(){document.getElementById('login-form').style.display='block';}

let currentUser = '';

function signup(){
  const user = document.getElementById('signup-user').value;
  const pass = document.getElementById('signup-pass').value;
  if(user && pass){alert(`Account created for ${user}`); showLogin();}
  else alert("Please fill all fields");
}

function login(){
  const user = document.getElementById('login-user').value;
  const pass = document.getElementById('login-pass').value;
  if(user && pass){
    currentUser=user;
    document.getElementById('auth-page').style.display='none';
    document.getElementById('dashboard-page').style.display='flex';
    document.getElementById('settings-user').innerText=currentUser;
  }
  else alert("Please fill all fields");
}

function logout(){
  currentUser='';
  document.getElementById('dashboard-page').style.display='none';
  document.getElementById('auth-page').style.display='flex';
  showLogin();
}

// ---------- SECTIONS ----------
function showSection(id){
  const sections=['dashboard','live','pollution','alerts','settings'];
  sections.forEach(s=>document.getElementById(s).style.display='none');
  document.getElementById(id).style.display='block';
}

// ---------- SMOG DATA ----------
let smogLevel = 0;
let historyData=[];
const sensorCount = 1;
document.getElementById('sensor-count').innerText=sensorCount;

function updateSmog(){
  smogLevel = Math.floor(Math.random()*200);
  historyData.unshift({time:new Date().toLocaleTimeString(), value:smogLevel});
  if(historyData.length>20) historyData.pop();
  document.getElementById('smog-level').innerText=smogLevel;
  updateDashboard();
  updateHistory();
  updateAlerts();
  updateChart();
}

function updateDashboard(){
  const values = historyData.map(h=>h.value);
  const avg = Math.round(values.reduce((a,b)=>a+b,0)/values.length);
  const max = Math.max(...values);
  document.getElementById('avg-smog').innerText=avg;
  document.getElementById('max-smog').innerText=max;
  document.getElementById('avg-pollution').innerText=avg;
  document.getElementById('max-pollution').innerText=max;
}

function updateHistory(){
  const list=document.getElementById('history-list');
  list.innerHTML='';
  historyData.forEach(h=>{
    const li=document.createElement('li');
    li.textContent=`${h.time} → ${h.value} μg/m³`;
    list.appendChild(li);
  });
}

function updateAlerts(){
  const alertDiv=document.getElementById('alerts-content');
  alertDiv.innerHTML='';
  const alerts=historyData.filter(h=>h.value>150);
  document.getElementById('alert-count').innerText=alerts.length;
  alerts.forEach(a=>{
    const p=document.createElement('p');
    p.textContent=`High Smog Alert! ${a.time} → ${a.value} μg/m³`;
    alertDiv.appendChild(p);
  });
}

// ---------- CHART ----------
const ctx=document.getElementById('smogChart').getContext('2d');
const smogChart=new Chart(ctx,{
  type:'line',
  data:{
    labels:[],
    datasets:[{
      label:'Smog Level (μg/m³)',
      data:[],
      borderColor:'#007bff',
      fill:false
    }]
  },
  options:{responsive:true, animation:false, scales:{y:{beginAtZero:true}}}
});

function updateChart(){
  smogChart.data.labels=historyData.map(h=>h.time).reverse();
  smogChart.data.datasets[0].data=historyData.map(h=>h.value).reverse();
  smogChart.update();
}

// Update every 5 seconds
setInterval(updateSmog,5000);
updateSmog();
const bar = document.getElementById('smog-bar');
const percent = Math.min((smogLevel / 200) * 100, 100);
bar.style.width = percent + '%';

if (smogLevel < 50) bar.style.background = '#2ecc71';
else if (smogLevel < 100) bar.style.background = '#f1c40f';
else if (smogLevel < 150) bar.style.background = '#e67e22';
else bar.style.background = '#e74c3c';
setInterval(updateSmog, 5000);
updateSmog();
