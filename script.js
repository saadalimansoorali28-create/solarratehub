document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);
  const billInput=$("bill"),sizeInput=$("size"),calculateBtn=$("calculate"),annualEl=$("annual"),costEl=$("cost"),paybackEl=$("payback");
  const money=v=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(Math.round(v));
  const currencyLabel=billInput?.closest(".input-wrap")?.querySelector("span");
  if(currencyLabel)currencyLabel.textContent="$";
  if(billInput&&(!billInput.value||Number(billInput.value)>=10000))billInput.value="300";
  function calculate(){if(!billInput||!sizeInput||!annualEl||!costEl||!paybackEl)return;const bill=Math.max(0,Number(billInput.value)||0),size=Number(sizeInput.value),coverage={3:.45,5:.65,10:.85,15:.95}[size]||0,s=bill*12*coverage,c=size*3150,p=s>0?c/s:0;annualEl.textContent=money(s);costEl.textContent=money(c);paybackEl.textContent=p?p.toFixed(1)+" years":"—"}
  if(calculateBtn)calculateBtn.addEventListener("click",calculate);if(billInput)billInput.addEventListener("input",calculate);if(sizeInput)sizeInput.addEventListener("change",calculate);
  const year=$("year");if(year)year.textContent=new Date().getFullYear();
  const menuToggle=$("menuToggle"),siteMenu=$("siteMenu"),menuClose=$("menuClose"),menuOverlay=$("menuOverlay");
  function closeMenu(){if(!siteMenu)return;siteMenu.classList.remove("open");if(menuOverlay)menuOverlay.classList.remove("open");siteMenu.setAttribute("aria-hidden","true");if(menuToggle){menuToggle.setAttribute("aria-expanded","false");menuToggle.setAttribute("aria-label","Open website menu")}document.body.classList.remove("menu-open")}
  function openMenu(){if(!siteMenu)return;siteMenu.classList.add("open");if(menuOverlay)menuOverlay.classList.add("open");siteMenu.setAttribute("aria-hidden","false");if(menuToggle){menuToggle.setAttribute("aria-expanded","true");menuToggle.setAttribute("aria-label","Close website menu")}document.body.classList.add("menu-open")}
  closeMenu();if(menuToggle)menuToggle.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();siteMenu&&siteMenu.classList.contains("open")?closeMenu():openMenu()});if(menuClose)menuClose.addEventListener("click",e=>{e.preventDefault();closeMenu()});if(menuOverlay)menuOverlay.addEventListener("click",closeMenu);if(siteMenu)siteMenu.querySelectorAll("a").forEach(link=>link.addEventListener("click",closeMenu));
  const searchToggle=$("searchToggle"),searchPanel=$("searchPanel"),siteSearch=$("siteSearch"),searchClear=$("searchClear"),searchStatus=$("searchStatus"),menuSearch=$("menuSearch"),articleCards=[...document.querySelectorAll(".article-card")],emptySearch=$("emptySearch");
  function closeSearch(){if(!searchPanel)return;searchPanel.classList.remove("open");searchPanel.setAttribute("aria-hidden","true");if(searchToggle){searchToggle.setAttribute("aria-expanded","false");searchToggle.setAttribute("aria-label","Open search")}}
  function openSearch(){if(!searchPanel)return;searchPanel.classList.add("open");searchPanel.setAttribute("aria-hidden","false");if(searchToggle){searchToggle.setAttribute("aria-expanded","true");searchToggle.setAttribute("aria-label","Close search")}requestAnimationFrame(()=>siteSearch&&siteSearch.focus())}
  let filterFrame=0;function filterArticles(query){cancelAnimationFrame(filterFrame);filterFrame=requestAnimationFrame(()=>{const q=query.trim().toLowerCase();let shown=0;[...document.querySelectorAll(".article-card")].forEach(card=>{const text=((card.dataset.search||"")+" "+card.textContent).toLowerCase(),match=!q||text.includes(q);card.hidden=!match;if(match)shown++});if(emptySearch)emptySearch.hidden=shown!==0||!q;if(searchStatus)searchStatus.textContent=q?shown+" article"+(shown===1?"":"s")+" found.":"Search the latest solar guides and categories."})}
  if(searchToggle)searchToggle.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();searchPanel&&searchPanel.classList.contains("open")?closeSearch():openSearch()});if(siteSearch)siteSearch.addEventListener("input",e=>filterArticles(e.target.value));if(searchClear)searchClear.addEventListener("click",()=>{if(!siteSearch)return;siteSearch.value="";filterArticles("");siteSearch.focus()});if(menuSearch&&siteMenu)menuSearch.addEventListener("input",e=>{const q=e.target.value.trim().toLowerCase();siteMenu.querySelectorAll(".menu-section a").forEach(link=>link.hidden=!!q&&!link.textContent.toLowerCase().includes(q))});document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeMenu();closeSearch()}});window.addEventListener("pageshow",()=>{closeMenu();closeSearch()});
  const homeMain=document.querySelector("main#home"),heroSection=document.querySelector(".hero"),latestSection=document.querySelector("#latest");
  if(homeMain&&heroSection&&!document.querySelector("#inverter-hub-home")){const section=document.createElement("section");section.id="inverter-hub-home";section.className="section";section.innerHTML=`<div class="container"><div class="section-heading"><div><p class="eyebrow">INVERTER HUB</p><h2>Latest Solar Inverter Models</h2></div><p>Explore inverter specifications, current USA price references and detailed model pages.</p></div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px"><a href="/eg4-6000xp.html" style="text-decoration:none;color:inherit;border:1px solid #e5eae7;border-radius:18px;overflow:hidden;background:#fff;box-shadow:0 8px 28px rgba(20,35,29,.05)"><img src="EG4-6000XP-All-In-One-Off-Grid-Inverter-Front.webp" alt="EG4 6000XP All-In-One Off-Grid Inverter" loading="lazy" style="width:100%;height:190px;object-fit:contain;background:#f5f8f6;display:block"><div style="padding:20px"><span class="tag">EG4</span><h3>EG4 6000XP</h3><p>6kW · 48V · dual MPPT · up to 8kW PV input</p><strong style="color:#16834b">$1,449.99 USD reference</strong><p style="color:#16834b;font-weight:700">View model →</p></div></a><a href="/eg4-12000xp.html" style="text-decoration:none;color:inherit;border:1px solid #e5eae7;border-radius:18px;overflow:hidden;background:#fff;box-shadow:0 8px 28px rgba(20,35,29,.05)"><img src="EG4-12000XP-All-In-One-Off-Grid-Inverter-Open.webp" alt="EG4 12000XP V2 All-In-One Off-Grid Inverter" loading="lazy" style="width:100%;height:190px;object-fit:contain;background:#f5f8f6;display:block"><div style="padding:20px"><span class="tag">EG4</span><h3>EG4 12000XP V2</h3><p>12kW · 48V · dual MPPT · up to 24kW PV input</p><strong style="color:#16834b">$1,899.99 USD reference</strong><p style="color:#16834b;font-weight:700">View model →</p></div></a><a href="/eg4-12kpv.html" style="text-decoration:none;color:inherit;border:1px solid #e5eae7;border-radius:18px;overflow:hidden;background:#fff;box-shadow:0 8px 28px rgba(20,35,29,.05)"><img src="EG4-12kPV-All-In-One-Hybrid-Inverter-Right-Tilt.webp" alt="EG4 12kPV All-In-One Hybrid Inverter" loading="lazy" style="width:100%;height:190px;object-fit:contain;background:#f5f8f6;display:block"><div style="padding:20px"><span class="tag">EG4</span><h3>EG4 12kPV</h3><p>Hybrid · 8kW continuous output · 12kW solar input</p><strong style="color:#16834b">$2,949.99 USD reference</strong><p style="color:#16834b;font-weight:700">View model →</p></div></a></div><div style="margin-top:18px"><a class="primary-btn" href="/inverters.html">Open Full Inverter Hub →</a></div></div>`;heroSection.insertAdjacentElement("afterend",section)}
  const inverterCategory=$("inverters"),newsCategory=$("news"),batteryCategory=$("batteries"),guideCategory=$("guides");if(inverterCategory)inverterCategory.href="/inverters.html";if(newsCategory)newsCategory.href="/solar-news.html";if(batteryCategory)batteryCategory.href="/solar-batteries.html";if(guideCategory)guideCategory.href="/solar-inverter-guides.html";
  if(siteMenu){siteMenu.querySelectorAll('a[href="#solar-panels"]').forEach(link=>link.href="/solar-panel-prices.html");siteMenu.querySelectorAll('a[href="#inverters"]').forEach(link=>link.href="/inverters.html");siteMenu.querySelectorAll('a[href="#accessories"]').forEach(link=>link.href="/solar-accessories.html");siteMenu.querySelectorAll('a[href="#systems"]').forEach(link=>link.href="/solar-system-prices.html");siteMenu.querySelectorAll('a[href="#batteries"]').forEach(link=>link.href="/solar-battery-price-usa-2026/");siteMenu.querySelectorAll('a[href="#guides"]').forEach(link=>link.href="/solar-inverter-guides.html");siteMenu.querySelectorAll('a[href="#news"]').forEach(link=>link.href="/solar-news.html")}
  if(latestSection&&!document.querySelector("#aug30-singapore-solar-card")){const card=document.createElement("article");card.className="article-card";card.id="aug30-singapore-solar-card";card.dataset.search="solar panel price Singapore today August 30 2026 daily solar rate Singapore solar panel rates AIKO Jinko Trina LONGi REC";card.innerHTML=`<img src="1788025390237.png" alt="Solar panel price in Singapore today August 30 2026" loading="lazy"><div class="article-body"><span class="tag">Singapore Solar Prices</span><h3>Solar Panel Price in Singapore Today — August 30, 2026</h3><p>Compare daily solar rate references for AIKO, Jinko Solar, Trina Solar, LONGi and REC panels in Singapore dollars.</p><a href="/solar-panel-price-singapore-august-30-2026.html">Read article →</a></div>`;const grid=latestSection.querySelector("#articleGrid");if(grid)grid.prepend(card)}
  if(latestSection&&!document.querySelector("#aug29-solar-rate-card")){const card=document.createElement("article");card.className="article-card";card.id="aug29-solar-rate-card";card.dataset.search="solar panel price today August 29 2026 LONGi Canadian Solar JA Solar Inverex solar rate";card.innerHTML=`<img src="solarrate.png" alt="Solar panel prices today August 29 2026" loading="lazy"><div class="article-body"><span class="tag">Solar Panel Prices</span><h3>Solar Panel Prices Today: August 29, 2026</h3><p>Compare featured LONGi, Canadian Solar, JA Solar and Inverex reference rates and learn what affects solar panel pricing.</p><a href="/solar-panel-prices-august-29-2026.html">Read article →</a></div>`;const grid=latestSection.querySelector("#articleGrid");if(grid)grid.prepend(card)}
  if(latestSection&&!document.querySelector("#us-foreign-power-equipment-card")){const card=document.createElement("article");card.className="article-card";card.id="us-foreign-power-equipment-card";card.dataset.search="US bans foreign-made power equipment solar inverter battery 2026 grid security news";card.innerHTML=`<img src="1787974583367.png" alt="U.S. restrictions on certain foreign-made power equipment affecting solar inverters and batteries" loading="lazy"><div class="article-body"><span class="tag">U.S. Solar News</span><h3>U.S. Restricts Certain Foreign-Made Power Equipment</h3><p>What the August 26, 2026 executive order could mean for qualifying grid-connected solar inverters, battery storage and related equipment.</p><a href="/us-restricts-foreign-power-equipment-solar-inverters-batteries-2026.html">Read article →</a></div>`;const grid=latestSection.querySelector("#articleGrid");if(grid)grid.prepend(card)}
  if(latestSection&&!document.querySelector("#aug29-10kw-usa-card")){const card=document.createElement("article");card.className="article-card";card.id="aug29-10kw-usa-card";card.dataset.search="10kW solar system cost USA 2026 $20000 $30000 solar system price American home solar installation cost";card.innerHTML=`<img src="1788010905590.png" alt="10kW solar system cost in the USA 2026" loading="lazy"><div class="article-body"><span class="tag">USA Solar Systems</span><h3>How Much Does a 10kW Solar System Cost in the USA in 2026?</h3><p>A practical guide to the $20,000–$30,000 planning range, equipment, installation, batteries and buying considerations.</p><a href="/10kw-solar-system-cost-usa-2026.html">Read article →</a></div>`;const grid=latestSection.querySelector("#articleGrid");if(grid)grid.prepend(card)}
  const articleImages=[...document.querySelectorAll(".article-card img")];
  articleImages.forEach((img,index)=>{if(!img.hasAttribute("width"))img.setAttribute("width","1200");if(!img.hasAttribute("height"))img.setAttribute("height","675");if(!img.hasAttribute("sizes"))img.setAttribute("sizes","(max-width: 600px) 92vw, (max-width: 900px) 45vw, 360px");if(!img.hasAttribute("decoding"))img.setAttribute("decoding","async");if(index===0){img.setAttribute("loading","eager");img.setAttribute("fetchpriority","high")}else if(!img.hasAttribute("loading")){img.setAttribute("loading","lazy")}});
  document.querySelectorAll("#inverter-hub-home img").forEach(img=>{if(!img.hasAttribute("width"))img.setAttribute("width","600");if(!img.hasAttribute("height"))img.setAttribute("height","600");if(!img.hasAttribute("decoding"))img.setAttribute("decoding","async")});
  calculate();
});

/* Automatic article feed: the sitemap is the source of truth. New sitemap entries are discovered automatically. */
(function(){
  const EXCLUDED=new Set(['/','/index.html','/solar-news.html','/solar-batteries.html','/solar-inverter-guides.html','/inverters.html','/ev-hub.html','/solar-panel-prices.html','/solar-accessories.html','/solar-system-prices.html','/paid-articles.html','/privacy-policy.html','/contact.html','/disclaimer.html','/about.html']);
  const clean=s=>{try{return new URL(s,location.origin).pathname}catch(e){return s}};
  const text=(doc,sel)=>doc.querySelector(sel)?.textContent?.trim()||'';
  const normalizeCategory=raw=>{
    const s=(raw||'').toLowerCase();
    if(/ev|phev|charging|jetour/.test(s))return 'EV Hub';
    if(/news|market|policy|tariff|trade/.test(s))return 'Solar News';
    if(/panel|price|prices|rate|singapore|india|china|germany/.test(s))return 'Solar Panel Prices';
    if(/battery|powerwall|storage/.test(s))return 'Solar Batteries';
    if(/inverter|eg4/.test(s))return 'Solar Inverter Rates';
    if(/system|10kw|5kw|3kw/.test(s))return 'Solar System Prices';
    if(/accessor|cable|breaker|mount/.test(s))return 'Solar Accessories';
    if(/loan|financ|saving|payback/.test(s))return 'Savings & Payback';
    return 'Solar Guides';
  };
  const firstImage=doc=>doc.querySelector('img.hero-image,img.hero,img[alt]')?.getAttribute('src')||'';
  async function readArticle(item){
    const path=clean(item.loc);if(EXCLUDED.has(path)||path.includes('sitemap'))return null;
    try{
      const r=await fetch(path,{cache:'no-store'});if(!r.ok)return null;
      const html=await r.text();const doc=new DOMParser().parseFromString(html,'text/html');
      const title=text(doc,'h1')||text(doc,'title');
      if(!title)return null;
      const rawCat=text(doc,'.tag')||text(doc,'.meta');
      const description=doc.querySelector('meta[name="description"]')?.content||text(doc,'main p')||'';
      const date=item.lastmod||text(doc,'.date')||text(doc,'.meta');
      return {url:path,title,description:description.replace(/\s+/g,' ').slice(0,170),category:normalizeCategory(rawCat+' '+title),image:firstImage(doc),date,stamp:Date.parse(item.lastmod||'')||0};
    }catch(e){return null}
  }
  async function loadArticles(){
    const r=await fetch('/sitemap.xml',{cache:'no-store'});if(!r.ok)throw new Error('sitemap');
    const xml=await r.text();const doc=new DOMParser().parseFromString(xml,'application/xml');
    const items=[...doc.querySelectorAll('url')].map(u=>({loc:u.querySelector('loc')?.textContent||'',lastmod:u.querySelector('lastmod')?.textContent||''})).filter(x=>x.loc);
    const out=[];for(let i=0;i<items.length;i+=6){const batch=await Promise.all(items.slice(i,i+6).map(readArticle));out.push(...batch.filter(Boolean))}
    return out.sort((a,b)=>b.stamp-a.stamp||b.date.localeCompare(a.date));
  }
  const esc=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const card=a=>`<article class="article-card"><img src="${esc(a.image)}" alt="${esc(a.title)}" loading="lazy" width="1200" height="675"><div class="article-body"><span class="tag">${esc(a.category)}</span><h3>${esc(a.title)}</h3><p>${esc(a.description)}</p><a href="${esc(a.url)}">Read article →</a></div></article>`;
  function homepage(articles){
    const grid=document.getElementById('articleGrid');if(!grid)return;
    grid.innerHTML=articles.slice(0,12).map(card).join('');
    const heading=document.querySelector('#latest h2');
    if(heading&&!heading.querySelector('a')){const a=document.createElement('a');a.href='/solar-articles.html';a.textContent=heading.textContent+' →';a.style.color='inherit';a.style.textDecoration='none';heading.textContent='';heading.appendChild(a)}
  }
  function hub(articles){
    const root=document.getElementById('articleHub');if(!root)return;
    const cats=[...new Set(articles.map(a=>a.category))];
    const priority=['Solar News','Solar Panel Prices','Solar System Prices','Solar Batteries','Solar Inverter Rates','Solar Accessories','EV Hub','Savings & Payback','Solar Guides'];
    cats.sort((a,b)=>(priority.indexOf(a)<0?99:priority.indexOf(a))-(priority.indexOf(b)<0?99:priority.indexOf(b))||a.localeCompare(b));
    const nav=cats.map(c=>`<a href="#cat-${encodeURIComponent(c)}">${esc(c)}</a>`).join('');
    root.innerHTML=`<div class="hub-filters"><a class="active" href="#all">All Articles</a>${nav}</div><div id="hubAll">${cats.map(c=>{const list=articles.filter(a=>a.category===c);return `<section class="hub-category" id="cat-${encodeURIComponent(c)}"><div class="hub-heading"><p class="eyebrow">SOLARRATEHUB</p><h2>${esc(c)}</h2><span>${list.length} article${list.length===1?'':'s'}</span></div><div class="article-grid">${list.map(card).join('')}</div></section>`}).join('')}</div>`;
  }
  async function boot(){
    if(!document.getElementById('articleGrid')&&!document.getElementById('articleHub'))return;
    try{const articles=await loadArticles();homepage(articles);hub(articles)}catch(e){console.warn('Automatic article feed unavailable',e)}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();