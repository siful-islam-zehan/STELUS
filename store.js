// STELUS static storefront for GitHub Pages.
// Orders are prepared as a WhatsApp message; this static site does not store orders or process payments.
const PRODUCTS = [
  {id:1,name:"After Dark Graphic Tee",category:"streetwear",description:"Heavyweight everyday statement tee.",price:450,tag:"BESTSELLER",image:"./img/after-dark.svg"},
  {id:2,name:"Cursed Energy Tee",category:"anime",description:"Anime-inspired concept graphic tee.",price:450,tag:"FAN FAVOURITE",image:"./img/cursed-energy.svg"},
  {id:3,name:"Purple Haze Oversized",category:"streetwear",description:"Relaxed drop-shoulder fit.",price:450,tag:"NEW DROP",image:"./img/purple-haze.svg"},
  {id:4,name:"Your Art Custom Tee",category:"custom",description:"Custom print enquiry listing.",price:375,tag:"CUSTOM PRINT",image:"./img/custom.svg"}
];
const WHATSAPP_NUMBER = "8801XXXXXXXXX"; // Replace with your store WhatsApp number, digits only.
let products = [...PRODUCTS];
let cart = JSON.parse(sessionStorage.getItem("stelusCart") || "[]");
const $ = s => document.querySelector(s);
const money = n => "৳" + Number(n || 0).toLocaleString("en-BD");
function esc(s){return String(s ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function toast(s){$("#toast").textContent=s;$("#toast").classList.add("show");setTimeout(()=>$("#toast").classList.remove("show"),2200);}
function saveCart(){sessionStorage.setItem("stelusCart",JSON.stringify(cart));}
function loadProducts(filter="all"){
  products=PRODUCTS.filter(p=>filter==="all"||p.category===filter);
  $("#products").innerHTML=products.map(p=>`<article class="product"><div class="productArt"><img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy"><b class="tag">${esc(p.tag)}</b><button class="add" type="button" onclick="addItem(${p.id})">ADD TO BAG +</button></div><div class="productInfo"><div><h3>${esc(p.name)}</h3><small>${esc(p.description)}</small></div><strong>${money(p.price)}</strong></div></article>`).join("") || '<p>No products in this collection yet.</p>';
}
function addItem(id){
  const p=PRODUCTS.find(x=>x.id===id); if(!p)return;
  const row=cart.find(x=>x.product_id===id);
  if(row)row.qty++;else cart.push({product_id:id,qty:1,size:"L",name:p.name,price:p.price});
  saveCart();renderCart();toast("Added to your bag");
}
function renderCart(){
  $("#bagCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
  $("#cartItems").innerHTML=cart.length?cart.map((x,i)=>`<div class="cartRow"><div><b>${esc(x.name)}</b><small>${money(x.price)} each</small><select aria-label="Size for ${esc(x.name)}" onchange="setSize(${i},this.value)"><option value="M" ${x.size==="M"?"selected":""}>M</option><option value="L" ${x.size==="L"?"selected":""}>L</option><option value="XL" ${x.size==="XL"?"selected":""}>XL</option><option value="XXL" ${x.size==="XXL"?"selected":""}>XXL</option></select></div><div><b>${money(x.price*x.qty)}</b><p><button type="button" onclick="qty(${i},-1)">−</button> ${x.qty} <button type="button" onclick="qty(${i},1)">+</button> <button type="button" onclick="removeItem(${i})">Remove</button></p></div></div>`).join(""):'<p>Your bag is waiting for something good.</p>';
  $("#subtotal").textContent=money(cart.reduce((s,x)=>s+x.price*x.qty,0));
}
window.setSize=(i,size)=>{if(cart[i])cart[i].size=size;saveCart();};
window.qty=(i,d)=>{if(!cart[i])return;cart[i].qty+=d;if(cart[i].qty<1)cart.splice(i,1);saveCart();renderCart();};
window.removeItem=i=>{cart.splice(i,1);saveCart();renderCart();};
$("#bagBtn").addEventListener("click",()=>$("#cartModal").classList.add("open"));
$("#closeCart").addEventListener("click",()=>$("#cartModal").classList.remove("open"));
$("#closeCheckout").addEventListener("click",()=>$("#checkoutModal").classList.remove("open"));
$("#checkout").addEventListener("click",()=>{if(!cart.length)return toast("Add a product first");$("#cartModal").classList.remove("open");$("#checkoutModal").classList.add("open");});
$("#orderForm").addEventListener("submit",e=>{
  e.preventDefault();
  const f=new FormData(e.target);
  const name=f.get("customer_name"),phone=f.get("phone"),address=f.get("address");
  const lines=cart.map(x=>`• ${x.name} | Size: ${x.size} | Qty: ${x.qty} | ${money(x.price*x.qty)}`).join("\n");
  const total=cart.reduce((s,x)=>s+x.price*x.qty,0);
  const message=`STELUS ORDER ENQUIRY\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\n\nItems:\n${lines}\n\nSubtotal: ${money(total)}\n\nPlease confirm availability and delivery.`;
  if(WHATSAPP_NUMBER.includes("X")) {
    const url=`https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url,"_blank","noopener");
    toast("Opening WhatsApp to send your order");
  } else {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,"_blank","noopener");
    toast("Opening WhatsApp to send your order");
  }
  cart=[];sessionStorage.removeItem("stelusCart");renderCart();$("#checkoutModal").classList.remove("open");e.target.reset();
});
document.querySelectorAll("[data-filter]").forEach(b=>b.addEventListener("click",()=>{
  document.querySelectorAll("[data-filter]").forEach(x=>x.classList.remove("active"));
  b.classList.add("active");loadProducts(b.dataset.filter);
}));
for(let i=0;i<14;i++){const p=document.createElement("i");p.className="petal";p.style.cssText=`left:${Math.random()*100}%;animation-duration:${8+Math.random()*10}s;animation-delay:${-Math.random()*14}s;font-size:${10+Math.random()*12}px`;p.textContent="✿";document.body.appendChild(p);}
loadProducts();renderCart();
