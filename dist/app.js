'use strict';
const config=window.SABRINA_CONFIG||{};
const instagram='https://www.instagram.com/'+encodeURIComponent(config.instagram||'drasabrinasoylla')+'/';
const phone=String(config.whatsapp||'').replace(/\D/g,'');
const contact=phone?'https://wa.me/'+phone+'?text='+encodeURIComponent(config.message||'Olá! Gostaria de agendar uma avaliação.'):instagram;
document.querySelectorAll('[data-contact]').forEach(a=>{a.href=contact;a.target='_blank';a.rel='noopener noreferrer';});
document.querySelectorAll('[data-instagram]').forEach(a=>a.href=instagram);
if(phone){const el=document.getElementById('phone-display');const a=document.createElement('a');a.href=contact;a.textContent='+55 69 9219-8982';a.target='_blank';a.rel='noopener noreferrer';el.append(a);el.hidden=false;}
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
function render(){const items=filtered();gallery.replaceChildren();items.slice(0,limit).forEach((item,i)=>{const button=document.createElement('button');button.type='button';button.className='result-card';button.dataset.category=item.category;button.setAttribute('aria-label','Ampliar '+item.title+', registro '+(i+1));const wrap=document.createElement('div');wrap.className='result-photo';const img=document.createElement('img');img.src=item.src;img.alt='Registro comparativo de '+item.title;img.loading='lazy';img.decoding='async';img.width=450;img.height=600;const tag=document.createElement('span');tag.textContent='Ver comparação ↗';wrap.append(img,tag);const h=document.createElement('h3');h.textContent=item.title;const p=document.createElement('p');p.textContent='Um cuidado individual, em cada detalhe.';button.append(wrap,h,p);button.addEventListener('click',()=>openImage(i,button));gallery.append(button);});more.hidden=limit>=items.length;document.getElementById('gallery-status').textContent=Math.min(limit,items.length)+' de '+items.length+' registros exibidos.';}
function setFilter(value){filter=value;limit=3;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===filter)));render();}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.filter)));
document.querySelectorAll('[data-treatment]').forEach(a=>a.addEventListener('click',()=>setFilter(a.dataset.treatment)));
more.addEventListener('click',()=>{const previous=limit;limit+=6;render();gallery.children[previous]?.focus({preventScroll:true});});
function updateImage(){const items=filtered();const item=items[index];document.getElementById('lightbox-title').textContent=item.title;const image=document.getElementById('lightbox-image');image.src=item.src;image.alt='Comparação completa — '+item.title;document.getElementById('lightbox-count').textContent=(index+1)+' / '+items.length;document.getElementById('previous-image').disabled=items.length<2;document.getElementById('next-image').disabled=items.length<2;}
function openImage(i,button){index=i;opener=button;updateImage();dialog.showModal();document.body.classList.add('modal-open');}
function next(delta){index=(index+delta+filtered().length)%filtered().length;updateImage();}
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
