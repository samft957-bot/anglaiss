(() => {
 const all = window.SITE_ARTICLES || [];
 const grid = document.querySelector('#article-grid');
 const searchForm = document.querySelector('#search-form');
 const searchInput = document.querySelector('#search-input');
 const categoriesNode = document.querySelector('#categories');
 const count = document.querySelector('#result-count');
 const empty = document.querySelector('#empty-state');
 const pagination = document.querySelector('#pagination');
 const pageSize = 9; let query = ''; let category = 'Tout'; let page = 1;
 const categories = ['Tout', ...new Set(all.map(a => a.category))];
 function renderCategories(){ if(!categoriesNode)return; categoriesNode.replaceChildren(); categories.forEach(c=>{const b=document.createElement('button');b.className='category-button';b.type='button';b.textContent=c;b.setAttribute('aria-pressed',String(c===category));b.addEventListener('click',()=>{category=c;page=1;renderCategories();renderArticles()});categoriesNode.appendChild(b)}) }
 function filteredArticles(){return all.filter(a=>{const hay=`${a.title} ${a.excerpt} ${a.category} ${a.lead}`.toLocaleLowerCase('fr');return(category==='Tout'||a.category===category)&&(!query||hay.includes(query.toLocaleLowerCase('fr')));})}
 function renderArticles(){if(!grid)return;const filtered=filteredArticles();const pages=Math.max(1,Math.ceil(filtered.length/pageSize));page=Math.min(page,pages);const current=filtered.slice((page-1)*pageSize,page*pageSize);grid.replaceChildren();current.forEach(a=>{const card=document.createElement('article');card.className='article-card';const art=document.createElement('div');art.className='article-art';art.setAttribute('aria-hidden','true');art.textContent=a.icon;const body=document.createElement('div');body.className='article-card-body';const meta=document.createElement('span');meta.className='article-meta';meta.textContent=`${a.category} · ${a.minutes} min`;const h=document.createElement('h3');h.textContent=a.title;const p=document.createElement('p');p.textContent=a.excerpt;const link=document.createElement('a');link.href=`guides/${encodeURIComponent(a.slug)}.html`;link.textContent='Lire le guide →';body.append(meta,h,p,link);card.append(art,body);grid.append(card)});if(count)count.textContent=`${filtered.length} guide${filtered.length===1?'':'s'}`;if(empty)empty.hidden=filtered.length!==0;if(pagination){pagination.replaceChildren();if(pages>1)for(let i=1;i<=pages;i++){const b=document.createElement('button');b.type='button';b.textContent=String(i);b.setAttribute('aria-label',`Page ${i}`);if(i===page)b.setAttribute('aria-current','page');b.addEventListener('click',()=>{page=i;renderArticles();document.querySelector('#guides')?.scrollIntoView({behavior:'smooth'})});pagination.append(b)}}}
 if(searchForm)searchForm.addEventListener('submit',e=>{e.preventDefault();query=searchInput.value.trim();page=1;renderArticles();document.querySelector('#guides')?.scrollIntoView({behavior:'smooth'})});
 if(searchInput)searchInput.addEventListener('input',()=>{if(!searchInput.value.trim()&&query){query='';page=1;renderArticles()}});
 const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');if(toggle&&nav)toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});
 document.querySelectorAll('#year').forEach(n=>n.textContent=String(new Date().getFullYear()));renderCategories();renderArticles();
})();
