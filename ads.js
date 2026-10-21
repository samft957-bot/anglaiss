(() => {
 const cfg = window.AD_CONFIG || {enabled:false, mode:'disabled', sponsors:[]};
 const banned = new Set((cfg.blockedCategories || []).map(x => String(x).toLowerCase()));
 const approved = (cfg.sponsors || []).filter(s => cfg.enabled === true && cfg.mode === 'direct-approved' && s.approvedForPublication === true && s.productVerified === true && s.religiousReviewStatus === 'approved' && !banned.has(String(s.category || '').toLowerCase()) && s.name && s.title && s.description && s.url && /^https:\/\//.test(s.url));
 document.querySelectorAll('[data-ad-slot]').forEach(slot => {
   slot.replaceChildren(); const label=document.createElement('span');label.className='ad-label';label.textContent='PUBLICITÉ';slot.append(label);
   const sponsor=approved[0];
   if(sponsor){const a=document.createElement('a');a.className='sponsor-card';a.href=sponsor.url;a.target='_blank';a.rel='sponsored nofollow noopener noreferrer';const name=document.createElement('span');name.textContent=sponsor.name;const title=document.createElement('strong');title.textContent=sponsor.title;const desc=document.createElement('p');desc.textContent=sponsor.description;a.append(name,title,desc);slot.append(a);}
   else {const p=document.createElement('p');p.textContent='Emplacement désactivé : aucun annonceur direct n’a été validé pour cette version.';slot.append(p);slot.dataset.status='disabled';}
 });
})();
