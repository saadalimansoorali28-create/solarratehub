document.addEventListener("DOMContentLoaded", () => {
  const $ = id => document.getElementById(id);
  const billInput=$("bill"), sizeInput=$("size"), calculateBtn=$("calculate"), annualEl=$("annual"), costEl=$("cost"), paybackEl=$("payback");
  const money=v=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(Math.round(v));
  const currencyLabel=billInput?.closest(".input-wrap")?.querySelector("span");
  if(currencyLabel) currencyLabel.textContent="$";
  if(billInput && (!billInput.value || Number(billInput.value)>=10000)) billInput.value="300";
  function calculate(){
    if(!billInput||!sizeInput||!annualEl||!costEl||!paybackEl)return;
    const bill=Math.max(0,Number(billInput.value)||0), size=Number(sizeInput.value);
    const coverage={3:.45,5:.65,10:.85,15:.95}[size]||0;
    const savings=bill*12*coverage, cost=size*3150, payback=savings>0?cost/savings:0;
    annualEl.textContent=money(savings); costEl.textContent=money(cost); paybackEl.textContent=payback?payback.toFixed(1)+" years":"—";
  }
  if(calculateBtn)calculateBtn.addEventListener("click",calculate);
  if(billInput)billInput.addEventListener("input",calculate);
  if(sizeInput)sizeInput.addEventListener("change",calculate);
  document.querySelectorAll("#articleGrid img").forEach(img=>{img.loading="lazy";img.decoding="async";if(!img.hasAttribute("width"))img.setAttribute("width","1200");if(!img.hasAttribute("height"))img.setAttribute("height","675")});

  const menuToggle=$("menuToggle"), siteMenu=$("siteMenu"), menuClose=$("menuClose"), menuOverlay=$("menuOverlay");
  function closeMenu(){if(!siteMenu)return;siteMenu.classList.remove("open");if(menuOverlay)menuOverlay.classList.remove("open");siteMenu.setAttribute("aria-hidden","true");if(menuToggle){menuToggle.setAttribute("aria-expanded","false");menuToggle.setAttribute("aria-label","Open website menu")}document.body.classList.remove("menu-open")}
  function openMenu(){if(!siteMenu)return;siteMenu.classList.add("open");if(menuOverlay)menuOverlay.classList.add("open");siteMenu.setAttribute("aria-hidden","false");if(menuToggle){menuToggle.setAttribute("aria-expanded","true");menuToggle.setAttribute("aria-label","Close website menu")}document.body.classList.add("menu-open")}
  closeMenu();
  if(menuToggle)menuToggle.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();siteMenu?.classList.contains("open")?closeMenu():openMenu()});
  if(menuClose)menuClose.addEventListener("click",e=>{e.preventDefault();closeMenu()});
  if(menuOverlay)menuOverlay.addEventListener("click",closeMenu);
  if(siteMenu)siteMenu.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));

  const desktopNav=document.querySelector(".desktop-nav");
  if(desktopNav && ![...desktopNav.querySelectorAll("a")].some(a=>a.textContent.trim().toLowerCase()==="home")){const homeLink=document.createElement("a");homeLink.href="/";homeLink.textContent="Home";desktopNav.prepend(homeLink)}

  const searchToggle=$("searchToggle"), searchPanel=$("searchPanel"), siteSearch=$("siteSearch"), searchClear=$("searchClear"), searchStatus=$("searchStatus"), menuSearch=$("menuSearch"), emptySearch=$("emptySearch");
  function closeSearch(){if(!searchPanel)return;searchPanel.classList.remove("open");searchPanel.setAttribute("aria-hidden","true");if(searchToggle){searchToggle.setAttribute("aria-expanded","false");searchToggle.setAttribute("aria-label","Open search")}}
  function openSearch(){if(!searchPanel)return;searchPanel.classList.add("open");searchPanel.setAttribute("aria-hidden","false");if(searchToggle){searchToggle.setAttribute("aria-expanded","true");searchToggle.setAttribute("aria-label","Close search")}requestAnimationFrame(()=>siteSearch&&siteSearch.focus())}
  let filterFrame=0;
  function filterArticles(query){cancelAnimationFrame(filterFrame);filterFrame=requestAnimationFrame(()=>{const q=query.trim().toLowerCase();let shown=0;document.querySelectorAll(".article-card").forEach(card=>{const text=((card.dataset.search||"")+" "+card.textContent).toLowerCase(),match=!q||text.includes(q);card.hidden=!match;if(match)shown++});if(emptySearch)emptySearch.hidden=shown!==0||!q;if(searchStatus)searchStatus.textContent=q?shown+" article"+(shown===1?"":"s")+" found.":"Search the latest solar guides and categories."})}
  if(searchToggle)searchToggle.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();searchPanel?.classList.contains("open")?closeSearch():openSearch()});
  if(siteSearch)siteSearch.addEventListener("input",e=>filterArticles(e.target.value));
  if(searchClear)searchClear.addEventListener("click",()=>{if(!siteSearch)return;siteSearch.value="";filterArticles("");siteSearch.focus()});
  if(menuSearch&&siteMenu)menuSearch.addEventListener("input",e=>{const q=e.target.value.trim().toLowerCase();siteMenu.querySelectorAll(".menu-section a").forEach(a=>a.hidden=!!q&&!a.textContent.toLowerCase().includes(q))});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeMenu();closeSearch()}});
  window.addEventListener("pageshow",()=>{closeMenu();closeSearch()});

  const homeMain=document.querySelector("main#home"), heroSection=document.querySelector(".hero");
  if(homeMain&&heroSection&&!document.querySelector("#inverter-hub-home")){
    const section=document.createElement("section");section.id="inverter-hub-home";section.className="section";
    section.innerHTML=`<div class="container"><div class="section-heading"><div><p class="eyebrow">INVERTER HUB</p><h2>Latest Solar Inverter Models</h2></div><p>Explore inverter specifications, current USA price references and detailed model pages.</p></div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px"><a href="/eg4-6000xp.html" style="text-decoration:none;color:inherit;border:1px solid #e5eae7;border-radius:18px;overflow:hidden;background:#fff;box-shadow:0 8px 28px rgba(20,35,29,.05)"><img src="EG4-6000XP-All-In-One-Off-Grid-Inverter-Front.webp" alt="EG4 6000XP All-In-One Off-Grid Inverter" loading="lazy" decoding="async" width="600" height="600" style="width:100%;height:190px;object-fit:contain;background:#f5f8f6;display:block"><div style="padding:20px"><span class="tag">EG4</span><h3>EG4 6000XP</h3><p>6kW · 48V · dual MPPT · up to 8kW PV input</p><strong style="color:#16834b">$1,449.99 USD reference</strong><p style="color:#16834b;font-weight:700">View model →</p></div></a><a href="/eg4-12000xp-v2.html" style="text-decoration:none;color:inherit;border:1px solid #e5eae7;border-radius:18px;overflow:hidden;background:#fff;box-shadow:0 8px 28px rgba(20,35,29,.05)"><img src="EG4-12000XP-All-In-One-Off-Grid-Inverter-Open.webp" alt="EG4 12000XP V2 All-In-One Off-Grid Inverter" loading="lazy" decoding="async" width="600" height="600" style="width:100%;height:190px;object-fit:contain;background:#f5f8f6;display:block"><div style="padding:20px"><span class="tag">EG4</span><h3>EG4 12000XP V2</h3><p>12kW · 48V · dual MPPT · up to 24kW PV input</p><strong style="color:#16834b">$1,899.99 USD reference</strong><p style="color:#16834b;font-weight:700">View model →</p></div></a><a href="/eg4-12kpv.html" style="text-decoration:none;color:inherit;border:1px solid #e5eae7;border-radius:18px;overflow:hidden;background:#fff;box-shadow:0 8px 28px rgba(20,35,29,.05)"><img src="EG4-12kPV-All-In-One-Hybrid-Inverter-Right-Tilt.webp" alt="EG4 12kPV All-In-One Hybrid Inverter" loading="lazy" decoding="async" width="600" height="600" style="width:100%;height:190px;object-fit:contain;background:#f5f8f6;display:block"><div style="padding:20px"><span class="tag">EG4</span><h3>EG4 12kPV</h3><p>Hybrid · 8kW continuous output · 12kW solar input</p><strong style="color:#16834b">$2,949.99 USD reference</strong><p style="color:#16834b;font-weight:700">View model →</p></div></a></div><div style="margin-top:18px"><a class="primary-btn" href="/inverters.html">Open Full Inverter Hub →</a></div></div>`;
    heroSection.insertAdjacentElement("afterend",section);
  }

  const inverterCategory=$("inverters"),newsCategory=$("news"),batteryCategory=$("batteries"),guideCategory=$("guides");
  if(inverterCategory)inverterCategory.href="/inverters.html";
  if(newsCategory)newsCategory.href="/solar-news.html";
  if(batteryCategory)batteryCategory.href="/solar-batteries.html";
  if(guideCategory)guideCategory.href="/solar-inverter-guides.html";
  if(siteMenu){siteMenu.querySelectorAll('a[href="#solar-panels"]').forEach(a=>a.href="/solar-panel-prices.html");siteMenu.querySelectorAll('a[href="#inverters"]').forEach(a=>a.href="/inverters.html");siteMenu.querySelectorAll('a[href="#accessories"]').forEach(a=>a.href="/solar-accessories.html");siteMenu.querySelectorAll('a[href="#systems"]').forEach(a=>a.href="/solar-system-prices.html");siteMenu.querySelectorAll('a[href="#batteries"]').forEach(a=>a.href="/solar-batteries.html");siteMenu.querySelectorAll('a[href="#guides"]').forEach(a=>a.href="/solar-inverter-guides.html");siteMenu.querySelectorAll('a[href="#news"]').forEach(a=>a.href="/solar-news.html")}
  document.addEventListener("error",e=>{const img=e.target;if(img?.tagName==="IMG"&&img.closest(".article-card")&&!img.dataset.fallback){img.dataset.fallback="1";img.src="/95129107-17c4-4326-83cd-09252251a676.png";img.style.objectFit="contain";img.style.background="#f5f8f6"}},true);
  calculate();

  function loadDeferredArticleFeed(){
    if(window.__solarArticleFeedLoading||window.__solarArticleFeedBooted)return;
    window.__solarArticleFeedLoading=true;
    const script=document.createElement("script");
    script.src="/article-feed.js";
    script.async=true;
    script.onload=()=>{window.__solarArticleFeedLoading=false};
    script.onerror=()=>{window.__solarArticleFeedLoading=false};
    document.head.appendChild(script);
  }
  const articleGrid=$("articleGrid"), articleHub=$("articleHub");
  if(articleGrid){
    if("IntersectionObserver" in window){
      const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){observer.disconnect();loadDeferredArticleFeed()}},{rootMargin:"0px"});
      observer.observe(articleGrid);
    }else window.setTimeout(loadDeferredArticleFeed,5000);
  }else if(articleHub){
    const run=()=>loadDeferredArticleFeed();
    if("requestIdleCallback" in window)window.requestIdleCallback(run,{timeout:4000});else window.setTimeout(run,2500);
  }
});
