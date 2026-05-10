(function(){
'use strict';

// ════════════════════════════════════════
// 100 DEFIS (5 cats x 20)
// ════════════════════════════════════════
var ALL_DEFIS = [
  {cat:'menstruation',text:"Les regles durent en moyenne combien de jours ? Note la date de debut de tes prochaines regles. Connais ton cycle."},
  {cat:'menstruation',text:"Si tu as deja eu tres mal pendant tes regles, dis-toi aujourd'hui : Je merite des regles sans souffrance."},
  {cat:'menstruation',text:"Si quelqu'un te dit que tu es impure pendant tes regles, rappelle-toi : le sang des regles n'est pas sale. C'est ton corps qui se renouvelle."},
  {cat:'menstruation',text:"Bouge doucement aujourd'hui : une marche, quelques etirements. Observe comment ton corps se sent meme pendant tes regles."},
  {cat:'menstruation',text:"Pose une alarme discrete sur ton telephone pour te rappeler de changer ta protection toutes 4 a 6 heures."},
  {cat:'menstruation',text:"Essaie de noter la date de debut de tes prochaines regles. Ton cycle est unique, apprends a le connaitre."},
  {cat:'menstruation',text:"Parle de ce que sont vraiment les regles a une amie aujourd'hui, juste pour normaliser la conversation."},
  {cat:'menstruation',text:"Fais 3 respirations profondes maintenant. Ton corps et ton cycle sont connectes a ton etat emotionnel."},
  {cat:'menstruation',text:"Tu te souviens de tes premieres regles ? Comment tu t'es sentie ? C'est OK de se souvenir et d'en parler."},
  {cat:'menstruation',text:"Pose une question sur la contraception a quelqu'un de confiance ou cherche une info fiable aujourd'hui."},
  {cat:'menstruation',text:"Tu n'as jamais essaye les serviettes lavables ? Renseigne-toi, ca pourrait changer beaucoup de choses."},
  {cat:'menstruation',text:"La prochaine fois que tes regles approchent, essaie de boire plus d'eau. Observe la difference."},
  {cat:'menstruation',text:"Parle de la precarite menstruelle a quelqu'un qui ne sait pas ce que c'est. Une phrase suffit."},
  {cat:'menstruation',text:"Prends soin de toi avec tendresse aujourd'hui, surtout si tu as tes regles. Une douche, c'est OK, c'est meme recommande."},
  {cat:'menstruation',text:"Connais-tu a peu pres quand tu ovules ? Ton cycle a ses propres signaux, apprends a les lire."},
  {cat:'menstruation',text:"Tu connais ton flux habituel ? Commence a l'observer, c'est une info precieuse sur ta sante."},
  {cat:'menstruation',text:"Pose une bouillotte ou bouteille d'eau chaude sur ton ventre si tu as mal. Ca aide vraiment."},
  {cat:'menstruation',text:"Dis le mot regles a voix haute aujourd'hui, sans baisser la voix."},
  {cat:'menstruation',text:"La prochaine fois que tu te sens a fleur de peau sans raison, verifie ou tu en es dans ton cycle."},
  {cat:'menstruation',text:"Si tu souffres vraiment a chaque cycle, note-le et consulte. Ta douleur n'est pas dans ta tete."},
  {cat:'confiance',text:"Dis le mot regles a voix haute aujourd'hui, sans chuchoter, sans rougir. Juste le dire. C'est deja un acte de courage."},
  {cat:'confiance',text:"Calcule la date approximative de tes prochaines regles. Note-la quelque part. Connaitre son corps, c'est du pouvoir."},
  {cat:'confiance',text:"Regarde-toi dans un miroir pendant 30 secondes. Dis une seule chose que tu aimes chez toi. Une seule suffit."},
  {cat:'confiance',text:"Prepare une petite trousse de secours dans ton sac : une protection, un medicament si tu as souvent mal. Tu merites d'etre prete."},
  {cat:'confiance',text:"Aujourd'hui, refuse une remarque blessante sur ton corps, en silence si tu ne peux pas a voix haute."},
  {cat:'confiance',text:"Parle de tes regles a une amie sans baisser la voix. Juste naturellement, comme si c'etait normal. Parce que ca l'est."},
  {cat:'confiance',text:"Ecris 3 mots qui te decrivent telle que tu es, pas telle que les autres voudraient que tu sois."},
  {cat:'confiance',text:"Observe ta couleur de flux lors de tes prochaines regles sans paniquer. Note juste : clair, fonce, abondant, leger."},
  {cat:'confiance',text:"Aujourd'hui, dis non a quelque chose qui ne te convient pas. Meme pour un petit truc. S'affirmer s'apprend."},
  {cat:'confiance',text:"Bois 8 verres d'eau aujourd'hui. Surtout pendant tes regles, ton corps en a besoin."},
  {cat:'confiance',text:"Envoie un message de fierte a une amie. Dis-lui une chose que tu admires en elle. La sororite commence la."},
  {cat:'confiance',text:"Note pendant 3 jours comment tu te sens avant tes regles, humeur, energie, ventre. Tu vas commencer a voir un schema."},
  {cat:'confiance',text:"Aujourd'hui, occupe l'espace. Parle en classe, leve la main, donne ton avis. Meme si ta voix tremble."},
  {cat:'confiance',text:"Parle a ta maman, grande soeur ou tante de tes regles. Une vraie conversation. Demande-lui comment ca se passait pour elle."},
  {cat:'confiance',text:"Fais une liste de 5 choses que tu sais faire. Pas des qualites, des competences. Cuisine, coiffure, maths, ecoute, danse."},
  {cat:'confiance',text:"Si tu as mal pendant tes regles, essaie une bouillotte sur le ventre ce soir. Note si ca aide."},
  {cat:'confiance',text:"Aujourd'hui, ne t'excuse pas d'exister. Observe combien de fois tu dis desole. C'est le debut."},
  {cat:'confiance',text:"Explique a un garcon de ton entourage ce que sont les regles en une phrase simple. Sans gene. Il a besoin de savoir."},
  {cat:'confiance',text:"Ecris sur un papier une peur que tu gardes pour toi. Tu n'as pas a la montrer. Juste la nommer, c'est deja la reduire."},
  {cat:'confiance',text:"Aujourd'hui, compare-toi seulement a toi d'hier. Pas aux autres filles. Pas aux reseaux sociaux. Juste : est-ce que j'avance ?"},
  {cat:'parole',text:"Aujourd'hui, apprends le nom scientifique d'une partie de ton corps que tu n'as jamais ose prononcer. Ton corps merite d'etre connu et nomme correctement."},
  {cat:'parole',text:"Aujourd'hui, pose une question sur ton corps a un adulte de confiance. Une vraie question que tu n'as jamais ose poser."},
  {cat:'parole',text:"Si quelqu'un fait une blague sur les regles devant toi aujourd'hui, ne ris pas pour faire plaisir. Reste silencieuse ou dis simplement : C'est pas drole."},
  {cat:'parole',text:"Ecris sur un papier un mythe sur les regles que tu as deja cru. Barre-le. Il n'a plus de pouvoir sur toi."},
  {cat:'parole',text:"Aujourd'hui, nomme une douleur que tu gardes pour toi d'habitude. A toi-meme, a une amie, ou juste sur papier. Nommer c'est exister."},
  {cat:'parole',text:"Dis a quelqu'un j'ai mes regles sans chercher un mot de remplacement. Pas mes affaires, pas mes trucs. Les regles."},
  {cat:'parole',text:"Trouve une adulte, maman, tante, prof, et demande-lui comment elle vivait ses regles a ton age. Ecoute vraiment sa reponse."},
  {cat:'parole',text:"Aujourd'hui, corrige une fausse info sur le corps feminin si tu en entends une. Doucement, mais clairement."},
  {cat:'parole',text:"Parle de la precarite menstruelle a quelqu'un qui ne sait pas ce que c'est. Une phrase suffit. Tu peux changer une vision."},
  {cat:'parole',text:"Si tu as deja eu honte de tes regles, ecris pourquoi. Pas pour garder la honte, pour la comprendre et la laisser partir."},
  {cat:'parole',text:"Aujourd'hui, explique l'ovulation a quelqu'un en une phrase simple. Si tu ne sais pas encore, cherche, puis explique."},
  {cat:'parole',text:"Dis a voix haute : Mon corps ne me fait pas honte. Une fois. Devant ton miroir. Meme si tu n'y crois pas encore totalement."},
  {cat:'parole',text:"Trouve un mot en ta langue locale pour designer les regles. Reflechis a ce que ce mot dit de la facon dont on voit les femmes."},
  {cat:'parole',text:"Aujourd'hui, refuse d'utiliser un euphemisme pour parler de ton corps. Appelle les choses par leur nom pendant toute la journee."},
  {cat:'parole',text:"Si tu connais une fille plus jeune que toi, dis-lui une verite sur les regles que tu aurais aime savoir a son age."},
  {cat:'parole',text:"Ecris une question que tu n'as jamais ose poser sur ton corps. Garde-la. Cherche la reponse avant la fin de la semaine."},
  {cat:'parole',text:"Aujourd'hui, parle de tes regles sans t'excuser de les mentionner. Pas de desole c'est genant mais. Juste la phrase."},
  {cat:'parole',text:"Dis a un garcon de ton entourage une vraie info sur le cycle menstruel. Sans gene, comme tu lui parlerais de meteo."},
  {cat:'parole',text:"Pense a un tabou lie au corps feminin dans ta famille ou ta communaute. Ecris-le. Tu n'as pas a l'accepter parce qu'il existe depuis longtemps."},
  {cat:'parole',text:"Aujourd'hui, parle de toi a la premiere personne. Je pense que, Je veux, Je ressens. Ta voix compte. Elle a toujours compte."},
  {cat:'sororite',text:"Passe une serviette hygienique a une amie sans qu'elle ait a demander deux fois. La solidarite ne se fait pas attendre."},
  {cat:'sororite',text:"Aujourd'hui, defends une fille qu'on critique pour son corps, son poids, sa taille, sa peau. Une phrase suffit."},
  {cat:'sororite',text:"Envoie un message vocal ou ecrit a une amie pour lui dire une chose vraie et belle sur elle. Pas un emoji, des mots."},
  {cat:'sororite',text:"Si une amie a ses regles et se sent mal, propose-lui quelque chose de concret : une bouillotte, t'asseoir avec elle, lui apporter de l'eau."},
  {cat:'sororite',text:"Aujourd'hui, ne participe pas aux ragots sur le corps ou la vie intime d'une autre fille. Sors de la conversation si tu dois."},
  {cat:'sororite',text:"Pense a une fille que tu admires dans ton entourage. Dis-le lui directement aujourd'hui. On ne le dit pas assez."},
  {cat:'sororite',text:"Si tu vois une fille mal a l'aise ou en difficulte aujourd'hui, approche-toi. Demande juste : Ca va ?"},
  {cat:'sororite',text:"Partage une info utile sur la sante menstruelle dans un groupe WhatsApp de filles. Pas un cours, juste une chose simple et vraie."},
  {cat:'sororite',text:"Aujourd'hui, celebre la reussite d'une amie sans jalousie. Sa victoire ne diminue pas la tienne."},
  {cat:'sororite',text:"Pense a une fille que tu as jugee sans la connaitre. Decide aujourd'hui de la voir differemment."},
  {cat:'sororite',text:"Si une amie te parle de douleurs menstruelles, ne lui dis pas c'est normal, supporte. Ecoute-la vraiment."},
  {cat:'sororite',text:"Invite une amie a faire le Quiz Dignite avec toi. Comparez vos resultats. Riez, apprenez, grandissez ensemble."},
  {cat:'sororite',text:"Aujourd'hui, prete quelque chose sans attendre qu'on te le rende : un stylo, une protection, un sourire."},
  {cat:'sororite',text:"Si tu es en position d'aider une fille plus jeune, fais-le. Reponds a une question, rassure, accompagne."},
  {cat:'sororite',text:"Rappelle a une amie qu'elle a le droit de dire non, a une sortie, une pression, une situation qui ne lui convient pas."},
  {cat:'sororite',text:"Aujourd'hui, ecoute une amie sans chercher a donner des conseils. Juste ecouter. C'est deja enorme."},
  {cat:'sororite',text:"Pense a une fille qui manque de protections menstruelles pres de toi. Qu'est-ce que tu pourrais faire concretement ?"},
  {cat:'sororite',text:"Dis a une amie : Tu n'as pas a souffrir en silence. Ces 6 mots peuvent changer sa journee."},
  {cat:'sororite',text:"Cree ou rejoins un espace de parole entre filles, meme informel, meme 3 personnes. Les filles ont besoin de se parler."},
  {cat:'sororite',text:"Aujourd'hui, sois la grande soeur que tu aurais voulu avoir. Pour une fille autour de toi. Juste aujourd'hui."},
  {cat:'bienetre',text:"Dors 8 heures cette nuit. Pas de negociation. Ton corps reconstruit tout pendant que tu dors."},
  {cat:'bienetre',text:"Bois 1,5 litre d'eau aujourd'hui. Pose une bouteille devant toi des le matin. Ton cycle menstruel te remerciera."},
  {cat:'bienetre',text:"Fais 10 minutes d'etirements ce soir avant de dormir. Pas du sport, juste laisser ton corps se deposer."},
  {cat:'bienetre',text:"Mange un fruit ou un legume aujourd'hui que tu n'as pas l'habitude de manger. Ton corps aime la variete."},
  {cat:'bienetre',text:"Pose une main sur ton ventre. Respire profondement 5 fois. Sens ton corps vivant. C'est tout. C'est suffisant."},
  {cat:'bienetre',text:"Aujourd'hui, repose-toi sans culpabilite. Se reposer n'est pas de la paresse. C'est du soin."},
  {cat:'bienetre',text:"Note dans un carnet ou ton telephone comment tu te sens physiquement aujourd'hui. Energie, ventre, tete. Juste observer."},
  {cat:'bienetre',text:"Danse seule dans ta chambre pendant une chanson. Ton corps merite de bouger pour le plaisir, pas seulement pour les autres."},
  {cat:'bienetre',text:"Mange lentement a un repas aujourd'hui. Pose ta fourchette entre chaque bouchee. Ecoute quand ton corps dit c'est assez."},
  {cat:'bienetre',text:"Identifie une tension dans ton corps : epaules, machoire, ventre. Respire dessus. Laisse-la partir doucement."},
  {cat:'bienetre',text:"Aujourd'hui, limite les reseaux sociaux a 30 minutes. Observe comment tu te sens dans ton corps quand tu decroches."},
  {cat:'bienetre',text:"Marche 20 minutes dehors aujourd'hui. Pas pour maigrir. Pour te sentir vivante et presente dans ton corps."},
  {cat:'bienetre',text:"Prends une douche en prenant le temps, pas en vitesse. Ton corps merite qu'on s'occupe de lui avec attention."},
  {cat:'bienetre',text:"Ce soir, ecris 3 sensations positives que ton corps t'a offertes aujourd'hui. La chaleur du soleil, un bon repas, un fou rire."},
  {cat:'bienetre',text:"Aujourd'hui, ne saute aucun repas. Ton corps a besoin de carburant regulier, surtout pendant et avant tes regles."},
  {cat:'bienetre',text:"Identifie un aliment que tu manges quand tu as tes regles qui aggrave tes douleurs. Essaie de le reduire cette fois."},
  {cat:'bienetre',text:"Ris aujourd'hui, vraiment. Cherche quelque chose qui te fait rire. Le rire est une medecine que personne ne te prescrit assez."},
  {cat:'bienetre',text:"Aujourd'hui, touche ton corps avec bienveillance, pas pour le juger, pas pour le comparer. Juste te dire : ce corps est a moi."},
  {cat:'bienetre',text:"Dors tot ce soir, avant 22h si tu peux. Observe demain matin comment tu te reveilles differemment."},
  {cat:'bienetre',text:"Ecris une lettre d'une phrase a ton corps : Ce que je veux pour toi cette annee, c'est... Tu n'as pas a la montrer. Juste l'ecrire."}
];

var CAT_META = {
  menstruation:{icon:'menstruation',label:'Menstruation',color:'#C8102E',bg:'#FFE8EC'},
  confiance:   {icon:'confiance',   label:'Confiance',   color:'#9B5DE5',bg:'#F0E8FF'},
  parole:      {icon:'parole',      label:'Parole et Tabous',color:'#F59E0B',bg:'#FEF9C3'},
  sororite:    {icon:'sororite',    label:'Sororite',    color:'#3DBE82',bg:'#E8FFF4'},
  bienetre:    {icon:'bienetre',    label:'Corps et Bien-etre',color:'#4FB3F6',bg:'#EBF7FF'}
};

var GRAD = 'linear-gradient(135deg,#C8102E 0%,#E8426A 40%,#FF6B9D 75%,#FF8C69 100%)';

// ════════════════════════════
// STORAGE
// ════════════════════════════
function loadSt(){ try{return JSON.parse(localStorage.getItem('qd_daily')||'{}')}catch{return{}} }
function saveSt(s){ try{localStorage.setItem('qd_daily',JSON.stringify(s))}catch{} }

function todayKey(){
  var d=new Date();
  return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
}

function dayIndex(){
  var launch=new Date('2026-05-10');
  var now=new Date();
  var today=new Date(now.getFullYear(),now.getMonth(),now.getDate());
  var launchDay=new Date(launch.getFullYear(),launch.getMonth(),launch.getDate());
  var diff=Math.floor((today-launchDay)/86400000);
  return ((diff%100)+100)%100;
}

// ════════════════════════════
// DOM HELPERS
// ════════════════════════════
function css(el,styles){ Object.assign(el.style,styles); return el; }

function div(styles){
  var d=document.createElement('div');
  if(styles) css(d,styles);
  return d;
}

function mkBtn(text,bg,color,onClick){
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

// ════════════════════════════
// DEFI QUOTIDIEN
// ════════════════════════════
var dailyOv;

function showDailyDefi(){
  dailyOv=makeOv('qd-daily-ov');
  dailyOv.innerHTML='';

  var st=loadSt(), today=todayKey();
  var idx=dayIndex(), defi=ALL_DEFIS[idx], cat=CAT_META[defi.cat];
  var done=!!(st.done && st.done[today]);
  var streak=st.streak||0;

  var wrap=div({minHeight:'100vh',display:'flex',flexDirection:'column',
    alignItems:'center',justifyContent:'center',padding:'24px 18px'});

  var card=div({background:'white',borderRadius:'28px',padding:'28px 22px',
    maxWidth:'420px',width:'100%',
    boxShadow:'0 12px 40px rgba(200,16,46,.2)',
    border:'2px solid '+cat.color+'33'});

  if(streak>0){
    var sb=div({display:'inline-block',background:GRAD,color:'white',
      borderRadius:'50px',padding:'4px 14px',fontSize:'.75rem',
      fontWeight:'800',marginBottom:'14px'});
    sb.textContent='Streak : '+streak+' jour'+(streak>1?'s':'');
    card.appendChild(sb);
  }

  var catBox=div({background:cat.bg,borderRadius:'14px',padding:'10px 14px',
    marginBottom:'16px',display:'flex',alignItems:'center',gap:'10px'});
  var catSub=div({fontSize:'.7rem',textTransform:'uppercase',letterSpacing:'1.5px',
    color:cat.color,fontWeight:'800'});
  catSub.textContent='Defi du jour';
  var catName=div({fontSize:'.85rem',fontWeight:'700',color:'#2D0A14'});
  catName.textContent=cat.label;
  var catInfo=div({});
  catInfo.appendChild(catSub);
  catInfo.appendChild(catName);
  catBox.appendChild(catInfo);
  card.appendChild(catBox);

  var numEl=div({fontSize:'.72rem',color:'#8B5A6A',fontWeight:'700',
    marginBottom:'12px',textAlign:'center'});
  numEl.textContent='Defi n°'+(idx+1)+' / 100';
  card.appendChild(numEl);

  var txtEl=div({fontSize:'1rem',lineHeight:'1.6',color:'#2D0A14',
    fontWeight:'600',marginBottom:'22px',textAlign:'center'});
  txtEl.textContent=defi.text;
  card.appendChild(txtEl);

  if(done){
    var doneBox=div({background:'#E8FFF4',border:'2px solid #3DBE82',
      borderRadius:'16px',padding:'14px',textAlign:'center',marginBottom:'14px'});
    doneBox.innerHTML='<div style="font-size:1.5rem;margin-bottom:4px;">OK</div>'+
      '<div style="font-weight:800;color:#3DBE82;font-size:.9rem;">Defi accompli aujourd\'hui !</div>'+
      '<div style="font-size:.8rem;color:#2D0A14;margin-top:4px;">Reviens demain pour un nouveau defi</div>';
    card.appendChild(doneBox);
    card.appendChild(mkBtn('Fermer',GRAD,'white',function(){hideOv(dailyOv);}));
  } else {
    card.appendChild(mkBtn('Defi accompli !',GRAD,'white',function(){
      var s=loadSt(), t=todayKey();
      if(!s.done) s.done={};
      s.done[t]=true;
      s.lastShown=t;
      var yd=new Date(new Date()-86400000);
      var yk=yd.getFullYear()+'-'+String(yd.getMonth()+1).padStart(2,'0')+'-'+String(yd.getDate()).padStart(2,'0');
      s.streak=(s.lastDone===yk)?(s.streak||0)+1:1;
      s.lastDone=t;
      saveSt(s);
      hideOv(dailyOv);
      showToast('Defi accompli ! Streak : '+s.streak);
    }));
    var laterBtn=mkBtn('Je le ferai plus tard','transparent','#8B5A6A',function(){
      var s=loadSt(); s.lastShown=todayKey(); s.dismissedToday=true; saveSt(s);
      hideOv(dailyOv);
    });
    laterBtn.style.fontSize='.85rem';
    card.appendChild(laterBtn);
  }

  var foot=div({textAlign:'center',fontSize:'.65rem',color:'#8B5A6A',marginTop:'12px'});
  foot.textContent='ONG Happy Mum\'s - La dignite menstruelle est un droit.';
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

// ════════════════════════════
// CONFIDENTIALITE
// ════════════════════════════
var confidOv;

function buildConfidContent(){
  var sections=[
    ['1. Donnees collectees','Lors de votre premiere utilisation, l\'application vous demande votre prenom et votre pays. Ces informations sont stockees uniquement sur votre appareil.'],
    ['2. Stockage local','Toutes vos donnees sont stockees via localStorage. Aucun serveur ne recoit vos donnees personnelles.'],
    ['3. Google Analytics 4','Nous utilisons GA4 pour mesurer l\'audience de maniere anonyme. Ces donnees ne sont jamais revendues.'],
    ['4. Protection des mineurs','Aucun compte utilisateur. Aucun paiement. Aucune publicite. Application concue pour les jeunes a partir de 10 ans.'],
    ['5. Vos droits','Vous pouvez supprimer vos donnees en vidant le cache de votre navigateur.'],
    ['6. Contact','onghappymums@gmail.com\n+225 07 13 51 26 98\nquizdignite.org'],
    ['7. Mentions legales','Editeur : ONG Happy Mum\'s\nSiege : Abidjan, Cote d\'Ivoire\nRecepisse : N 0886/PA/CAB']
  ];

  var body=div({padding:'20px 16px 80px',maxWidth:'480px',margin:'0 auto'});

  var h1=document.createElement('h1');
  css(h1,{textAlign:'center',fontSize:'1.4rem',fontWeight:'800',color:'#C8102E',marginBottom:'4px'});
  h1.textContent='Politique de Confidentialite';
  body.appendChild(h1);

  var sub=div({textAlign:'center',fontSize:'.78rem',color:'#8B5A6A',marginBottom:'20px'});
  sub.textContent='Quiz Dignite by ONG Happy Mum\'s - Mai 2026';
  body.appendChild(sub);

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

  return body;
}

function showConfid(){
  confidOv=makeOv('qd-confid-ov');
  confidOv.innerHTML='';

  var hdr=div({position:'sticky',top:'0',zIndex:'1',background:GRAD,
    padding:'14px 18px',display:'flex',alignItems:'center',gap:'12px',
    boxShadow:'0 4px 14px rgba(200,16,46,.3)'});
  var backBtn=document.createElement('button');
  backBtn.textContent='Retour';
  css(backBtn,{background:'rgba(255,255,255,.2)',border:'none',borderRadius:'10px',
    padding:'7px 14px',color:'white',fontSize:'13px',fontWeight:'700',cursor:'pointer'});
  backBtn.addEventListener('click',function(){hideOv(confidOv);});
  var hTitle=div({color:'white',fontWeight:'800',fontSize:'15px',flex:'1',textAlign:'center'});
  hTitle.textContent='Confidentialite';
  hdr.appendChild(backBtn);
  hdr.appendChild(hTitle);
  hdr.appendChild(div({width:'60px'}));
  confidOv.appendChild(hdr);
  confidOv.appendChild(buildConfidContent());
  showOv(confidOv);
}

// ════════════════════════════
// NAV : Confidentialite uniquement
// ════════════════════════════
function injectNav(){
  var nav=document.querySelector('nav');
  if(!nav || nav.dataset.qdDone) return;
  nav.dataset.qdDone='1';

  var existing=Array.from(nav.querySelectorAll('button'));
  existing.forEach(function(b){
    b.style.flex='1';
    b.style.fontSize='.52rem';
    b.style.padding='8px 1px';
  });

  var confBtn=document.createElement('button');
  css(confBtn,{flex:'1',display:'flex',flexDirection:'column',alignItems:'center',
    padding:'9px 1px',cursor:'pointer',border:'none',
    background:'transparent',color:'#8B5A6A',
    fontSize:'.52rem',fontWeight:'700',gap:'2px',fontFamily:"'Nunito',sans-serif"});
  confBtn.innerHTML='<span style="font-size:1.18rem;">&#128274;</span><span>Confidentialite</span>';
  confBtn.addEventListener('click',showConfid);
  nav.appendChild(confBtn);
}

// ════════════════════════════
// EXPOSER POUR APP.JSX
// ════════════════════════════
window.qdShowDailyDefi = showDailyDefi;

// ════════════════════════════
// INIT
// ════════════════════════════
function init(){
  var observer=new MutationObserver(function(){
    var nav=document.querySelector('nav');
    if(nav && !nav.dataset.qdDone){ injectNav(); }
  });
  observer.observe(document.body,{childList:true,subtree:true});
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',init);
} else { init(); }

})();
