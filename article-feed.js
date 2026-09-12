/* Automatic latest-article feed. Keeps the homepage light and uses each article's real content image. */
(function(){
  const EXCLUDED=new Set(["/","/index.html","/solar-articles.html","/solar-news.html","/solar-batteries.html","/solar-inverter-guides.html","/inverters.html","/ev-hub.html","/solar-panel-prices.html","/solar-accessories.html","/solar-system-prices.html","/paid-articles.html","/privacy-policy.html","/contact.html","/disclaimer.html","/about.html"]);
  const FALLBACK="/95129107-17c4-4326-83cd-09252251a676.png";
  const clean=s=>{try{return new URL(s,location.origin).pathname}catch(e){return s}};
  const text=(doc,sel)=>doc.querySelector(sel)?.textContent?.trim()||"";
  const normalizeCategory=raw=>{const s=(raw||"").toLowerCase();if(/ev|phev|charging|jetour/.test(s))return "EV Hub";if(/inverter|eg4|wechselrichter/.test(s))return "Solar Inverter Rates";if(/battery|powerwall|storage/.test(s))return "Solar Batteries";if(/system|10kw|5kw|3kw|12kw|home energy system/.test(s))return "Solar System Prices";if(/loan|financ|saving|payback/.test(s))return "Savings & Payback";if(/news|market|policy|tariff|trade|restriction|ban/.test(s))return "Solar News";if(/accessor|cable|breaker|mount/.test(s))return "Solar Accessories";if(/panel|price|prices|rate|singapore|india|china|germany|pakistan|usa|uk/.test(s))return "Solar Panel Prices";return "Solar Guides"};
  function resolveImage(src,base){if(!src)return "";try{return new URL(src,base).href}catch(e){return src}}
  function firstImage(doc,base){
    const selectors=["main img","article img",".article-page img",".wrap img","img.hero-image","img.hero"];
    for(const selector of selectors){
      const img=[...doc.querySelectorAll(selector)].find(el=>{const src=el.getAttribute("src")||"";return src&&!el.closest("header,nav")&&!/95129107-17c4-4326-83cd-09252251a676\\.png/i.test(src)});
      if(img)return resolveImage(img.getAttribute("src"),base);
    }
    const og=doc.querySelector('meta[property="og:image"]')?.getAttribute("content")||doc.querySelector('meta[name="twitter:image"]')?.getAttribute("content")||"";
    return resolveImage(og,base);
  }
  async function readArticle(item){
    const path=clean(item.loc);if(EXCLUDED.has(path)||path.includes("sitemap"))return null;
    try{
      const r=await fetch(path,{cache:"default"});if(!r.ok)return null;
      const html=await r.text(),doc=new DOMParser().parseFromString(html,"text/html");
      const title=text(doc,"h1")||text(doc,"title");if(!title)return null;
      const rawCat=text(doc,".tag")||text(doc,".meta");
      const description=doc.querySelector('meta[name="description"]')?.content||text(doc,"main p")||"";
      const date=item.lastmod||text(doc,".date")||text(doc,".meta");
      return {url:path,title,description:description.replace(/\s+/g," ").slice(0,170),category:normalizeCategory(rawCat+" "+title),image:firstImage(doc,new URL(path,location.origin).href),date,stamp:Date.parse(item.lastmod||"")||0};
    }catch(e){return null}
  }
  async function loadArticles(target){
    const r=await fetch("/sitemap.xml",{cache:"default"});if(!r.ok)throw new Error("sitemap");
    const doc=new DOMParser().parseFromString(await r.text(),"application/xml");
    const items=[...doc.querySelectorAll("url")].map(u=>({loc:u.querySelector("loc")?.textContent||"",lastmod:u.querySelector("lastmod")?.textContent||""})).filter(x=>x.loc&&!EXCLUDED.has(clean(x.loc)));
    items.sort((a,b)=>(Date.parse(b.lastmod||"")||0)-(Date.parse(a.lastmod||"")||0));
    const out=[];
    const batchSize=target===12?12:8;
    for(let i=0;i<items.length&&out.length<target;i+=batchSize){const batch=await Promise.all(items.slice(i,i+batchSize).map(readArticle));out.push(...batch.filter(Boolean));}
    return out.sort((a,b)=>b.stamp-a.stamp||b.date.localeCompare(a.date)).slice(0,target);
  }
  const esc=s=>String(s||"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]));
  const card=(a)=>`<article class="article-card" data-search="${esc(a.title+" "+a.description+" "+a.category)}"><img src="${esc(a.image||FALLBACK)}" alt="${esc(a.title)}" loading="lazy" decoding="async" width="1200" height="675" fetchpriority="low" data-feed-fallback="${FALLBACK}"><div class="article-body"><span class="tag">${esc(a.category)}</span><h3>${esc(a.title)}</h3><p>${esc(a.description)}</p><a href="${esc(a.url)}">Read article →</a></div></article>`;
  function attachImageFallback(root){root?.querySelectorAll("img[data-feed-fallback]").forEach(img=>img.addEventListener("error",function(){if(this.dataset.fallbackApplied)return;this.dataset.fallbackApplied="1";this.src=this.dataset.feedFallback;this.removeAttribute("data-feed-fallback");},{once:true}))}
  function homepage(articles){const grid=document.getElementById("articleGrid");if(!grid)return;grid.innerHTML=articles.slice(0,12).map(card).join("");grid.setAttribute("aria-busy","false");attachImageFallback(grid)}
  function hub(articles){const root=document.getElementById("articleHub");if(!root)return;const cats=[...new Set(articles.map(a=>a.category))];const priority=["Solar News","Solar Panel Prices","Solar Batteries","Solar Inverter Rates","Solar System Prices","Solar Accessories","EV Hub","Savings & Payback","Solar Guides"];cats.sort((a,b)=>(priority.indexOf(a)<0?99:priority.indexOf(a))-(priority.indexOf(b)<0?99:priority.indexOf(b))||a.localeCompare(b));root.innerHTML=`<div class="hub-filters"><a class="active" href="#all">All Articles</a>${cats.map(c=>`<a href="#cat-${encodeURIComponent(c)}">${esc(c)}</a>`).join("")}</div><div id="hubAll">${cats.map(c=>{const list=articles.filter(a=>a.category===c);return `<section class="hub-category" id="cat-${encodeURIComponent(c)}"><div class="hub-heading"><p class="eyebrow">SOLARRATEHUB</p><h2>${esc(c)}</h2><span>${list.length} article${list.length===1?"":"s"}</span></div><div class="article-grid">${list.map(card).join("")}</div></section>`}).join("")}</div>`;attachImageFallback(root)}
  function loadMonetag(){if(document.querySelector('script[data-zone="277539"]'))return;const s=document.createElement("script");s.src="https://quge5.com/88/tag.min.js";s.dataset.zone="277539";s.async=true;s.setAttribute("data-cfasync","false");document.head.appendChild(s)}
  function deferMonetag(){
    let scheduled=false;
    const run=()=>{if(scheduled)return;scheduled=true;try{loadMonetag()}catch(e){}};
    const once=()=>{run();window.removeEventListener("pointerdown",once);window.removeEventListener("touchstart",once);window.removeEventListener("keydown",once);window.removeEventListener("scroll",once)};
    window.addEventListener("pointerdown",once,{passive:true});window.addEventListener("touchstart",once,{passive:true});window.addEventListener("keydown",once,{passive:true});window.addEventListener("scroll",once,{passive:true});
    setTimeout(run,15000);
  }
  async function boot(){if(window.__solarArticleFeedBooted)return;window.__solarArticleFeedBooted=true;const grid=document.getElementById("articleGrid"),root=document.getElementById("articleHub");if(!grid&&!root)return;try{const articles=await loadArticles(grid?12:40);homepage(articles);hub(articles)}catch(e){console.warn("Automatic article feed unavailable",e);window.__solarArticleFeedBooted=false;const g=document.getElementById("articleGrid");if(g)g.setAttribute("aria-busy","false")}deferMonetag()}
  boot();
})();
