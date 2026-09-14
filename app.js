const hostels=[
{name:"Tesano Comfort",area:"Tesano",price:2500,location:"Near GCTU Gate",type:"Self-contain"},
{name:"Abeka VIP",area:"Abeka",price:2000,location:"Abeka Junction",type:"Chamber & Hall"},
{name:"Abelemkpe Luxury",area:"Abelemkpe",price:3500,location:"Abelemkpe - 5min drive",type:"Self-contain"},
{name:"Achimota Lodge",area:"Achimota",price:1800,location:"New Station",type:"Single Room"},
{name:"Staff Area Hostel",area:"Tesano",price:3000,location:"Tesano Staff Area",type:"Chamber & Hall Self-contain"}
];
function display(list){
const c=document.getElementById("hostelList");c.innerHTML="";
if(list.length==0){c.innerHTML="<p>No hostels found</p>";return;}
list.forEach(h=>{c.innerHTML+=`<div class="card"><h3>${h.name}</h3><p><b>Area:</b> ${h.area}</p><p><b>Location:</b> ${h.location}</p><p><b>Type:</b> ${h.type}</p><p><b>Price:</b> GHS ${h.price}</p><button onclick="alert('Contact: 024XXXXXXX')">Contact</button></div>`});
}
function filterHostels(){
const area=document.getElementById("areaFilter").value;
const max=document.getElementById("priceFilter").value;
let f=hostels;
if(area!="all") f=f.filter(h=>h.area==area);
if(max) f=f.filter(h=>h.price<=parseInt(max));
display(f);
}
display(hostels);
