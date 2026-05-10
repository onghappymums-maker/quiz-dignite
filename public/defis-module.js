(function(){
'use strict';

// ════════════════════════════════════════
// DONNÉES — 100 défis (5 cats × 20)
// ════════════════════════════════════════
var CATS = {
  menstruation:{icon:'🩸',label:'Menstruation',color:'#C8102E',bg:'#FFE8EC'},
  confiance:   {icon:'💪',label:'Confiance',   color:'#9B5DE5',bg:'#F0E8FF'},
  parole:      {icon:'🗣️',label:'Parole & Tabous',color:'#F59E0B',bg:'#FEF9C3'},
  sororite:    {icon:'🤝',label:'Sororité',    color:'#3DBE82',bg:'#E8FFF4'},
  bienetre:    {icon:'🧘',label:'Corps & Bien-être',color:'#4FB3F6',bg:'#EBF7FF'}
};

var ALL_DEFIS = [
  {cat:'menstruation',text:"Les règles durent en moyenne combien de jours ? Note la date de début de tes prochaines règles. Connais ton cycle."},
  {cat:'menstruation',text:"Si tu as déjà eu très mal pendant tes règles, dis-toi aujourd'hui : «Je mérite des règles sans souffrance.»"},
  {cat:'menstruation',text:"Si quelqu'un te dit que tu es «impure» pendant tes règles, rappelle-toi : le sang des règles n'est pas sale. C'est ton corps qui se renouvelle. 💪"},
  {cat:'menstruation',text:"Bouge doucement aujourd'hui : une marche, quelques étirements. Observe comment ton corps se sent — même pendant tes règles."},
  {cat:'menstruation',text:"Pose une alarme discrète sur ton téléphone pour te rappeler de changer ta protection toutes 4 à 6 heures."},
  {cat:'menstruation',text:"Essaie de noter la date de début de tes prochaines règles. Ton cycle est unique — apprends à le connaître."},
  {cat:'menstruation',text:"Parle de ce que sont vraiment les règles à une amie aujourd'hui — juste pour normaliser la conversation."},
  {cat:'menstruation',text:"Fais 3 respirations profondes maintenant. Ton corps et ton cycle sont connectés à ton état émotionnel."},
  {cat:'menstruation',text:"Tu te souviens de tes premières règles ? Comment tu t'es sentie ? C'est OK de se souvenir et d'en parler."},
  {cat:'menstruation',text:"Pose une question sur la contraception à quelqu'un de confiance ou cherche une info fiable aujourd'hui."},
  {cat:'menstruation',text:"Tu n'as jamais essayé les serviettes lavables ? Renseigne-toi — ça pourrait changer beaucoup de choses."},
  {cat:'menstruation',text:"La prochaine fois que tes règles approchent, essaie de boire plus d'eau. Observe la différence."},
  {cat:'menstruation',text:"Parle de la précarité menstruelle à quelqu'un qui ne sait pas ce que c'est. Une phrase suffit."},
  {cat:'menstruation',text:"Prends soin de toi avec tendresse aujourd'hui, surtout si tu as tes règles. Une douche, c'est OK — c'est même recommandé."},
  {cat:'menstruation',text:"Connais-tu à peu près quand tu ovules ? Ton cycle a ses propres signaux — apprends à les lire."},
  {cat:'menstruation',text:"Tu connais ton flux habituel ? Commence à l'observer — c'est une info précieuse sur ta santé."},
  {cat:'menstruation',text:"Pose une bouillotte ou bouteille d'eau chaude sur ton ventre si tu as mal. Ça aide vraiment."},
  {cat:'menstruation',text:"Dis le mot «règles» à voix haute aujourd'hui, sans baisser la voix. 🌸"},
  {cat:'menstruation',text:"La prochaine fois que tu te sens «à fleur de peau» sans raison, vérifie où tu en es dans ton cycle."},
  {cat:'menstruation',text:"Si tu souffres vraiment à chaque cycle, note-le et consulte. Ta douleur n'est pas dans ta tête."},
  {cat:'confiance',text:"Dis le mot «règles» à voix haute aujourd'hui — sans chuchoter, sans rougir. Juste le dire. C'est déjà un acte de courage."},
  {cat:'confiance',text:"Calcule la date approximative de tes prochaines règles. Note-la quelque part. Connaître son corps, c'est du pouvoir."},
  {cat:'confiance',text:"Regarde-toi dans un miroir pendant 30 secondes. Dis une seule chose que tu aimes chez toi. Une seule suffit."},
  {cat:'confiance',text:"Prépare une petite trousse de secours dans ton sac : une protection, un médicament si tu as souvent mal. Tu mérites d'être prête."},
  {cat:'confiance',text:"Aujourd'hui, refuse une remarque blessante sur ton corps — en silence, dans ta tête si tu ne peux pas à voix haute."},
  {cat:'confiance',text:"Parle de tes règles à une amie sans baisser la voix. Juste naturellement, comme si c'était normal. Parce que ça l'est."},
  {cat:'confiance',text:"Écris 3 mots qui te décrivent telle que tu es — pas telle que les autres voudraient que tu sois."},
  {cat:'confiance',text:"Observe ta couleur de flux lors de tes prochaines règles sans paniquer. Note juste : clair, foncé, abondant, léger. Ton corps te parle."},
  {cat:'confiance',text:"Aujourd'hui, dis non à quelque chose qui ne te convient pas. Même pour un petit truc. S'affirmer s'apprend."},
  {cat:'confiance',text:"Bois 8 verres d'eau aujourd'hui. Surtout pendant tes règles, ton corps en a besoin."},
  {cat:'confiance',text:"Envoie un message de fierté à une amie. Dis-lui une chose que tu admires en elle. La sororité commence là."},
  {cat:'confiance',text:"Note pendant 3 jours comment tu te sens avant tes règles — humeur, énergie, ventre. Tu vas commencer à voir un schéma."},
  {cat:'confiance',text:"Aujourd'hui, occupe l'espace. Parle en classe, lève la main, donne ton avis. Même si ta voix tremble."},
  {cat:'confiance',text:"Parle à ta maman, grande sœur ou tante de tes règles. Une vraie conversation. Demande-lui comment ça se passait pour elle."},
  {cat:'confiance',text:"Fais une liste de 5 choses que tu sais faire. Pas des qualités — des compétences. Cuisine, coiffure, maths, écoute, danse. Tout compte."},
  {cat:'confiance',text:"Si tu as mal pendant tes règles, essaie une bouillotte sur le ventre ce soir. Note si ça aide."},
  {cat:'confiance',text:"Aujourd'hui, ne t'excuse pas d'exister. Observe combien de fois tu dis «désolée». C'est le début."},
  {cat:'confiance',text:"Explique à un garçon de ton entourage ce que sont les règles en une phrase simple. Sans gêne. Il a besoin de savoir."},
  {cat:'confiance',text:"Écris sur un papier une peur que tu gardes pour toi. Tu n'as pas à la montrer. Juste la nommer, c'est déjà la réduire."},
  {cat:'confiance',text:"Aujourd'hui, compare-toi seulement à toi d'hier. Pas aux autres filles. Pas aux réseaux sociaux. Juste : est-ce que j'avance ?"},
  {cat:'parole',text:"Aujourd'hui, apprends le nom scientifique d'une partie de ton corps que tu n'as jamais osé prononcer. Ton corps mérite d'être connu et nommé correctement."},
  {cat:'parole',text:"Aujourd'hui, pose une question sur ton corps à un adulte de confiance. Une vraie question que tu n'as jamais osé poser."},
  {cat:'parole',text:"Si quelqu'un fait une blague sur les règles devant toi aujourd'hui, ne ris pas pour faire plaisir. Reste silencieuse ou dis simplement : «C'est pas drôle.»"},
  {cat:'parole',text:"Écris sur un papier un mythe sur les règles que tu as déjà cru. Barre-le. Il n'a plus de pouvoir sur toi."},
  {cat:'parole',text:"Aujourd'hui, nomme une douleur que tu gardes pour toi d'habitude. À toi-même, à une amie, ou juste sur papier. Nommer c'est exister."},
  {cat:'parole',text:"Dis à quelqu'un «j'ai mes règles» sans chercher un mot de remplacement. Pas «mes affaires», pas «mes trucs». Les règles."},
  {cat:'parole',text:"Trouve une adulte — maman, tante, prof — et demande-lui comment elle vivait ses règles à ton âge. Écoute vraiment sa réponse."},
  {cat:'parole',text:"Aujourd'hui, corrige une fausse info sur le corps féminin si tu en entends une. Doucement, mais clairement."},
  {cat:'parole',text:"Parle de la précarité menstruelle à quelqu'un qui ne sait pas ce que c'est. Une phrase suffit. Tu peux changer une vision."},
  {cat:'parole',text:"Si tu as déjà eu honte de tes règles, écris pourquoi. Pas pour garder la honte — pour la comprendre et la laisser partir."},
  {cat:'parole',text:"Aujourd'hui, explique l'ovulation à quelqu'un en une phrase simple. Si tu ne sais pas encore — cherche, puis explique."},
  {cat:'parole',text:"Dis à voix haute : «Mon corps ne me fait pas honte.» Une fois. Devant ton miroir. Même si tu n'y crois pas encore totalement."},
  {cat:'parole',text:"Trouve un mot en ta langue locale pour désigner les règles. Réfléchis à ce que ce mot dit de la façon dont on voit les femmes."},
  {cat:'parole',text:"Aujourd'hui, refuse d'utiliser un euphémisme pour parler de ton corps. Appelle les choses par leur nom pendant toute la journée."},
  {cat:'parole',text:"Si tu connais une fille plus jeune que toi, dis-lui une vérité sur les règles que tu aurais aimé savoir à son âge."},
  {cat:'parole',text:"Écris une question que tu n'as jamais osé poser sur ton corps. Garde-la. Cherche la réponse avant la fin de la semaine."},
  {cat:'parole',text:"Aujourd'hui, parle de tes règles sans t'excuser de les mentionner. Pas de «désolée c'est gênant mais…». Juste la phrase."},
  {cat:'parole',text:"Dis à un garçon de ton entourage une vraie info sur le cycle menstruel. Sans gêne, comme tu lui parlerais de météo."},
  {cat:'parole',text:"Pense à un tabou lié au corps féminin dans ta famille ou ta communauté. Écris-le. Tu n'as pas à l'accepter parce qu'il existe depuis longtemps."},
  {cat:'parole',text:"Aujourd'hui, parle de toi à la première personne. «Je pense que…», «Je veux…», «Je ressens…». Ta voix compte. Elle a toujours compté."},
  {cat:'sororite',text:"Passe une serviette hygiénique à une amie sans qu'elle ait à demander deux fois. La solidarité ne se fait pas attendre."},
  {cat:'sororite',text:"Aujourd'hui, défends une fille qu'on critique pour son corps — son poids, sa taille, sa peau. Une phrase suffit."},
  {cat:'sororite',text:"Envoie un message vocal ou écrit à une amie pour lui dire une chose vraie et belle sur elle. Pas un emoji — des mots."},
  {cat:'sororite',text:"Si une amie a ses règles et se sent mal, propose-lui quelque chose de concret — une bouillotte, t'asseoir avec elle, lui apporter de l'eau."},
  {cat:'sororite',text:"Aujourd'hui, ne participe pas aux ragots sur le corps ou la vie intime d'une autre fille. Sors de la conversation si tu dois."},
  {cat:'sororite',text:"Pense à une fille que tu admires dans ton entourage. Dis-le lui directement aujourd'hui. On ne le dit pas assez."},
  {cat:'sororite',text:"Si tu vois une fille mal à l'aise ou en difficulté aujourd'hui, approche-toi. Demande juste : «Ça va ?»"},
  {cat:'sororite',text:"Partage une info utile sur la santé menstruelle dans un groupe WhatsApp de filles. Pas un cours — juste une chose simple et vraie."},
  {cat:'sororite',text:"Aujourd'hui, célèbre la réussite d'une amie sans jalousie. Sa victoire ne diminue pas la tienne."},
  {cat:'sororite',text:"Pense à une fille que tu as jugée sans la connaître. Décide aujourd'hui de la voir différemment."},
  {cat:'sororite',text:"Si une amie te parle de douleurs menstruelles, ne lui dis pas «c'est normal, supporte». Écoute-la vraiment."},
  {cat:'sororite',text:"Invite une amie à faire le Quiz Dignité avec toi. Comparez vos résultats. Riez, apprenez, grandissez ensemble."},
  {cat:'sororite',text:"Aujourd'hui, prête quelque chose sans attendre qu'on te le rende — un stylo, une protection, un sourire."},
  {cat:'sororite',text:"Si tu es en position d'aider une fille plus jeune, fais-le. Réponds à une question, rassure, accompagne."},
  {cat:'sororite',text:"Rappelle à une amie qu'elle a le droit de dire non — à une sortie, une pression, une situation qui ne lui convient pas."},
  {cat:'sororite',text:"Aujourd'hui, écoute une amie sans chercher à donner des conseils. Juste écouter. C'est déjà énorme."},
  {cat:'sororite',text:"Pense à une fille qui manque de protections menstruelles près de toi. Qu'est-ce que tu pourrais faire concrètement ?"},
  {cat:'sororite',text:"Dis à une amie : «Tu n'as pas à souffrir en silence.» Ces 6 mots peuvent changer sa journée."},
  {cat:'sororite',text:"Crée ou rejoins un espace de parole entre filles — même informel, même 3 personnes. Les filles ont besoin de se parler."},
  {cat:'sororite',text:"Aujourd'hui, sois la grande sœur que tu aurais voulu avoir. Pour une fille autour de toi. Juste aujourd'hui."},
  {cat:'bienetre',text:"Dors 8 heures cette nuit. Pas de négociation. Ton corps reconstruit tout pendant que tu dors."},
  {cat:'bienetre',text:"Bois 1,5 litre d'eau aujourd'hui. Pose une bouteille devant toi dès le matin. Ton cycle menstruel te remerciera."},
  {cat:'bienetre',text:"Fais 10 minutes d'étirements ce soir avant de dormir. Pas du sport — juste laisser ton corps se déposer."},
  {cat:'bienetre',text:"Mange un fruit ou un légume aujourd'hui que tu n'as pas l'habitude de manger. Ton corps aime la variété."},
  {cat:'bienetre',text:"Pose une main sur ton ventre. Respire profondément 5 fois. Sens ton corps vivant. C'est tout. C'est suffisant."},
  {cat:'bienetre',text:"Aujourd'hui, repose-toi sans culpabilité. Se reposer n'est pas de la paresse. C'est du soin."},
  {cat:'bienetre',text:"Note dans un carnet ou ton téléphone comment tu te sens physiquement aujourd'hui. Énergie, ventre, tête. Juste observer."},
  {cat:'bienetre',text:"Danse seule dans ta chambre pendant une chanson. Ton corps mérite de bouger pour le plaisir, pas seulement pour les autres."},
  {cat:'bienetre',text:"Mange lentement à un repas aujourd'hui. Pose ta fourchette entre chaque bouchée. Écoute quand ton corps dit «c'est assez»."},
  {cat:'bienetre',text:"Identifie une tension dans ton corps — épaules, mâchoire, ventre. Respire dessus. Laisse-la partir doucement."},
  {cat:'bienetre',text:"Aujourd'hui, limite les réseaux sociaux à 30 minutes. Observe comment tu te sens dans ton corps quand tu décroches."},
  {cat:'bienetre',text:"Marche 20 minutes dehors aujourd'hui. Pas pour maigrir. Pour te sentir vivante et présente dans ton corps."},
  {cat:'bienetre',text:"Prends une douche en prenant le temps — pas en vitesse. Ton corps mérite qu'on s'occupe de lui avec attention."},
  {cat:'bienetre',text:"Ce soir, écris 3 sensations positives que ton corps t'a offertes aujourd'hui. La chaleur du soleil, un bon repas, un fou rire."},
  {cat:'bienetre',text:"Aujourd'hui, ne saute aucun repas. Ton corps a besoin de carburant régulier — surtout pendant et avant tes règles."},
  {cat:'bienetre',text:"Identifie un aliment que tu manges quand tu as tes règles qui aggrave tes douleurs. Essaie de le réduire cette fois."},
  {cat:'bienetre',text:"Ris aujourd'hui — vraiment. Cherche quelque chose qui te fait rire. Le rire est une médecine que personne ne te prescrit assez."},
  {cat:'bienetre',text:"Aujourd'hui, touche ton corps avec bienveillance — pas pour le juger, pas pour le comparer. Juste te dire : ce corps est à moi."},
  {cat:'bienetre',text:"Dors tôt ce soir — avant 22h si tu peux. Observe demain matin comment tu te réveilles différemment."},
  {cat:'bienetre',text:"Écris une lettre d'une phrase à ton corps : «Ce que je veux pour toi cette année, c'est…» Tu n'as pas à la montrer. Juste l'écrire."}
];

var GRAD = 'linear-gradient(135deg,#C8102E 0%,#E8426A 40%,#FF6B9D 75%,#FF8C69 100%)';

// ════════════════════════════════════════
// STORAGE
// ════════════════════════════════════════
function loadSt(){ try{return JSON.parse(localStorage.getItem('qd_daily')||'{}')}catch{return{}} }
function saveSt(s){ try{localStorage.setItem('qd_daily',JSON.stringify(s))}catch{} }

function todayKey(){
  var d=new Date();
  return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
}
function dayIndex(){
  var ref=new Date('2025-01-01'), diff=Math.floor((new Date()-ref)/86400000);
  return ((diff%100)+100)%100;
}

// ════════════════════════════════════════
// HELPERS DOM
// ════════════════════════════════════════
function css(el, styles){ Object.assign(el.style, styles); return el; }

function div(styles, content){
  var d=document.createElement('div');
  css(d, styles||{});
  if(typeof content==='string') d.innerHTML=content;
  return d;
}

function mkBtn(text, bg, color, onClick){
  var b=document.createElement('button');
  b.textContent=text;
  css(b,{background:bg,color:color,border:'none',borderRadius:'50px',
    padding:'13px 22px',fontSize:'.93rem',fontWeight:'800',cursor:'pointer',
    width:'100%',marginBottom:'8px',fontFamily:"'Nunito',sans-serif",
    boxShadow:bg!=='transparent'?'0 4px 16px rgba(200,16,46,.25)':'none'});
  b.addEventListener('click',onClick);
  return b;
}

function makeOv(id){
  var ov=document.getElementById(id);
  if(ov){ov.innerHTML='';return ov;}
  ov=document.createElement('div');
  ov.id=id;
  css(ov,{position:'fixed',inset:'0',zIndex:'10000',
    background:'linear-gradient(-45deg,#FFDDE1,#FFAAB5,#FECFEF,#FFD6CC)',
    overflowY:'auto',display:'none',fontFamily:"'Nunito',sans-serif"});
  document.body.appendChild(ov);
  return ov;
}
function showOv(ov){ov.style.display='block';ov.scrollTop=0;}
function hideOv(ov){ov.style.display='none';}

// ════════════════════════════════════════
// DÉFI QUOTIDIEN
// ════════════════════════════════════════
var dailyOv;

function showDailyDefi(){
  dailyOv = makeOv('qd-daily-ov');
  dailyOv.innerHTML = '';

  var st=loadSt(), today=todayKey();
  var idx=dayIndex(), defi=ALL_DEFIS[idx], cat=CATS[defi.cat];
  var done=!!(st.done && st.done[today]);
  var streak=st.streak||0;

  var wrap=div({minHeight:'100vh',display:'flex',flexDirection:'column',
    alignItems:'center',justifyContent:'center',padding:'24px 18px'});

  var card=div({background:'white',borderRadius:'28px',padding:'28px 22px',
    maxWidth:'420px',width:'100%',
    boxShadow:'0 12px 40px rgba(200,16,46,.2)',
    border:'2px solid '+cat.color+'33'});

  // streak badge
  if(streak>0){
    var sb=div({display:'inline-block',background:GRAD,color:'white',
      borderRadius:'50px',padding:'4px 14px',fontSize:'.75rem',
      fontWeight:'800',marginBottom:'14px'});
    sb.textContent='🔥 Streak : '+streak+' jour'+(streak>1?'s':'');
    card.appendChild(sb);
  }

  // catégorie
  var catBox=div({background:cat.bg,borderRadius:'14px',padding:'10px 14px',
    marginBottom:'16px',display:'flex',alignItems:'center',gap:'10px'});
  var catIcon=div({fontSize:'1.6rem'}); catIcon.textContent=cat.icon;
  var catInfo=div({});
  var catSub=div({fontSize:'.7rem',textTransform:'uppercase',letterSpacing:'1.5px',
    color:cat.color,fontWeight:'800'}); catSub.textContent='Défi du jour';
  var catName=div({fontSize:'.85rem',fontWeight:'700',color:'#2D0A14'});
  catName.textContent=cat.label;
  catInfo.appendChild(catSub); catInfo.appendChild(catName);
  catBox.appendChild(catIcon); catBox.appendChild(catInfo);
  card.appendChild(catBox);

  // numéro
  var numEl=div({fontSize:'.72rem',color:'#8B5A6A',fontWeight:'700',
    marginBottom:'12px',textAlign:'center'});
  numEl.textContent='Défi n°'+(idx+1)+' / 100';
  card.appendChild(numEl);

  // texte
  var txtEl=div({fontSize:'1rem',lineHeight:'1.6',color:'#2D0A14',
    fontWeight:'600',marginBottom:'22px',textAlign:'center'});
  txtEl.textContent=defi.text;
  card.appendChild(txtEl);

  if(done){
    var doneBox=div({background:'#E8FFF4',border:'2px solid #3DBE82',
      borderRadius:'16px',padding:'14px',textAlign:'center',marginBottom:'14px'});
    doneBox.innerHTML='<div style="font-size:1.5rem;margin-bottom:4px;">✅</div>'+
      '<div style="font-weight:800;color:#3DBE82;font-size:.9rem;">Défi accompli aujourd\'hui !</div>'+
      '<div style="font-size:.8rem;color:#2D0A14;margin-top:4px;">Reviens demain pour un nouveau défi 🌸</div>';
    card.appendChild(doneBox);
    card.appendChild(mkBtn('Fermer',GRAD,'white',function(){hideOv(dailyOv);}));
  } else {
    card.appendChild(mkBtn('Défi accompli ! 🌸',GRAD,'white',function(){
      var s=loadSt(), t=todayKey();
      if(!s.done) s.done={};
      s.done[t]=true;
      var yd=new Date(new Date()-86400000);
      var yk=yd.getFullYear()+'-'+String(yd.getMonth()+1).padStart(2,'0')+'-'+String(yd.getDate()).padStart(2,'0');
      s.streak=(s.lastDone===yk)?(s.streak||0)+1:1;
      s.lastDone=t;
      saveSt(s);
      hideOv(dailyOv);
      showToast(cat.icon+' Défi accompli ! 🔥 Streak : '+s.streak);
      refreshDefiNavBtn();
    }));
    var laterBtn=mkBtn('Je le ferai plus tard','transparent','#8B5A6A',function(){
      var s=loadSt(); s.lastShown=todayKey(); s.dismissedToday=true; saveSt(s);
      hideOv(dailyOv);
    });
    laterBtn.style.fontSize='.85rem';
    card.appendChild(laterBtn);
  }

  var foot=div({textAlign:'center',fontSize:'.65rem',color:'#8B5A6A',marginTop:'12px'});
  foot.textContent='© 2026 ONG Happy Mum\'s · La dignité menstruelle est un droit.';
  card.appendChild(foot);

  wrap.appendChild(card);
  dailyOv.appendChild(wrap);
  showOv(dailyOv);
}

function showToast(msg){
  var t=document.createElement('div');
  css(t,{position:'fixed',bottom:'100px',left:'50%',transform:'translateX(-50%)',
    background:GRAD,color:'white',borderRadius:'50px',padding:'12px 22px',
    fontSize:'.9rem',fontWeight:'800',zIndex:'11000',whiteSpace:'nowrap',
    boxShadow:'0 6px 20px rgba(200,16,46,.4)',transition:'opacity .5s'});
  t.textContent=msg;
  document.body.appendChild(t);
  setTimeout(function(){t.style.opacity='0';setTimeout(function(){t.remove();},600);},2400);
}

// ════════════════════════════════════════
// PAGE CONFIDENTIALITÉ (DOM pur, pas de template literals)
// ════════════════════════════════════════
var confidOv;

function buildConfidContent(){
  var sections=[
    ['1. Données collectées',
     'Lors de votre première utilisation, l\'application vous demande votre prénom et votre pays. Ces informations sont stockées uniquement sur votre appareil et ne quittent jamais votre téléphone.'],
    ['2. Stockage local',
     'Toutes vos données (prénom, pays, scores, badges, progression, défis) sont stockées via le stockage local du navigateur (localStorage). Aucun serveur ne reçoit vos données personnelles.'],
    ['3. Google Analytics 4',
     'Nous utilisons GA4 pour mesurer l\'audience de manière anonyme : sections utilisées, catégories jouées, scores agrégés. Ces données ne sont jamais revendues.'],
    ['4. Protection des mineurs',
     'Aucun compte utilisateur. Aucun paiement. Aucune publicité. Aucune donnée sensible collectée. L\'application est conçue pour les jeunes à partir de 10 ans.'],
    ['5. Vos droits',
     'Vous pouvez supprimer vos données en vidant le cache de votre navigateur, ou utiliser le mode navigation privée.'],
    ['6. Contact',
     '📧 onghappymums@gmail.com\n📱 +225 07 13 51 26 98\n🌐 quizdignite.org'],
    ['7. Mentions légales',
     'Éditeur : ONG Happy Mum\'s\nSiège : Abidjan, Côte d\'Ivoire\nRécépissé : N° 0886/PA/CAB — Préfecture d\'Abidjan']
  ];

  var body=div({padding:'20px 16px 80px',maxWidth:'480px',margin:'0 auto'});

  var heroIcon=div({textAlign:'center',fontSize:'3rem',marginBottom:'12px'});
  heroIcon.textContent='🌸';
  body.appendChild(heroIcon);

  var h1=document.createElement('h1');
  css(h1,{textAlign:'center',fontSize:'1.4rem',fontWeight:'800',color:'#C8102E',marginBottom:'4px'});
  h1.textContent='Politique de Confidentialité';
  body.appendChild(h1);

  var sub=div({textAlign:'center',fontSize:'.78rem',color:'#8B5A6A',marginBottom:'20px',lineHeight:'1.6'});
  sub.textContent='Quiz Dignité by ONG Happy Mum\'s — Mai 2026';
  body.appendChild(sub);

  var intro=div({background:'rgba(200,16,46,.06)',borderLeft:'4px solid #C8102E',
    borderRadius:'8px',padding:'12px 14px',marginBottom:'18px',
    fontSize:'.84rem',lineHeight:'1.7',color:'#2D0A14'});
  intro.textContent='Quiz Dignité est une application éducative gratuite développée par ONG Happy Mum\'s, organisation ivoirienne engagée pour la dignité menstruelle et les droits des filles.';
  body.appendChild(intro);

  sections.forEach(function(sec){
    var card=div({background:'white',borderRadius:'16px',padding:'14px 15px',
      marginBottom:'10px',border:'1.5px solid rgba(200,16,46,.1)',
      boxShadow:'0 2px 8px rgba(200,16,46,.06)'});
    var title=div({fontWeight:'800',color:'#C8102E',fontSize:'.9rem',marginBottom:'6px'});
    title.textContent=sec[0];
    var content=div({fontSize:'.83rem',color:'#2D0A14',lineHeight:'1.7',whiteSpace:'pre-line'});
    content.textContent=sec[1];
    card.appendChild(title);
    card.appendChild(content);
    body.appendChild(card);
  });

  var foot=div({textAlign:'center',fontSize:'.66rem',color:'#8B5A6A',marginTop:'18px',opacity:'.7'});
  foot.textContent='© 2026 ONG Happy Mum\'s – Tous droits réservés\nLa dignité menstruelle est un droit. 🌸';
  foot.style.whiteSpace='pre-line';
  body.appendChild(foot);

  return body;
}

function showConfid(){
  confidOv = makeOv('qd-confid-ov');
  confidOv.innerHTML = '';

  // Header
  var hdr=div({position:'sticky',top:'0',zIndex:'1',background:GRAD,
    padding:'14px 18px',display:'flex',alignItems:'center',gap:'12px',
    boxShadow:'0 4px 14px rgba(200,16,46,.3)'});
  var backBtn=document.createElement('button');
  backBtn.textContent='← Retour';
  css(backBtn,{background:'rgba(255,255,255,.2)',border:'none',borderRadius:'10px',
    padding:'7px 14px',color:'white',fontSize:'13px',fontWeight:'700',cursor:'pointer'});
  backBtn.addEventListener('click',function(){hideOv(confidOv);});
  var hTitle=div({color:'white',fontWeight:'800',fontSize:'15px',flex:'1',textAlign:'center'});
  hTitle.textContent='🔐 Confidentialité';
  hdr.appendChild(backBtn);
  hdr.appendChild(hTitle);
  hdr.appendChild(div({width:'60px'}));
  confidOv.appendChild(hdr);
  confidOv.appendChild(buildConfidContent());
  showOv(confidOv);
}

// ════════════════════════════════════════
// INJECTION NAV DU BAS
// ════════════════════════════════════════
var defiNavBtn = null;

function refreshDefiNavBtn(){
  if(!defiNavBtn) return;
  var st=loadSt(), done=!!(st.done && st.done[todayKey()]);
  defiNavBtn.innerHTML='<span style="font-size:1.18rem;">'+(done?'✅':'🎯')+'</span><span>Défi du jour</span>';
}

function injectNav(){
  var nav=document.querySelector('nav');
  if(!nav || nav.dataset.qdDone) return;
  nav.dataset.qdDone='1';

  // Rétrécir les boutons existants
  var existing=Array.from(nav.querySelectorAll('button'));
  existing.forEach(function(b){
    b.style.flex='1';
    b.style.fontSize='.52rem';
    b.style.padding='8px 1px';
    var spans=b.querySelectorAll('span');
    spans.forEach(function(s){
      if(parseFloat(s.style.fontSize||'0')>1) s.style.fontSize='1.15rem';
    });
  });

  // Bouton Défi du jour
  var st=loadSt(), done=!!(st.done && st.done[todayKey()]);
  defiNavBtn=document.createElement('button');
  css(defiNavBtn,{flex:'1',display:'flex',flexDirection:'column',alignItems:'center',
    padding:'9px 1px',cursor:'pointer',border:'none',
    background:'transparent',color:'#C8102E',
    fontSize:'.52rem',fontWeight:'800',gap:'2px',fontFamily:"'Nunito',sans-serif"});
  defiNavBtn.innerHTML='<span style="font-size:1.18rem;">'+(done?'✅':'🎯')+'</span><span>Défi du jour</span>';
  defiNavBtn.addEventListener('click',function(){
    var s=loadSt(); s.dismissedToday=false; saveSt(s);
    showDailyDefi();
  });

  // Bouton Confidentialité
  var confBtn=document.createElement('button');
  css(confBtn,{flex:'1',display:'flex',flexDirection:'column',alignItems:'center',
    padding:'9px 1px',cursor:'pointer',border:'none',
    background:'transparent',color:'#8B5A6A',
    fontSize:'.52rem',fontWeight:'700',gap:'2px',fontFamily:"'Nunito',sans-serif"});
  confBtn.innerHTML='<span style="font-size:1.18rem;">🔐</span><span>Confidentialité</span>';
  confBtn.addEventListener('click',showConfid);

  nav.appendChild(defiNavBtn);
  nav.appendChild(confBtn);
}

// ════════════════════════════════════════
// INIT
// ════════════════════════════════════════
function init(){
  var tries=0;
  var navTimer=setInterval(function(){
    tries++;
    if(document.querySelector('nav')){ clearInterval(navTimer); injectNav(); }
    if(tries>60) clearInterval(navTimer);
  },200);

  setTimeout(function(){
    var st=loadSt(), today=todayKey();
    if(st.lastShown!==today){ showDailyDefi(); }
  },2200);
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',init);
} else { init(); }

})();