'use strict';
const config=window.SABRINA_CONFIG||{};
const instagram='https://www.instagram.com/'+encodeURIComponent(config.instagram||'drasabrinasoylla')+'/';
const phone=String(config.whatsapp||'').replace(/\D/g,'');
const contact=phone?'https://wa.me/'+phone+'?text='+encodeURIComponent(config.message||'Olá! Gostaria de agendar uma avaliação.'):instagram;
document.querySelectorAll('[data-contact]').forEach(a=>{a.href=contact;a.target='_blank';a.rel='noopener noreferrer';});
document.querySelectorAll('[data-instagram]').forEach(a=>a.href=instagram);
if(phone){const el=document.getElementById('phone-display');const a=document.createElement('a');a.href=contact;a.textContent='+55 69 99269-2567';a.target='_blank';a.rel='noopener noreferrer';el.append(a);el.hidden=false;}
if(config.cro){const el=document.getElementById('cro-display');el.textContent=config.cro;el.hidden=false;}
document.getElementById('year').textContent=new Date().getFullYear();
const toggle=document.querySelector('.menu-toggle');const nav=document.getElementById('navigation');
function closeMenu(){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');nav.classList.toggle('is-open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('click',e=>{if(!e.target.closest('.header'))closeMenu();});
const photos=window.SABRINA_GALLERY||[];let filter='todos',limit=3,index=0,opener=null;
const gallery=document.getElementById('gallery');const more=document.getElementById('load-more');const dialog=document.getElementById('lightbox');
function filtered(){return photos.filter(p=>filter==='todos'||p.category===filter);}
function render(){const items=filtered();gallery.replaceChildren();items.slice(0,limit).forEach((item,i)=>{const button=document.createElement('button');button.type='button';button.className='result-card';button.dataset.category=item.category;button.setAttribute('aria-label','Ampliar '+item.title+', registro '+(i+1));const wrap=document.createElement('div');wrap.className='result-photo';const img=document.createElement('img');img.src=item.src;img.alt='Registro comparativo de '+item.title;img.loading='lazy';img.decoding='async';img.width=450;img.height=600;const tag=document.createElement('span');tag.textContent='Ver comparação ↗';wrap.append(img,tag);const h=document.createElement('h3');h.textContent=item.title;const p=document.createElement('p');p.textContent='Um cuidado individual, em cada detalhe.';button.append(wrap,h,p);button.addEventListener('click',()=>openImage(i,button));gallery.append(button);});more.hidden=limit>=items.length;const label=filter==='todos'?'Todos os tratamentos':document.querySelector('[data-filter="'+filter+'"]').textContent;document.getElementById('gallery-status').textContent=label+' · '+Math.min(limit,items.length)+' de '+items.length+' registros';}
function setFilter(value){filter=value;limit=3;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===filter)));render();}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.filter)));
document.querySelectorAll('[data-treatment]').forEach(a=>a.addEventListener('click',()=>setFilter(a.dataset.treatment)));
more.addEventListener('click',()=>{const previous=limit;limit+=6;render();gallery.children[previous]?.focus({preventScroll:true});});
let lightboxItems=[];
function updateImage(){const items=lightboxItems;const item=items[index];document.getElementById('lightbox-title').textContent=item.title;const image=document.getElementById('lightbox-image');image.src=item.src;image.alt='Comparação completa — '+item.title;document.getElementById('lightbox-count').textContent=(index+1)+' / '+items.length;document.getElementById('previous-image').disabled=items.length<2;document.getElementById('next-image').disabled=items.length<2;}
function openImage(i,button,items=filtered()){lightboxItems=items;index=i;opener=button;updateImage();dialog.showModal();document.body.classList.add('modal-open');}
function next(delta){index=(index+delta+lightboxItems.length)%lightboxItems.length;updateImage();}
document.getElementById('close-lightbox').addEventListener('click',()=>dialog.close());
document.getElementById('previous-image').addEventListener('click',()=>next(-1));
document.getElementById('next-image').addEventListener('click',()=>next(1));
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');opener?.focus({preventScroll:true});});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();if(dialog.open&&e.key==='ArrowRight'){e.preventDefault();next(1);}if(dialog.open&&e.key==='ArrowLeft'){e.preventDefault();next(-1);}});
render();

// Destaque da seção atual e fechamento do menu ao voltar ao desktop.
const navigationLinks=[...nav.querySelectorAll('a[href^="#"]')];
if('IntersectionObserver' in window){
 const visibleSections=new Map();
 const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>visibleSections.set(entry.target.id,entry));
  const current=[...visibleSections.values()].filter(entry=>entry.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];
  if(current) navigationLinks.forEach(link=>{if(link.hash==='#'+current.target.id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
 },{rootMargin:'-80px 0px -45% 0px',threshold:0});
 navigationLinks.forEach(link=>{const section=document.querySelector(link.hash);if(section)observer.observe(section);});
}
window.matchMedia('(min-width: 801px)').addEventListener('change',event=>{if(event.matches)closeMenu();});

// O painel apenas oferece o acesso ao WhatsApp; não simula atendimento ao vivo.
const chatToggle=document.getElementById('chat-toggle');
const chatPanel=document.getElementById('whatsapp-chat');
const chatClose=document.getElementById('chat-close');
function setChat(open,restoreFocus=true){
 chatPanel.hidden=!open;
 chatToggle.setAttribute('aria-expanded',String(open));
 chatToggle.setAttribute('aria-label',open?'Fechar conversa':'Abrir conversa com a Dra. Sabrina');
 if(open)chatClose.focus({preventScroll:true});else if(restoreFocus)chatToggle.focus({preventScroll:true});
}
chatToggle.addEventListener('click',()=>setChat(chatPanel.hidden));
chatClose.addEventListener('click',()=>setChat(false));
document.getElementById('chat-later').addEventListener('click',()=>setChat(false));
chatPanel.querySelector('[data-contact]').addEventListener('click',()=>setChat(false));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!chatPanel.hidden)setChat(false);});
document.addEventListener('click',e=>{if(!chatPanel.hidden&&!chatPanel.contains(e.target)&&!chatToggle.contains(e.target))setChat(false,false);});

// Galeria horizontal independente: filtros locais, toque e navegação por teclado.
const protocolTrack=document.getElementById('protocol-track');
const protocolPrev=document.getElementById('protocol-prev');
const protocolNext=document.getElementById('protocol-next');
const protocolOrder=['6782','4928','1439','7840','6790','9483','7456','9975'];
const protocolPhotos=protocolOrder.map(id=>photos.find(photo=>photo.src.includes(id))).filter(Boolean);
const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
let protocolItems=[];
function updateProtocolControls(){
 const max=Math.max(0,protocolTrack.scrollWidth-protocolTrack.clientWidth);
 protocolPrev.disabled=protocolTrack.scrollLeft<=2;
 protocolNext.disabled=protocolTrack.scrollLeft>=max-2;
}
function renderProtocols(category='todos'){
 protocolItems=protocolPhotos.filter(item=>category==='todos'||item.category===category);
 protocolTrack.replaceChildren();
 protocolItems.forEach((item,i)=>{
  const card=document.createElement('button');card.type='button';card.className='protocol-card';
  card.setAttribute('aria-label','Ampliar comparação de '+item.title+', '+(i+1)+' de '+protocolItems.length);
  const frame=document.createElement('div');frame.className='protocol-image';
  const img=document.createElement('img');img.src=item.src;img.alt='Comparação completa de '+item.title;img.loading='lazy';img.decoding='async';img.width=600;img.height=800;
  frame.append(img);
  const caption=document.createElement('div');caption.className='protocol-caption';
  const title=document.createElement('h3');title.textContent=item.title;
  const label=document.createElement('span');label.textContent='Ver comparação ↗';caption.append(title,label);
  card.append(frame,caption);card.addEventListener('click',()=>openImage(i,card,protocolItems));protocolTrack.append(card);
 });
 document.querySelectorAll('[data-protocol-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.protocolFilter===category)));
 document.getElementById('protocol-status').textContent=protocolItems.length+' comparações disponíveis';
 protocolTrack.scrollLeft=0;requestAnimationFrame(updateProtocolControls);
}
function moveProtocols(direction){
 const card=protocolTrack.firstElementChild;if(!card)return;
 const gap=parseFloat(getComputedStyle(protocolTrack).columnGap)||0;
 protocolTrack.scrollBy({left:direction*(card.getBoundingClientRect().width+gap),behavior:motionPreference.matches?'instant':'smooth'});
}
protocolPrev.addEventListener('click',()=>moveProtocols(-1));protocolNext.addEventListener('click',()=>moveProtocols(1));
protocolTrack.addEventListener('scroll',updateProtocolControls,{passive:true});
protocolTrack.addEventListener('keydown',event=>{
 if(event.target!==protocolTrack)return;
 if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();moveProtocols(event.key==='ArrowRight'?1:-1);}
});
document.querySelectorAll('[data-protocol-filter]').forEach(button=>button.addEventListener('click',()=>renderProtocols(button.dataset.protocolFilter)));
window.addEventListener('resize',updateProtocolControls,{passive:true});
renderProtocols();
// Parallax limitado ao retrato, sem movimentar ou distorcer comparações clínicas.
const heroPortrait=document.querySelector('.hero-image img');
const parallaxDesktop=window.matchMedia('(min-width: 801px)');
let parallaxFrame=0;
function updateParallax(){
 parallaxFrame=0;
 if(motionPreference.matches||!parallaxDesktop.matches){heroPortrait.style.transform='';return;}
 const bounds=document.getElementById('inicio').getBoundingClientRect();
 const offset=Math.max(-12,Math.min(12,-bounds.top*.035));
 heroPortrait.style.transform='translateY('+offset+'px) scale(1.055)';
}
function requestParallax(){if(!parallaxFrame)parallaxFrame=requestAnimationFrame(updateParallax);}
window.addEventListener('scroll',requestParallax,{passive:true});
motionPreference.addEventListener('change',requestParallax);parallaxDesktop.addEventListener('change',requestParallax);requestParallax();
