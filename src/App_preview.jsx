import { useState, useEffect, useRef } from "react";

const LOGO = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgcng9IjEwMCIgZmlsbD0iI0U4MDAzRCIvPgogIDx0ZXh0IHg9IjEwMCIgeT0iODUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjI4IiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1mYW1pbHk9IkFyaWFsIj5RdWl6PC90ZXh0PgogIDx0ZXh0IHg9IjEwMCIgeT0iMTE4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjRkZENzAwIiBmb250LXNpemU9IjIyIiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1mYW1pbHk9IkFyaWFsIj5ESUdOSVRFPC90ZXh0PgogIDx0ZXh0IHg9IjEwMCIgeT0iMTQ4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxMiIgZm9udC1mYW1pbHk9IkFyaWFsIj5ieSBIYXBweSBNdW0nczwvdGV4dD4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSI1NSIgcj0iMTgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4yKSIvPgo8L3N2Zz4=";
const shuffle = a => [...a].sort(() => Math.random() - 0.5);

/* ── AUDIO ─────────────────────────────── */
let AC = null;
function getAC() {
  try {
    if (!AC) AC = new (window.AudioContext || window.webkitAudioContext)();
    if (AC.state === "suspended") AC.resume();
    return AC;
  } catch { return null; }
}
function beep(freq, type, vol, dt, dur) {
  const c = getAC(); if (!c) return;
  const o = c.createOscillator(), g = c.createGain();
  o.connect(g); g.connect(c.destination);
  o.type = type; o.frequency.value = freq;
  g.gain.setValueAtTime(vol, c.currentTime + dt);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dt + dur);
  o.start(c.currentTime + dt); o.stop(c.currentTime + dt + dur);
}
const SFX = {
  ok:    () => [[523,0],[659,.1],[784,.2],[1047,.32]].forEach(([f,t]) => beep(f,"sine",.22,t,.2)),
  err:   () => { beep(220,"sawtooth",.15,0,.1); beep(150,"sawtooth",.1,.13,.28); },
  tick:  () => beep(880,"sine",.06,0,.05),
  win:   () => [[523,0],[659,.12],[784,.25],[1047,.4],[1319,.56]].forEach(([f,t]) => beep(f,"triangle",.2,t,.18)),
  click: () => beep(600,"sine",.08,0,.06),
  start: () => [[392,0],[523,.12],[659,.24]].forEach(([f,t]) => beep(f,"sine",.18,t,.15)),
};
function play(n, on) { if (on && SFX[n]) try { SFX[n](); } catch {} }

/* ── GA4 ────────────────────────────────── */
const ga = (e, p={}) => { try { window.gtag?.("event", e, p); } catch {} };

/* ── QUESTION BUILDERS ──────────────────── */
const Q  = (q,a,b,c,d,ok,ex) => ({q, answers:[a,b,c,d], correct:ok, ex});
const VF = (q,ok,ex)          => ({q, answers:["Vrai","Faux"], correct:ok?0:1, ex});
const MR = (q,ok,ex)          => ({q, answers:["Mythe","Réalité"], correct:ok?0:1, ex});

/* ── QUESTIONS ──────────────────────────── */
const DB = {
  fille: {
    qcm: [
      Q("Combien de jours dure en moyenne un cycle menstruel ?","14 jours","28 jours","7 jours","45 jours",1,"Un cycle dure en moyenne 28 jours, mais peut varier entre 21 et 35 jours selon chaque femme."),
      Q("Combien de jours durent les règles en général ?","1 jour","3 à 7 jours","15 jours","1 mois",1,"Les règles durent entre 3 et 7 jours. C'est différent pour chaque fille, et c'est normal !"),
      Q("À quel âge apparaissent généralement les premières règles ?","6-8 ans","10-16 ans","18-20 ans","Toujours à 12 ans",1,"Les premières règles arrivent entre 10 et 16 ans. Un peu avant ou après, c'est tout à fait normal."),
      Q("Combien de fois par jour faut-il changer sa protection ?","1 fois","Toutes les 4-8 heures","1 fois par semaine","Jamais",1,"Changer toutes les 4 à 8 heures évite les infections et les odeurs. Prends soin de toi !"),
      Q("Peut-on faire du sport pendant ses règles ?","Non, c'est dangereux","Oui, cela peut soulager les douleurs","Seulement marcher","Non, jamais",1,"Le sport libère des endorphines qui réduisent naturellement les crampes. Bouge !"),
      Q("Qu'est-ce qu'une cup menstruelle ?","Une boisson","Un médicament","Un récipient réutilisable qui recueille le sang","Un tampon jetable",2,"La cup est en silicone, réutilisable pendant des années. Écologique et économique !"),
      Q("Quel organe produit les ovules ?","L'utérus","Le vagin","Les ovaires","Le col de l'utérus",2,"Les ovaires produisent les ovules. Chaque mois, un ovule est libéré lors de l'ovulation."),
      Q("La couleur du sang des règles peut-elle varier ?","Non, toujours rouge vif","Oui, du rouge clair au brun","Elle est toujours noire","Seulement si malade",1,"La couleur varie naturellement selon le flux. Tout à fait normal !"),
      Q("Qu'est-ce que la précarité menstruelle ?","Des règles douloureuses","Ne pas avoir accès aux protections hygiéniques","Des règles abondantes","L'absence de règles",1,"La précarité menstruelle prive des milliers de filles d'éducation. ONG Happy Mum's agit chaque jour !"),
      Q("Qu'est-ce que l'endométriose ?","Des règles normales","Une maladie où le tissu utérin pousse hors de l'utérus","Une infection","L'absence de règles",1,"L'endométriose touche 1 femme sur 10. Des douleurs très intenses méritent une consultation médicale."),
    ],
    vf: [
      VF("Les règles sont une maladie.", false, "Les règles sont un processus naturel et normal du corps féminin. Pas une maladie !"),
      VF("On peut tomber enceinte pendant ses règles.", true, "C'est rare mais possible, surtout avec des cycles courts. Mieux vaut le savoir !"),
      VF("Le sang des règles est sale et contaminé.", false, "Le sang menstruel est du tissu utérin et du sang normal. Il n'est pas dangereux."),
      VF("Il est normal d'avoir des règles irrégulières au début.", true, "Les premiers cycles peuvent être irréguliers pendant 1 à 2 ans. Ton corps apprend !"),
      VF("Se laver tous les jours pendant les règles est important.", true, "Une bonne hygiène intime est encore plus essentielle pendant les règles."),
      VF("Les règles durent toujours exactement 28 jours.", false, "Un cycle varie entre 21 et 35 jours selon les femmes. Il n'y a pas de durée unique."),
      VF("Une fille en règles peut aller à l'école normalement.", true, "Les règles ne doivent jamais t'empêcher d'aller à l'école. Tu as ce droit !"),
      VF("Une douleur très intense pendant les règles est toujours normale.", false, "Une douleur intense peut indiquer une endométriose. Consulte un médecin."),
      VF("On peut nager pendant ses règles avec une cup ou un tampon.", true, "Avec les bonnes protections, tu peux tout faire, même nager !"),
      VF("Les règles disparaissent définitivement à la ménopause.", true, "La ménopause marque la fin des règles, généralement entre 45 et 55 ans."),
    ],
    mr: [
      MR("Les femmes en règles ne peuvent pas cuisiner, les plats vont tourner.", true, "Aucune base scientifique ! Les règles n'affectent absolument pas les aliments."),
      MR("Le sang des règles attire les animaux sauvages.", true, "Aucune preuve scientifique. C'est un mythe infondé."),
      MR("Se laver les cheveux pendant les règles rend malade.", true, "Au contraire ! Une bonne hygiène est essentielle pendant les règles."),
      MR("Une fille en règles est impure.", true, "Les règles sont un processus naturel. Aucune femme n'est impure à cause de son cycle !"),
      MR("Les douleurs menstruelles intenses sont normales et il faut les endurer.", true, "Une douleur intense peut signaler l'endométriose. Ne souffre pas en silence !"),
      MR("Les premières règles signifient qu'une fille est prête pour le mariage.", true, "Les premières règles sont un signe de puberté, PAS de maturité maritale !"),
      MR("Certains endroits en Côte d'Ivoire offrent des protections gratuites.", false, "Vrai ! ONG Happy Mum's installe des Box de Dignité à Abidjan et Bouaké."),
      MR("Les règles rendent les femmes moins intelligentes.", true, "FAUX ! Les règles n'affectent absolument pas les capacités intellectuelles."),
      MR("Avoir ses premières règles à 10 ans est anormal.", true, "La puberté peut commencer entre 8 et 16 ans. 10 ans est dans la norme."),
      MR("Après les premières règles, une grossesse est possible.", false, "Oui, c'est la réalité ! Important à savoir pour se protéger."),
    ],
  },
  garcon: {
    qcm: [
      Q("Les règles, qu'est-ce que c'est ?","Une maladie grave","Un processus naturel du corps féminin","Une chose honteuse","Un choix",1,"Les règles sont un phénomène biologique normal. Comprendre cela fait de toi un meilleur allié."),
      Q("Durée moyenne d'un cycle menstruel ?","7 jours","14 jours","28 jours","60 jours",2,"Comprendre le cycle aide à être respectueux envers les femmes de ta vie."),
      Q("Qu'est-ce que la précarité menstruelle ?","Des règles douloureuses","Ne pas avoir accès aux protections","Trop de règles","Pas de règles",1,"Des millions de filles ne peuvent pas acheter des protections. C'est injuste !"),
      Q("Comment soutenir une fille pendant ses règles ?","Se moquer","L'ignorer","Être respectueux et empathique","Lui dire que c'est sa faute",2,"L'empathie et le respect font de toi un vrai allié."),
      Q("Pourquoi des filles manquent-elles l'école pendant leurs règles ?","Elles n'aiment pas l'école","Manque de protections et toilettes adaptées","Les règles les rendent paresseuses","C'est interdit",1,"Le manque d'infrastructures prive des milliers de filles d'éducation. C'est injuste !"),
      Q("Qu'est-ce que le consentement ?","Faire ce qu'on veut","Accepter librement et sans pression","Obéir toujours","Donner de l'argent",1,"Le consentement c'est dire OUI librement. Sans pression. C'est la base absolue."),
      Q("Pourquoi parler des règles concerne aussi les garçons ?","C'est un sujet de filles","Cela concerne toute la société","C'est tabou","Pas besoin",1,"Briser le tabou c'est l'affaire de tous. Un garçon informé est un meilleur citoyen."),
      Q("Que signifie respecter le corps d'une fille ?","La surveiller","Respecter ses choix et son espace personnel","Décider pour elle","L'ignorer",1,"Chaque personne est maître de son corps. Le respect c'est la base."),
      Q("Quel est le rôle d'un frère respectueux ?","Contrôler sa soeur","Protéger et soutenir avec bienveillance","Décider à sa place","L'ignorer",1,"Un frère bienveillant crée un espace sûr pour sa soeur. C'est une vraie force."),
      Q("Qu'est-ce qu'une MGF ?","Un traitement médical","Une pratique néfaste et illégale","Un rite inoffensif","Un médicament",1,"Les MGF sont des violations graves des droits humains, interdites dans de nombreux pays."),
    ],
    vf: [
      VF("Se moquer d'une fille qui a ses règles est acceptable.", false, "Se moquer cause de la honte. Sois un allié, pas un obstacle."),
      VF("Les garçons peuvent apprendre des choses utiles sur les règles.", true, "Comprendre le corps des femmes rend les garçons plus empathiques et respectueux."),
      VF("Une fille en règles est moins intelligente ou moins capable.", false, "Les règles n'affectent pas les capacités intellectuelles. C'est faux et blessant."),
      VF("Le mariage précoce des filles est une violation de leurs droits.", true, "L'âge légal du mariage est 18 ans en Côte d'Ivoire."),
      VF("Un garçon qui aide sa soeur avec ses protections est moins masculin.", false, "Au contraire, c'est un signe de maturité et de respect."),
      VF("Les femmes ont le droit de décider de leur propre corps.", true, "L'autodétermination corporelle est un droit fondamental."),
      VF("Parler des règles rend un garçon moins masculin.", false, "La connaissance n'a pas de genre. Un garçon informé est un meilleur citoyen."),
      VF("Un garçon doit toujours respecter le non d'une fille.", true, "Le consentement est non négociable. Non signifie non. Toujours."),
      VF("Les violences contre les femmes ne concernent que les femmes.", false, "La lutte contre les violences est l'affaire de toute la société."),
      VF("Des garçons peuvent être des alliés dans la lutte pour les droits des filles.", true, "Absolument ! Les mouvements pour l'égalité ont besoin des garçons."),
    ],
    mr: [
      MR("Les garçons n'ont pas besoin de comprendre les règles.", true, "Comprendre le corps féminin aide à être respectueux et responsable."),
      MR("En Côte d'Ivoire, le mariage légal est fixé à 18 ans pour tous.", false, "Vrai ! Le Code civil ivoirien fixe l'âge du mariage à 18 ans pour les deux sexes."),
      MR("Si une fille dit non, c'est qu'elle veut dire oui.", true, "Non signifie non. Toujours. Sans exception."),
      MR("Des garçons peuvent être alliés des droits des filles.", false, "Vrai ! Les mouvements pour l'égalité ont besoin des garçons."),
      MR("Le mariage précoce protège les filles.", true, "Au contraire, il prive les filles d'éducation et de liberté. C'est une violence."),
      MR("Les violences faites aux femmes concernent toute la société.", false, "Vrai ! La lutte contre les violences est l'affaire de tous."),
      MR("Un garçon qui exprime ses émotions est faible.", true, "Les émotions sont humaines. Un garçon qui les exprime est plus empathique."),
      MR("ONG Happy Mum's travaille pour les droits des filles depuis 2019.", false, "Vrai ! Happy Mum's milite pour la dignité menstruelle en Côte d'Ivoire."),
      MR("Les règles sont un sujet honteux qu'on ne doit jamais évoquer.", true, "Briser ce tabou c'est protéger les filles. La connaissance est un acte de respect."),
      MR("Forcer quelqu'un à faire quelque chose contre sa volonté est un crime.", false, "Vrai ! La contrainte est punie par la loi. Le consentement est un droit fondamental."),
    ],
  },
  parent: {
    qcm: [
      Q("À quel âge faut-il parler des règles à sa fille ?","Après les premières règles","Avant les premières règles, dès 8-9 ans","À 18 ans","Jamais",1,"Parler des règles avant qu'elles arrivent prépare la fille et réduit la peur et la honte."),
      Q("Comment réagir quand sa fille a ses premières règles ?","La gronder","L'ignorer","Accueillir avec bienveillance et expliquer","Lui dire que c'est honteux",2,"La première réaction d'un parent marque la relation de la fille avec son corps pour longtemps."),
      Q("Quel signal doit alerter un parent ?","Des règles régulières","Une fille qui cache ses règles par honte","Des douleurs légères","Des règles à 12 ans",1,"Une fille qui cache ses règles par honte a besoin d'un espace de parole bienveillant."),
      Q("Comment créer un espace de dialogue sur les règles ?","Attendre qu'elle pose des questions","Initier la conversation avec calme et sans jugement","Lui donner un livre","Lui interdire d'en parler",1,"Les parents qui parlent ouvertement de la santé menstruelle protègent mieux leurs enfants."),
      Q("Que faire si une fille souffre beaucoup pendant ses règles ?","Lui dire d'endurer","La consulter chez un médecin","L'ignorer","Lui donner n'importe quel médicament",1,"Une douleur intense peut signaler une endométriose. Une consultation médicale est indispensable."),
      Q("Comment parler des règles aux garçons de la famille ?","Leur interdire d'en parler","Les éduquer avec respect et bienveillance","Ce n'est pas leur affaire","Les laisser se moquer",1,"Un frère ou un père informé est un allié protecteur pour les filles de la famille."),
      Q("Qu'est-ce qu'une Box de Dignité ?","Une boîte cadeau","Un dispositif offrant des protections hygiéniques gratuitement","Un médicament","Une boutique",1,"ONG Happy Mum's installe des Box de Dignité dans des établissements partenaires à Abidjan et Bouaké."),
      Q("Quel est le signe que votre enfant a besoin de soutien ?","Il mange normalement","Il refuse l'école pendant ses règles","Il dort bien","Il a des amis",1,"L'absentéisme menstruel est un signal fort. Votre enfant a besoin de protections et d'un espace de parole."),
      Q("L'éducation menstruelle à l'école permet de :","Perdre du temps de cours","Réduire l'absentéisme scolaire des filles","Créer des problèmes","Rien de spécial",1,"Une fille informée et équipée ne manque pas l'école à cause de ses règles !"),
      Q("Qu'est-ce que la précarité menstruelle ?","Des règles douloureuses","Ne pas avoir accès aux protections hygiéniques","Des règles irrégulières","La ménopause précoce",1,"Des millions de filles manquent l'école faute de protections. ONG Happy Mum's agit chaque jour."),
    ],
    vf: [
      VF("Il faut attendre que la fille pose des questions pour parler des règles.", false, "Les parents doivent initier la conversation avant les premières règles."),
      VF("Les garçons aussi doivent être éduqués sur la santé menstruelle.", true, "Un garçon éduqué devient un allié respectueux. L'éducation concerne toute la famille."),
      VF("La honte des règles peut empêcher une fille de demander de l'aide.", true, "Le silence et la honte mettent les filles en danger."),
      VF("L'éducation menstruelle à l'école perturbe les élèves.", false, "Elle réduit l'absentéisme, améliore la confiance et protège les filles."),
      VF("Un éducateur peut normaliser les règles en classe.", true, "Aborder le sujet avec calme brise le tabou et protège les élèves."),
      VF("Les premières règles signifient qu'une fille est prête pour le mariage.", false, "Les premières règles sont un signe de puberté, pas de maturité maritale."),
      VF("Une fille en règles peut participer à toutes les activités scolaires.", true, "Les règles ne sont pas un handicap. Avec les bonnes protections, une fille peut tout faire."),
      VF("Des douleurs très intenses pendant les règles sont toujours normales.", false, "Des douleurs intenses peuvent indiquer une endométriose. Une consultation est nécessaire."),
      VF("Parler des règles en famille protège les filles des grossesses précoces.", true, "L'éducation menstruelle en famille réduit les risques de grossesses non désirées."),
      VF("Toutes les filles en Côte d'Ivoire ont accès aux protections hygiéniques.", false, "La précarité menstruelle est réelle. ONG Happy Mum's travaille chaque jour pour y remédier."),
    ],
    mr: [
      MR("Il vaut mieux ne pas parler des règles aux enfants pour les préserver.", true, "Au contraire, l'ignorance crée de la peur. Parler protège et rassure."),
      MR("Une éducatrice peut aborder les règles en classe sans créer de problèmes.", false, "Avec les bons outils pédagogiques, ce sujet peut être abordé sereinement."),
      MR("Les garçons qui connaissent les règles deviennent irrespectueux.", true, "La connaissance crée le respect. Un garçon informé est un meilleur allié."),
      MR("Les filles qui ont mal pendant leurs règles font semblant.", true, "La douleur menstruelle est réelle. La minimiser peut retarder un diagnostic important."),
      MR("L'absentéisme scolaire lié aux règles est répandu en Afrique.", false, "Des millions de filles manquent l'école à cause de leurs règles chaque année."),
      MR("Un parent qui parle de règles à son fils lui donne de mauvaises idées.", true, "L'éducation donne des outils de respect. Le silence est bien plus dangereux."),
      MR("Les filles de familles ouvertes sur les règles s'en sortent mieux.", false, "Oui ! L'ouverture familiale protège les filles et renforce leur réussite scolaire."),
      MR("Les enseignants ne sont pas qualifiés pour parler de santé menstruelle.", true, "Avec une formation simple, tout éducateur peut aborder ce sujet."),
      MR("En Côte d'Ivoire, des ressources existent pour éduquer sur les règles.", false, "Vrai ! ONG Happy Mum's propose des outils. Contactez-les : 07 13 51 26 98."),
      MR("Parler des règles à la maison suffit, l'école n'a pas à s'en mêler.", true, "L'éducation menstruelle est plus efficace quand elle est renforcée à la maison ET à l'école."),
    ],
  },
};

const URGENCE = [
  Q("Que faire en cas de danger immédiat ?","Attendre","Appeler le 110","Se cacher sans rien dire","Ignorer",1,"Le 110 (Police Secours) permet de joindre rapidement les autorités. N'hésite jamais !"),
  Q("Quel numéro appeler en cas de violence ou besoin d'aide ?","1308","110","101","15",0,"Le 1308 est gratuit et disponible 24h/24. Tu peux parler à quelqu'un qui peut t'aider."),
  Q("Peut-on appeler un numéro d'urgence sans crédit téléphonique ?","Oui, toujours gratuit","Non, il faut du crédit","Seulement le 15","Seulement en ville",0,"Les numéros d'urgence sont accessibles même sans crédit téléphonique."),
  Q("Si tu as peur ou que quelqu'un te fait du mal, tu dois :","Garder le silence","Demander de l'aide ou appeler le 1308","Attendre que ça passe","En parler sur les réseaux",1,"Parler est une façon de se protéger. Jamais de honte à demander de l'aide !"),
  Q("Faire de faux appels aux numéros d'urgence, c'est :","Amusant","Dangereux et illégal","Normal","Sans conséquences",1,"Un faux appel peut empêcher d'aider une personne en danger. C'est un acte grave."),
];

const DEFIS = [
  {q:"Explique le cycle menstruel en 1 minute.", rep:"Chaque mois, le corps prépare l'utérus pour une possible grossesse. Si aucun bébé ne se forme, l'utérus se renouvelle : ce sont les règles. Cela dure 3 à 7 jours et se répète environ tous les 28 jours.", isDefi:true},
  {q:"Cite 3 bonnes pratiques d'hygiène pendant les règles.", rep:"1. Changer sa protection toutes les 4-8 heures.\n2. Se laver avec eau et savon doux matin et soir.\n3. Bien se sécher après le lavage pour éviter les infections.", isDefi:true},
  {q:"Comment expliquer les règles à un enfant de 10 ans ?", rep:"Tu peux dire : les femmes ont un corps qui se prépare chaque mois à accueillir un bébé. Quand il n'y a pas de bébé, le corps se renouvelle. Ça s'appelle les règles. Ce n'est pas une maladie.", isDefi:true},
  {q:"Que dire à une fille qui a honte de ses règles ?", rep:"Tes règles sont normales et naturelles. Elles ne font pas de toi quelqu'un d'impur. Toutes les femmes les ont. Tu peux en parler, tu n'as rien à cacher.", isDefi:true},
  {q:"Comment réagir si une élève demande une protection en urgence ?", rep:"Avoir une trousse de protections disponibles. Répondre avec discrétion et bienveillance. Orienter vers l'infirmerie si nécessaire. Ne jamais humilier ni exposer l'élève.", isDefi:true},
];


const VIOLENCE = {
  fille: [
    Q("La violence, c'est seulement quand il y a des coups ?","Non, elle peut être physique, verbale, psychologique ou sexuelle","Oui, sans coups ce n'est pas de la violence","Seulement si ça laisse des traces visibles","Ça dépend de qui fait quoi",0,"La violence prend de nombreuses formes. Les blessures invisibles sont souvent les plus profondes."),
    VF("Si tu te sens mal à l'aise avec quelqu'un, tu dois ignorer ce ressenti.",false,"Ton ressenti est un signal d'alarme naturel. Il faut l'écouter, pas l'ignorer. Si quelqu'un te met mal à l'aise, tu peux appeler le 116 — gratuit, 24h/24."),
    Q("Un adulte te touche sur des parties intimes de ton corps et te dit 'garde ça entre nous'. Tu fais quoi ?","Tu gardes le secret parce qu'il dit que c'est normal","Tu penses que tu as mal compris la situation","Tu en parles immédiatement à un autre adulte de confiance ou tu appelles le 116","Tu attends que ça s'arrête tout seul",2,"Personne n'a le droit de toucher ton corps sans ton accord. Un adulte qui demande le silence fait quelque chose d'illégal. Ce n'est jamais ta faute."),
    MR("Si quelqu'un te fait du mal, c'est forcément un inconnu.",true,"Dans la majorité des cas, la violence vient d'une personne connue — famille, ami, voisin. Ce n'est pas de ta faute."),
    VF("Le silence veut dire 'oui'.",false,"Le consentement doit être clair, libre et exprimé. L'absence de 'non' ne veut pas dire 'oui'."),
    Q("Quelqu'un t'envoie des messages qui te font peur ou te demande des photos. Tu fais quoi ?","Tu réponds pour être polie","Tu effaces tout et tu oublies","Tu en parles à tes amis seulement","Tu ne réponds pas, tu gardes les preuves et tu en parles à un adulte",3,"Ne jamais effacer les preuves. Un adulte de confiance ou le 116 peut t'aider. Si tu reçois des messages qui te font peur, appelle le 116 — gratuit et confidentiel."),
    MR("C'est ta faute si quelqu'un te fait du mal.",true,"La responsabilité est toujours du côté de l'agresseur. Jamais de la victime. Quoi qu'il se soit passé."),
    VF("Une blague qui te met mal à l'aise est acceptable si tout le monde rit.",false,"Le respect passe aussi par les mots. Ton malaise est valide même si les autres rient."),
    Q("Si tu as peur de parler, qu'est-ce qui peut t'aider ?","Écrire ce que tu ressens ou appeler le 116 anonymement","Attendre que la situation se règle toute seule","Garder ça pour toi pour ne pas déranger","En parler uniquement sur les réseaux sociaux",0,"Tu n'as pas à tout dire d'un coup. Le 116 est gratuit, disponible 24h/24. Tu peux parler à ton rythme, sans te forcer."),
    MR("Certaines victimes parlent des années après — c'est qu'elles mentaient.",true,"Chacun parle à son rythme. La peur, la honte ou le manque de soutien peuvent retarder la parole. Ça ne change rien à la vérité."),
  ],
  garcon: [
    VF("Un garçon ne peut pas être victime de gestes déplacés.",false,"Les violences peuvent toucher tout le monde, peu importe le genre. Ton corps t'appartient."),
    Q("Quelqu'un te touche et ça te met mal à l'aise. C'est quoi la bonne réaction ?","Tu fais comme si de rien n'était","Tu te dis que c'est normal pour un garçon","Tu supports en silence pour paraître fort","Tu dis clairement que ça ne te plaît pas et tu en parles à quelqu'un",3,"Ton corps t'appartient. Personne n'a le droit de te toucher sans ton accord. Si quelque chose te pèse, tu peux appeler le 116 — gratuit, confidentiel, 24h/24."),
    MR("Un garçon fort ne parle pas de ce qu'il vit.",true,"Se taire ne protège pas. Parler est un acte de courage, pas une faiblesse."),
    Q("Un adulte te touche sur des parties intimes et te dit 'c'est notre secret'. Tu fais quoi ?","Tu en parles immédiatement à un adulte de confiance ou tu appelles le 116","Tu gardes le secret pour ne pas créer de problèmes","Tu penses que c'est normal entre un adulte et un enfant","Tu attends de voir si ça recommence",0,"Ton corps t'appartient. Un adulte bienveillant ne fait jamais ça. Ce n'est pas ta faute et tu as le droit de parler."),
    VF("Si une fille dit non et que tu insistes, c'est juste de la persévérance.",false,"Insister après un refus est une forme de pression et de violence. Non veut dire non. Toujours."),
    MR("Une fille peut changer d'avis à tout moment, même si elle avait dit oui avant.",false,"Le consentement n'est jamais acquis définitivement. Il peut être retiré à tout moment. Le respect de ce droit est non négociable."),
    Q("Tu vois un ami dans une situation qui te semble injuste ou dangereuse. Tu fais quoi ?","Tu ignores, ce n'est pas ton problème","Tu te moques pour ne pas paraître faible","Tu l'encourages à en parler à un adulte ou tu l'accompagnes","Tu règles ça entre vous sans impliquer des adultes",2,"Soutenir un ami en difficulté c'est une vraie force. Ne pas agir, c'est laisser la situation continuer."),
    VF("Parler de ce qu'on vit, c'est être faible.",false,"Demander de l'aide est l'un des actes les plus courageux qui existe. Les vrais forts savent quand parler. Si quelque chose te pèse, tu peux en parler à un adulte de confiance ou appeler le 116."),
    Q("Tu reçois des messages d'un adulte qui te demande de garder ça secret. Tu fais quoi ?","Tu gardes le secret parce qu'il te fait confiance","Tu en parles immédiatement à un adulte de confiance ou tu appelles le 116","Tu bloques et tu oublies","Tu attends pour voir si ça continue",1,"Ne jamais garder ce type de secret. Un adulte bienveillant ne demande pas ça à un enfant. Appelle le 116 — gratuit et confidentiel."),
    MR("Les garçons qui parlent de leurs problèmes perdent le respect des autres.",true,"Au contraire, savoir exprimer ce qu'on vit inspire confiance et respect. C'est une marque de maturité."),
  ],
  parent: [
    VF("Un enfant qui ne pleure pas après une violence n'a pas vraiment été blessé.",false,"Les réactions au trauma sont très variées. Le silence ne signifie pas l'absence de souffrance."),
    Q("Un élève vous confie avoir été touché de façon inappropriée. Quelle est votre première action ?","Écouter sans juger, rassurer et alerter les autorités compétentes","Confronter immédiatement la personne accusée","Attendre d'avoir plus de preuves avant de faire quoi que ce soit","En parler aux collègues pour avoir leur avis",0,"Confronter l'accusé peut mettre l'enfant en danger. L'écoute et l'alerte sont les priorités absolues. Le 116 peut vous orienter sur les démarches à suivre."),
    MR("Les violences sexuelles sur enfants sont commises principalement par des inconnus.",true,"Dans plus de 70% des cas, l'agresseur est connu de l'enfant : famille, voisinage, entourage proche."),
    Q("Un parent vous dit que son enfant exagère. Que faites-vous ?","Vous lui donnez raison pour éviter le conflit","Vous convoquez l'enfant devant le parent pour qu'il répète","Vous attendez que l'enfant parle à nouveau","Vous expliquez que minimiser la parole d'un enfant peut aggraver sa situation",3,"L'enfant doit sentir qu'il sera cru. Minimiser sa parole devant lui peut le faire taire définitivement."),
    VF("Si un enfant revient sur ce qu'il a dit, c'est qu'il mentait.",false,"Se rétracter est très courant chez les victimes, souvent par peur ou pression de l'entourage. Un enfant qui se rétracte a peut-être besoin de plus de sécurité pour parler. Reste disponible sans forcer."),
    Q("Une élève porte des vêtements longs même en pleine chaleur. Que pensez-vous ?","Elle veut se faire remarquer","Ce n'est pas votre rôle d'y prêter attention","C'est peut-être un signal de blessures cachées à observer avec bienveillance","Elle a froid, c'est son choix",2,"Les changements physiques ou vestimentaires inhabituels méritent une attention bienveillante."),
    MR("Un enfant bien élevé dans une bonne famille ne peut pas être victime de violence.",true,"Les violences touchent tous les milieux. Le statut social ou le niveau d'éducation ne protège pas."),
    VF("Parler de violences avec des enfants peut leur donner des idées ou les traumatiser.",false,"Au contraire, éduquer les enfants à reconnaître les violences les protège. L'ignorance est le terrain des agresseurs."),
    Q("Un enfant agressif en classe depuis quelques semaines. Quelle est la meilleure approche ?","Le sanctionner immédiatement pour rétablir la discipline","Chercher à comprendre ce changement de comportement avec bienveillance","Ignorer, c'est une phase passagère","En informer uniquement les parents sans parler à l'enfant",1,"Un changement soudain de comportement peut signaler une souffrance cachée. En cas de doute, le 116 peut vous orienter gratuitement."),
    VF("Le rôle de l'éducateur s'arrête à l'enseignement. La protection des enfants, c'est la police.",false,"L'éducateur est souvent le premier adulte de confiance d'un enfant. Son rôle de signalement est reconnu par la loi."),
  ],
};

const BADGES = {
  fille:  [{icon:"🌸",name:"Fleur de Dignité"},{icon:"🩸",name:"Experte du Cycle"},{icon:"💬",name:"Briseuse de Tabous"},{icon:"🔦",name:"Lumière du Savoir"},{icon:"💪",name:"Fille Invincible"},{icon:"🌍",name:"Ambassadrice"},{icon:"🤝",name:"Voix des Filles"}],
  garcon: [{icon:"🦁",name:"Gardien du Respect"},{icon:"🤝",name:"Allié de la Dignité"},{icon:"👊",name:"Briseur de Préjugés"},{icon:"💡",name:"Éclaireur du Savoir"},{icon:"⚽",name:"Champion Empathie"},{icon:"🌍",name:"Ambassadeur"},{icon:"🛡️",name:"Protecteur Bienveillant"}],
  parent: [{icon:"❤️",name:"Cœur de Famille"},{icon:"📖",name:"Guide Bienveillant"},{icon:"🌱",name:"Semeur de Confiance"},{icon:"🏫",name:"Éducateur Engagé"},{icon:"🔑",name:"Clé du Dialogue"},{icon:"🌍",name:"Leader Changement"},{icon:"✨",name:"Source Inspiration"}],
};

const LEVELS = [{icon:"🌱",label:"Débutant(e)",min:0},{icon:"📚",label:"Intermédiaire",min:100},{icon:"🌟",label:"Expert(e)",min:250}];
const getLevel = pts => [...LEVELS].reverse().find(l => pts >= l.min) || LEVELS[0];

/* ── STYLES ─────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@400;600;700;800&display=swap');
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Nunito',sans-serif;overflow-x:hidden;background:#FFF0F5;}
.bg{position:fixed;inset:0;z-index:0;background:linear-gradient(-45deg,#FFDDE1,#FFAAB5,#FECFEF,#FFD6CC,#FFECD2,#FFB7C5);background-size:400% 400%;animation:bgAnim 14s ease infinite;}
@keyframes bgAnim{0%{background-position:0 50%}50%{background-position:100% 50%}100%{background-position:0 50%}}
.floaters{position:fixed;inset:0;z-index:1;pointer-events:none;overflow:hidden;}
.fl{position:absolute;bottom:-60px;animation:floatUp linear infinite;}
@keyframes floatUp{0%{opacity:0;transform:translateY(0) rotate(0deg)}8%{opacity:1}92%{opacity:.85}100%{opacity:0;transform:translateY(-115vh) rotate(720deg)}}
.app{position:relative;z-index:2;min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:16px 16px 88px;overflow:hidden;}
.scr{width:100%;max-width:480px;animation:scrUp .35s ease both;}
@keyframes scrUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
@keyframes popAnim{0%{transform:scale(.8);opacity:0}65%{transform:scale(1.06)}100%{transform:scale(1);opacity:1}}
@keyframes shakeAnim{0%,100%{transform:translateX(0)}25%{transform:translateX(-10px)}75%{transform:translateX(10px)}}
@keyframes glowAnim{0%,100%{box-shadow:0 0 0 rgba(46,204,113,0)}50%{box-shadow:0 0 22px rgba(46,204,113,.4)}}
.card{background:rgba(255,255,255,.92);backdrop-filter:blur(14px);border-radius:26px;padding:22px;box-shadow:0 10px 36px rgba(232,0,61,.12);border:1.5px solid rgba(255,255,255,.95);}
.btn{padding:14px 22px;border-radius:50px;border:none;cursor:pointer;font-family:'Baloo 2',sans-serif;font-size:.98rem;font-weight:700;display:flex;align-items:center;gap:8px;justify-content:center;transition:all .22s;width:100%;}
.btn-m{background:linear-gradient(135deg,#E8003D,#FF6B9D,#FF8C69);color:#fff;box-shadow:0 6px 22px rgba(232,0,61,.28);}
.btn-m:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(232,0,61,.38);}
.btn-s{background:rgba(255,255,255,.88);color:#E8003D;border:2px solid rgba(232,0,61,.18);}
.logo-wrap{text-align:center;padding:22px 0 14px;}
.logo-img{width:96px;height:96px;object-fit:contain;filter:drop-shadow(0 8px 18px rgba(232,0,61,.22));animation:popAnim .6s ease;}
.logo-title{font-family:'Baloo 2',sans-serif;font-size:2.1rem;font-weight:800;background:linear-gradient(135deg,#E8003D,#FF6B9D,#FF8C69);-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1.1;margin-top:8px;}
.logo-sub{font-size:.75rem;color:#8B4A6B;letter-spacing:2px;text-transform:uppercase;margin-top:5px;}
.profile-card{border-radius:22px;padding:18px 20px;cursor:pointer;display:flex;align-items:center;gap:14px;border:2.5px solid transparent;transition:all .22s;margin-bottom:12px;width:100%;background:white;}
.profile-card:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(232,0,61,.15);}
.pc-fille{background:linear-gradient(135deg,#FF9A9E,#FAD0C4);}
.pc-garcon{background:linear-gradient(135deg,#A18CD1,#FBC2EB);}
.pc-parent{background:linear-gradient(135deg,#FFECD2,#FCB69F);}
.cats-grid{display:grid;grid-template-columns:1fr 1fr;gap:11px;}
.cat-item{background:rgba(255,255,255,.86);border-radius:18px;padding:16px 10px;cursor:pointer;text-align:center;border:2px solid rgba(255,255,255,.8);transition:all .2s;box-shadow:0 4px 14px rgba(232,0,61,.07);}
.cat-item:hover{transform:translateY(-4px) scale(1.02);border-color:#FF6B9D;}
.cat-item.full{grid-column:1/-1;}
.qhdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
.score-badge{background:linear-gradient(135deg,#E8003D,#FF6B9D);color:#fff;border-radius:50px;padding:6px 14px;font-family:'Baloo 2',sans-serif;font-size:.86rem;font-weight:700;}
.timer-wrap{margin-bottom:16px;}
.timer-row{display:flex;justify-content:space-between;font-size:.74rem;color:#8B4A6B;margin-bottom:6px;font-weight:700;}
.timer-track{height:7px;background:rgba(232,0,61,.1);border-radius:4px;overflow:hidden;}
.timer-bar{height:100%;border-radius:4px;transition:width 1s linear,background .5s;}
.q-text{font-family:'Baloo 2',sans-serif;font-size:1.08rem;font-weight:700;line-height:1.45;margin-bottom:18px;color:#1A0A0F;}
.ans-list{display:flex;flex-direction:column;gap:10px;}
.ans-btn{background:rgba(255,255,255,.9);border:2.5px solid rgba(232,0,61,.13);border-radius:15px;padding:13px 16px;cursor:pointer;font-family:'Nunito',sans-serif;font-size:.93rem;font-weight:700;display:flex;align-items:center;gap:11px;text-align:left;transition:all .17s;width:100%;color:#1A0A0F;}
.ans-btn:hover:not(:disabled){background:#fff;border-color:#FF6B9D;transform:translateX(5px);}
.ans-btn:disabled{cursor:default;}
.ans-btn.ok{background:rgba(46,204,113,.14);border-color:#2ECC71;animation:glowAnim .6s ease;}
.ans-btn.err{background:rgba(231,76,60,.1);border-color:#E74C3C;animation:shakeAnim .4s ease;}
.ans-letter{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#E8003D,#FF6B9D);color:#fff;display:flex;align-items:center;justify-content:center;font-size:.72rem;font-weight:800;flex-shrink:0;}
.ans-btn.ok .ans-letter{background:#2ECC71;}
.ans-btn.err .ans-letter{background:#E74C3C;}
.feedback{margin-top:15px;padding:15px 17px;border-radius:17px;animation:scrUp .3s ease;}
.feedback.ok{background:rgba(46,204,113,.11);border:1.5px solid #2ECC71;}
.feedback.err{background:rgba(231,76,60,.09);border:1.5px solid #E74C3C;}
.fb-title{font-family:'Baloo 2',sans-serif;font-size:.97rem;font-weight:800;margin-bottom:5px;}
.feedback.ok .fb-title{color:#18a044;}
.feedback.err .fb-title{color:#E74C3C;}
.fb-text{font-size:.83rem;color:#8B4A6B;line-height:1.6;}
.result-hero{text-align:center;padding:18px 0 14px;}
.result-trophy{font-size:4.2rem;display:block;margin-bottom:10px;animation:popAnim .5s ease;}
.result-score{font-family:'Baloo 2',sans-serif;font-size:2.8rem;font-weight:800;background:linear-gradient(135deg,#E8003D,#FF6B9D);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.result-msg{font-size:.88rem;color:#8B4A6B;margin-top:6px;line-height:1.5;}
.result-pts{font-family:'Baloo 2',sans-serif;font-size:.85rem;font-weight:700;color:#FF6B9D;margin-top:8px;}
.badge-new{background:linear-gradient(135deg,rgba(255,215,0,.18),rgba(255,107,157,.18));border:2px solid gold;border-radius:17px;padding:13px 16px;margin:9px 0;display:flex;align-items:center;gap:13px;animation:popAnim .4s ease;}
.btn-row{display:flex;gap:10px;margin-top:12px;}
.btn-wa{flex:1;background:#25D366;color:#fff;border:none;border-radius:50px;padding:13px 14px;font-family:'Baloo 2',sans-serif;font-weight:700;font-size:.88rem;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;transition:transform .2s;}
.btn-wa:hover{transform:translateY(-2px);}
.btn-ig{flex:1;background:linear-gradient(135deg,#F58529,#DD2A7B,#8134AF);color:#fff;border:none;border-radius:50px;padding:13px 14px;font-family:'Baloo 2',sans-serif;font-weight:700;font-size:.88rem;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;transition:transform .2s;}
.btn-ig:hover{transform:translateY(-2px);}
.level-card{background:linear-gradient(135deg,#E8003D,#FF6B9D,#FF8C69);border-radius:22px;padding:20px;color:#fff;text-align:center;margin-bottom:15px;}
.badge-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.badge-chip{background:rgba(255,255,255,.86);border:1.5px solid rgba(255,107,157,.18);border-radius:15px;padding:13px 10px;text-align:center;}
.about-block{background:rgba(255,255,255,.85);border-radius:18px;padding:16px;margin-bottom:11px;border:1.5px solid rgba(255,107,157,.14);}
.sos-btn{background:linear-gradient(135deg,#E8003D,#FF6B9D);border-radius:17px;padding:15px 18px;margin-bottom:11px;display:flex;align-items:center;gap:13px;color:#fff;cursor:pointer;border:none;width:100%;text-align:left;box-shadow:0 5px 18px rgba(232,0,61,.26);transition:transform .2s;}
.sos-btn:hover{transform:translateY(-2px);}
.bottom-nav{position:fixed;bottom:0;left:0;right:0;background:rgba(255,255,255,.93);backdrop-filter:blur(14px);border-top:1.5px solid rgba(255,107,157,.18);display:flex;z-index:100;box-shadow:0 -4px 20px rgba(232,0,61,.09);}
.nav-item{flex:1;display:flex;flex-direction:column;align-items:center;padding:9px 3px;cursor:pointer;border:none;background:transparent;color:#8B4A6B;font-family:'Nunito',sans-serif;font-size:.59rem;font-weight:700;gap:3px;transition:color .2s;}
.nav-item.active{color:#E8003D;}
.divider{height:1.5px;background:linear-gradient(90deg,transparent,rgba(255,107,157,.28),transparent);margin:16px 0;}
.back-btn{background:none;border:none;color:#8B4A6B;font-size:.83rem;cursor:pointer;padding:3px 0;margin-bottom:13px;display:flex;align-items:center;gap:5px;font-family:'Nunito',sans-serif;font-weight:700;}
.defi-card{background:linear-gradient(135deg,rgba(255,107,157,.13),rgba(255,140,105,.13));border:2px solid rgba(255,107,157,.28);border-radius:22px;padding:20px;text-align:center;margin-bottom:14px;}
.copyright{font-size:.66rem;color:#8B4A6B;text-align:center;margin-top:18px;opacity:.65;}
`;

/* ── COMPONENT ──────────────────────────── */
export default function App() {
  // ── score tracked via ref to avoid React batching issues ──
  const scoreRef = useRef(0);

  const [screen,   setScreen]   = useState("splash");
  const [nav,      setNav]      = useState("home");
  const [profile,  setProfile]  = useState(null);
  const [category, setCategory] = useState(null);
  const [qs,       setQs]       = useState([]);
  const [qi,       setQi]       = useState(0);
  const [sel,      setSel]      = useState(null);
  const [showFb,   setShowFb]   = useState(false);
  const [timer,    setTimer]    = useState(15);
  const [dispScore,setDispScore]= useState(0);
  const [showDA,   setShowDA]   = useState(false);
  const [newBadges,setNewBadges]= useState([]);
  const [snd,      setSnd]      = useState(true);
  // persisted state
  const [totPts,   setTotPts]   = useState(0);
  const [earned,   setEarned]   = useState([]);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem("qdv9") || "{}");
      if (d.tp != null) setTotPts(d.tp);
      if (d.ea)         setEarned(d.ea);
      if (d.ss != null) setSessions(d.ss);
    } catch {}
  }, []);

  function save(tp, ea, ss) {
    try { localStorage.setItem("qdv9", JSON.stringify({tp, ea, ss})); } catch {}
  }

  // ── Timer ──
  useEffect(() => {
    if (screen !== "quiz" || showFb || sel !== null || category === "defi") return;
    if (timer <= 0) { setSel(-1); setShowFb(true); play("err", snd); return; }
    if (timer <= 5) play("tick", snd);
    const id = setTimeout(() => setTimer(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer, screen, showFb, sel, category, snd]);

  // ── Start quiz ──
  function startQuiz(prof, cat) {
    scoreRef.current = 0;
    const pool = cat === "urgence" ? URGENCE : cat === "defi" ? DEFIS : cat === "violence" ? (VIOLENCE[prof] || []) : (DB[prof]?.[cat] || []);
    const total = (cat === "defi" || cat === "urgence") ? 5 : 10;
    setProfile(prof); setCategory(cat);
    setQs(shuffle(pool).slice(0, total));
    setQi(0); setSel(null); setShowFb(false);
    setTimer(15); setDispScore(0); setShowDA(false);
    setNewBadges([]);
    ga("quiz_start", {profil: prof, cat});
    setScreen("quiz");
  }

  // ── Answer ──
  function answer(i) {
    if (sel !== null || showFb) return;
    setSel(i); setShowFb(true);
    const ok = i === qs[qi].correct;
    if (ok) {
      scoreRef.current += 10;
      setDispScore(scoreRef.current);
      play("ok", snd);
    } else {
      play("err", snd);
    }
    ga("answer", {ok, q: qi + 1});
  }

  // ── Next question ──
  function next() {
    const last = qi + 1 >= qs.length;
    if (last) {
      endQuiz();
    } else {
      setQi(q => q + 1);
      setSel(null); setShowFb(false);
      setTimer(15); setShowDA(false);
    }
  }

  // ── End quiz — compute result then show results screen ──
  function endQuiz() {
    const finalScore = scoreRef.current;
    const total      = qs.length * 10;
    const pct        = Math.round((finalScore / total) * 100);
    const newTot     = totPts + finalScore;
    const newSess    = sessions + 1;

    // Badge logic
    const bList  = BADGES[profile] || [];
    const fresh  = bList.filter((b, i) => {
      if (earned.some(e => e.icon === b.icon && e.prof === profile)) return false;
      if (i === 0) return true;                                     // first session
      if (i === 1) return pct === 100 && category === "qcm";       // perfect QCM
      if (i === 2) return pct === 100 && category === "mr";        // perfect MR
      if (i === 3) return pct === 100 && category === "vf";        // perfect VF
      return false;
    }).map(b => ({...b, prof: profile}));

    const allEarned = [...earned, ...fresh];
    setTotPts(newTot); setSessions(newSess);
    setEarned(allEarned); setNewBadges(fresh);
    save(newTot, allEarned, newSess);

    ga("quiz_end", {score: finalScore, pct});
    setTimeout(() => play("win", snd), 300);

    // Set screen AFTER all state updates
    setScreen("results");
  }

  // ── Share ──
  function shareWA() {
    const sc  = dispScore / 10;
    const tot = qs.length;
    const txt = encodeURIComponent(
      `J'ai obtenu ${sc}/${tot} au Quiz Dignité 🌸\nTeste tes connaissances sur les règles et découvre ton score !\n👉 https://quiz-dignite.vercel.app`
    );
    window.open(`https://wa.me/?text=${txt}`, "_blank");
    ga("share", {platform: "whatsapp"});
  }

  function shareIG() {
    const sc  = dispScore / 10;
    const tot = qs.length;
    const txt = `J'ai obtenu ${sc}/${tot} au Quiz Dignité 🌸\nTeste tes connaissances sur les règles !\n#QuizDignite #HappyMums\n👉 https://quiz-dignite.vercel.app`;
    navigator.clipboard?.writeText(txt)
      .then(() => alert("✅ Texte copié ! Colle-le dans ta story Instagram 🌸"))
      .catch(() => alert(txt));
    ga("share", {platform: "instagram"});
  }

  // ── Nav ──
  function goNav(id) {
    if (id === "snd") { setSnd(s => !s); return; }
    setNav(id);
    setScreen(id === "home" ? "splash" : id);
  }

  // ── Derived ──
  const q    = qs[qi];
  const L    = ["A","B","C","D"];
  const lvl  = getLevel(totPts);
  const tPct = (timer / 15) * 100;
  const tClr = timer > 7 ? "linear-gradient(90deg,#FF9A9E,#FF6B9D)" : "linear-gradient(90deg,#E8003D,#FF5555)";
  const PNAME = {fille:"Je suis une fille", garcon:"Je suis un garçon", parent:"Parent / Éducateur"};
  const CNAME = {qcm:"QCM", vf:"Vrai / Faux", mr:"Mythe ou Réalité", defi:"Défi", urgence:"Urgence", violence:"Violences & Sécurité"};

  const FLOATS = [
    {e:"🌸",l:5,d:0,s:14},{e:"🦋",l:15,d:2,s:11},{e:"🫧",l:26,d:1,s:9},
    {e:"🌺",l:36,d:3,s:13},{e:"✨",l:46,d:.5,s:8},{e:"🌸",l:56,d:2.5,s:12},
    {e:"💕",l:66,d:4,s:10},{e:"🦋",l:74,d:1.5,s:15},{e:"🫧",l:83,d:3,s:11},
    {e:"🌸",l:91,d:.8,s:13},{e:"🌺",l:10,d:5.5,s:9},{e:"✨",l:22,d:6.5,s:12},
    {e:"💕",l:49,d:7,s:8},
  ];

  return (
    <div>
      <style>{CSS}</style>
      <div className="bg"/>
      <div className="floaters">
        {FLOATS.map((f,i) => (
          <span key={i} className="fl" style={{left:`${f.l}%`,fontSize:"1.1rem",animationDuration:`${f.s}s`,animationDelay:`${f.d}s`}}>
            {f.e}
          </span>
        ))}
      </div>

      <div className="app">

        {/* ═══ SPLASH ═══ */}
        {screen === "splash" && (
          <div className="scr">
            <div className="logo-wrap">
              <img src={LOGO} className="logo-img" alt="Happy Mum's"/>
              <div className="logo-title">Quiz Dignité</div>
              <div className="logo-sub">Le quiz qui change les règles ✨</div>
            </div>
            <div style={{background:"rgba(255,255,255,.8)",backdropFilter:"blur(10px)",borderRadius:20,padding:"16px 18px",margin:"16px 0",border:"1.5px solid rgba(255,107,157,.18)",fontSize:".88rem",lineHeight:1.7,color:"#8B4A6B"}}>
              Apprendre les règles <strong>sans tabou, sans honte, avec confiance.</strong><br/>
              Comprends ton corps, réponds à tes questions, brise les mythes.
            </div>
            <button className="btn btn-m" onClick={() => { play("start",snd); setNav("home"); setScreen("profiles"); }}>
              Commencer 🌸
            </button>
            <p style={{fontSize:".68rem",color:"#8B4A6B",textAlign:"center",marginTop:10,opacity:.7}}>📴 Fonctionne sans connexion internet</p>
            <p className="copyright">© 2026 ONG Happy Mum's – Tous droits réservés</p>
          </div>
        )}

        {/* ═══ PROFILES ═══ */}
        {screen === "profiles" && (
          <div className="scr">
            <div style={{textAlign:"center",marginBottom:16,paddingTop:6}}>
              <img src={LOGO} alt="" style={{width:54,height:54,objectFit:"contain"}}/>
              <div style={{fontFamily:"'Baloo 2',sans-serif",fontSize:".95rem",color:"#8B4A6B",marginTop:6,fontWeight:700}}>
                Qui utilise l'application ?
              </div>
            </div>
            {[
              {id:"fille",  cls:"pc-fille",  e:"👧", n:"Je suis une fille",    d:"Comprendre mon corps, briser les tabous", dec:"🌸💕"},
              {id:"garcon", cls:"pc-garcon", e:"👦", n:"Je suis un garçon",    d:"Éducation, respect et empathie",          dec:"🦁🛡️"},
              {id:"parent", cls:"pc-parent", e:"👨‍👩‍👧",n:"Parent / Éducateur",  d:"Communication et accompagnement",         dec:"❤️📖"},
            ].map(p => (
              <button key={p.id} className={`profile-card ${p.cls}`}
                onClick={() => { play("click",snd); ga("profil",{p:p.id}); setProfile(p.id); setScreen("cats"); }}>
                <span style={{fontSize:"2.6rem",filter:"drop-shadow(0 3px 6px rgba(0,0,0,.12))"}}>{p.e}</span>
                <div style={{flex:1,textAlign:"left"}}>
                  <div style={{fontFamily:"'Baloo 2',sans-serif",fontSize:"1.05rem",fontWeight:800,color:"#1A0A0F"}}>{p.n}</div>
                  <div style={{fontSize:".78rem",color:"rgba(45,10,31,.65)",marginTop:3}}>{p.d}</div>
                </div>
                <span style={{fontSize:"1.3rem",opacity:.4}}>{p.dec}</span>
              </button>
            ))}
            <p className="copyright">© 2026 ONG Happy Mum's – Tous droits réservés</p>
          </div>
        )}

        {/* ═══ CATEGORIES ═══ */}
        {screen === "cats" && (
          <div className="scr">
            <button className="back-btn" onClick={() => setScreen("profiles")}>← Retour</button>
            <div style={{fontFamily:"'Baloo 2',sans-serif",fontSize:"1.2rem",fontWeight:800,color:"#E8003D",marginBottom:4}}>
              {PNAME[profile]}
            </div>
            <div style={{fontSize:".8rem",color:"#8B4A6B",marginBottom:15,fontWeight:600}}>Choisis un type de questions :</div>
            <div className="cats-grid">
              {[
                {id:"qcm",     icon:"🧠", name:"QCM",             info:"10 questions à choix multiples"},
                {id:"vf",      icon:"✅", name:"Vrai / Faux",      info:"10 questions Vrai ou Faux"},
                {id:"mr",      icon:"💡", name:"Mythe ou Réalité", info:"10 questions contre les tabous"},
                {id:"defi",    icon:"🎯", name:"Défis éducatifs",  info:"5 défis — discussion orale"},
                {id:"urgence",  icon:"🚨", name:"Urgence & Aide",    info:"5 questions essentielles"},
                {id:"violence", icon:"🛡️", name:"Violences & Sécurité", info:"10 questions — reconnaître et réagir", full:true},
              ].map(c => (
                <div key={c.id} className={`cat-item${c.full?" full":""}`}
                  onClick={() => { play("click",snd); startQuiz(profile, c.id); }}>
                  <span style={{fontSize:"1.9rem",display:"block",marginBottom:7}}>{c.icon}</span>
                  <div style={{fontFamily:"'Baloo 2',sans-serif",fontSize:".88rem",fontWeight:700,color:"#E8003D"}}>{c.name}</div>
                  <div style={{fontSize:".68rem",color:"#8B4A6B",marginTop:2}}>{c.info}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ QUIZ ═══ */}
        {screen === "quiz" && q && (
          <div className="scr">
            <div className="qhdr">
              <button className="back-btn" style={{marginBottom:0}} onClick={() => setScreen("cats")}>← Quitter</button>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <button onClick={() => setSnd(s => !s)}
                  style={{background:"rgba(255,255,255,.8)",border:"none",borderRadius:"50%",width:32,height:32,cursor:"pointer",fontSize:".95rem"}}>
                  {snd ? "🔊" : "🔇"}
                </button>
                <div className="score-badge">⭐ {dispScore} pts</div>
              </div>
            </div>

            {category === "defi" ? (
              <div>
                <div style={{fontSize:".7rem",textTransform:"uppercase",letterSpacing:2,color:"#8B4A6B",marginBottom:11,fontWeight:700}}>
                  Défi {qi+1}/{qs.length}
                </div>
                <div className="defi-card">
                  <span style={{fontSize:"2.8rem",display:"block",marginBottom:10}}>🎯</span>
                  <div style={{fontFamily:"'Baloo 2',sans-serif",fontSize:"1.05rem",fontWeight:700,color:"#E8003D",marginBottom:16,lineHeight:1.4}}>
                    {q.q}
                  </div>
                  {!showDA
                    ? <button className="btn btn-m" onClick={() => setShowDA(true)}>Voir la réponse 👀</button>
                    : <div style={{background:"rgba(255,255,255,.9)",borderRadius:14,padding:14,textAlign:"left",border:"1px solid rgba(232,0,61,.13)"}}>
                        <div style={{fontWeight:800,color:"#E8003D",fontSize:".78rem",marginBottom:7,textTransform:"uppercase",letterSpacing:1.2}}>
                          💬 Réponse
                        </div>
                        <div style={{fontSize:".85rem",color:"#8B4A6B",lineHeight:1.65,whiteSpace:"pre-line"}}>{q.rep}</div>
                      </div>
                  }
                </div>
                {showDA && (
                  <button className="btn btn-m" onClick={next}>
                    {qi+1 >= qs.length ? "Voir les résultats 🏆" : "Défi suivant →"}
                  </button>
                )}
              </div>
            ) : (
              <div>
                <div className="timer-wrap">
                  <div className="timer-row">
                    <span>{CNAME[category]} — Q{qi+1}/{qs.length}</span>
                    <span>⏱ {timer}s</span>
                  </div>
                  <div className="timer-track">
                    <div className="timer-bar" style={{width:`${tPct}%`, background:tClr}}/>
                  </div>
                </div>
                <div className="card">
                  <div className="q-text">{q.q}</div>
                  <div className="ans-list">
                    {q.answers.map((a, i) => {
                      let cls = "ans-btn";
                      if (showFb) {
                        if (i === q.correct) cls += " ok";
                        else if (i === sel)  cls += " err";
                      }
                      return (
                        <button key={i} className={cls} disabled={showFb} onClick={() => answer(i)}>
                          <span className="ans-letter">{L[i]}</span>{a}
                        </button>
                      );
                    })}
                  </div>
                  {showFb && (
                    <div className={`feedback ${sel === q.correct ? "ok" : "err"}`}>
                      <div className="fb-title">
                        {sel === -1 ? "⏰ Temps écoulé !" : sel === q.correct ? "✅ Bonne réponse !" : "❌ Pas tout à fait..."}
                      </div>
                      <div className="fb-text">{q.ex}</div>
                      <button className="btn btn-m" style={{marginTop:13}} onClick={next}>
                        {qi+1 >= qs.length ? "Voir les résultats 🏆" : "Question suivante →"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══ RESULTS ═══ */}
        {screen === "results" && (
          <div className="scr">
            <div className="result-hero">
              {(() => {
                const fs = dispScore;
                const tot = qs.length * 10;
                const pct = tot > 0 ? Math.round((fs / tot) * 100) : 0;
                return (<>
                  <span className="result-trophy">{pct>=100?"🏆":pct>=80?"⭐":pct>=60?"🌟":pct>=40?"📚":"🌱"}</span>
                  <div className="result-score">{fs/10}/{qs.length}</div>
                  <div className="result-msg">
                    {pct>=100?"Parfait ! Tu es une vraie championne !":pct>=80?"Excellent ! Tu es une experte !":pct>=60?"Bien joué ! Continue comme ça !":pct>=40?"Pas mal ! Tu progresses !":"C'est un début — rejoue pour progresser !"}
                  </div>
                  <div className="result-pts">+{fs} pts · Total: {totPts} pts · {lvl.icon} {lvl.label}</div>
                </>);
              })()}
            </div>

            {newBadges.length > 0 && (
              <div style={{marginBottom:4}}>
                <div style={{fontFamily:"'Baloo 2',sans-serif",color:"#E8003D",marginBottom:8,fontWeight:800}}>🎉 Badge débloqué !</div>
                {newBadges.map((b,i) => (
                  <div key={i} className="badge-new">
                    <span style={{fontSize:"2rem"}}>{b.icon}</span>
                    <div>
                      <div style={{fontFamily:"'Baloo 2',sans-serif",color:"#E8003D",fontWeight:800}}>{b.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="divider"/>
            <div style={{fontFamily:"'Baloo 2',sans-serif",color:"#8B4A6B",marginBottom:9,fontSize:".86rem",fontWeight:700}}>
              Partager ton score 🌍
            </div>
            <div style={{display:"flex",gap:10}}>
              <button className="btn-wa" onClick={shareWA}>📱 WhatsApp</button>
              <button className="btn-ig" onClick={shareIG}>📸 Instagram</button>
            </div>
            <div className="divider"/>
            <div className="btn-row">
              <button className="btn btn-s" onClick={() => { setNewBadges([]); startQuiz(profile, category); }}>
                Rejouer 🔄
              </button>
              <button className="btn btn-m" onClick={() => { setNewBadges([]); setNav("home"); setScreen("profiles"); }}>
                Accueil 🏠
              </button>
            </div>
            <div style={{background:"rgba(232,0,61,.07)",border:"1.5px solid rgba(232,0,61,.18)",borderRadius:15,padding:13,textAlign:"center",marginTop:12}}>
              <div style={{fontSize:".78rem",color:"#8B4A6B",fontWeight:700}}>📞 Besoin d'aide ?</div>
              <div style={{fontFamily:"'Baloo 2',sans-serif",color:"#E8003D",marginTop:4,fontWeight:800}}>
                110 · 1308 (écoute gratuite)
              </div>
            </div>
            <p className="copyright">© 2026 ONG Happy Mum's – Tous droits réservés</p>
          </div>
        )}

        {/* ═══ PROGRESS ═══ */}
        {screen === "progress" && (
          <div className="scr">
            <div style={{fontFamily:"'Baloo 2',sans-serif",fontSize:"1.2rem",fontWeight:800,color:"#E8003D",marginBottom:14}}>
              🏆 Mes Progrès
            </div>
            <div className="level-card">
              <span style={{fontSize:"2.8rem",display:"block",marginBottom:5}}>{lvl.icon}</span>
              <div style={{fontFamily:"'Baloo 2',sans-serif",fontSize:"1.4rem",fontWeight:800}}>{lvl.label}</div>
              <div style={{fontSize:".8rem",opacity:.85,marginTop:4}}>
                {totPts} points · {sessions} session{sessions > 1 ? "s" : ""}
              </div>
            </div>
            {earned.length === 0
              ? <div style={{textAlign:"center",padding:28,color:"#8B4A6B"}}>
                  <div style={{fontSize:"2.4rem",marginBottom:9}}>🌸</div>
                  <div style={{fontFamily:"'Baloo 2',sans-serif",color:"#E8003D",fontWeight:700}}>
                    Joue pour gagner tes premiers badges !
                  </div>
                </div>
              : <div className="badge-grid">
                  {earned.map((b,i) => (
                    <div key={i} className="badge-chip">
                      <span style={{fontSize:"1.7rem",display:"block",marginBottom:5}}>{b.icon}</span>
                      <div style={{fontFamily:"'Baloo 2',sans-serif",fontSize:".75rem",fontWeight:700,color:"#E8003D"}}>{b.name}</div>
                    </div>
                  ))}
                </div>
            }
            <p className="copyright">© 2026 ONG Happy Mum's – Tous droits réservés</p>
          </div>
        )}

        {/* ═══ ABOUT ═══ */}
        {screen === "about" && (
          <div className="scr">
            <div style={{textAlign:"center",marginBottom:18}}>
              <img src={LOGO} alt="" style={{width:65,height:65,objectFit:"contain"}}/>
              <div style={{fontFamily:"'Baloo 2',sans-serif",fontSize:"1.2rem",fontWeight:800,color:"#E8003D",marginTop:8}}>
                Qui est Happy Mum's ?
              </div>
            </div>
            {[
              {t:"🌍 Notre mission", x:"Happy Mum's est une organisation ivoirienne engagée pour la dignité menstruelle et la santé des filles et des femmes. Elle sensibilise les jeunes filles et les communautés, lutte contre les tabous et promeut une éducation menstruelle accessible."},
              {t:"💡 Nos solutions", x:"🧼 Box de Dignité — kits hygiéniques en accès libre\n📱 Cycle+ — l'assistante santé menstruelle\n🎮 Quiz Dignité — éducation ludique sur les règles"},
            ].map((a,i) => (
              <div key={i} className="about-block">
                <div style={{fontFamily:"'Baloo 2',sans-serif",color:"#E8003D",fontWeight:800,marginBottom:7}}>{a.t}</div>
                <div style={{fontSize:".85rem",color:"#8B4A6B",lineHeight:1.7,whiteSpace:"pre-line"}}>{a.x}</div>
              </div>
            ))}
            <div className="about-block">
              <div style={{fontFamily:"'Baloo 2',sans-serif",color:"#E8003D",fontWeight:800,marginBottom:7}}>📞 Nous contacter</div>
              <a href="tel:+2250713512698" style={{display:"block",color:"#E8003D",fontWeight:800,marginBottom:5,textDecoration:"none"}}>
                📱 +225 07 13 51 26 98
              </a>
              <a href="mailto:onghappymums@gmail.com" style={{display:"block",color:"#FF6B9D",textDecoration:"none",fontSize:".85rem"}}>
                📧 onghappymums@gmail.com
              </a>
            </div>
            <div style={{textAlign:"center",fontSize:".73rem",color:"#8B4A6B",marginTop:4}}>
              ✅ Aucune donnée personnelle collectée · 🌐 Fonctionne hors connexion
            </div>
            <p className="copyright">© 2026 ONG Happy Mum's – Tous droits réservés</p>
          </div>
        )}

        {/* ═══ SOS ═══ */}
        {screen === "sos" && (
          <div className="scr">
            <div style={{fontFamily:"'Baloo 2',sans-serif",fontSize:"1.2rem",fontWeight:800,color:"#E8003D",marginBottom:14}}>
              🚨 Urgence & Aide
            </div>
            <p style={{fontSize:".84rem",color:"#8B4A6B",marginBottom:16,lineHeight:1.6,fontWeight:600}}>
              Numéros <strong>gratuits</strong> disponibles <strong>24h/24</strong> :
            </p>
            {[
              {n:"1308",l:"SOS Violences & Aide aux femmes",i:"🆘"},
              {n:"116", l:"Allô Enfant en Danger",           i:"👶"},
              {n:"110", l:"Police Secours",                   i:"👮"},
            ].map(n => (
              <button key={n.n} className="sos-btn" onClick={() => window.open(`tel:${n.n}`)}>
                <span style={{fontSize:"1.7rem"}}>{n.i}</span>
                <div>
                  <div style={{fontFamily:"'Baloo 2',sans-serif",fontSize:"1.9rem",fontWeight:800}}>{n.n}</div>
                  <div style={{fontSize:".78rem",opacity:.9}}>{n.l}</div>
                </div>
                <span style={{marginLeft:"auto",fontSize:"1.4rem"}}>📞</span>
              </button>
            ))}
            <div className="divider"/>
            <div style={{background:"rgba(255,255,255,.85)",border:"2px solid rgba(255,107,157,.22)",borderRadius:17,padding:17,textAlign:"center"}}>
              <img src={LOGO} alt="" style={{width:48,height:48,objectFit:"contain",marginBottom:8}}/>
              <div style={{fontFamily:"'Baloo 2',sans-serif",color:"#E8003D",fontWeight:800,fontSize:".98rem",marginBottom:10}}>
                ONG Happy Mum's est là pour toi 🌸
              </div>
              <a href="tel:+2250713512698" style={{display:"block",color:"#FF6B9D",fontWeight:800,marginBottom:5,textDecoration:"none"}}>
                📱 +225 07 13 51 26 98
              </a>
              <a href="mailto:onghappymums@gmail.com" style={{display:"block",color:"#8B4A6B",fontSize:".83rem",textDecoration:"none"}}>
                📧 onghappymums@gmail.com
              </a>
              <div style={{marginTop:11,fontSize:".82rem",color:"#8B4A6B",fontStyle:"italic",fontWeight:600}}>
                "Nous sommes là pour toi !"
              </div>
            </div>
            <p className="copyright">© 2026 ONG Happy Mum's – Tous droits réservés</p>
          </div>
        )}

      </div>

      {/* ═══ BOTTOM NAV ═══ */}
      {screen !== "quiz" && (
        <nav className="bottom-nav">
          {[
            {id:"home",     icon:"🏠", label:"Accueil"},
            {id:"progress", icon:"🏆", label:"Progrès"},
            {id:"about",    icon:"🌸", label:"À propos"},
            {id:"sos",      icon:"🚨", label:"SOS"},
            {id:"snd",      icon:snd?"🔊":"🔇", label:snd?"Son":"Muet"},
          ].map(n => (
            <button key={n.id} className={`nav-item${nav===n.id?" active":""}`} onClick={() => goNav(n.id)}>
              <span style={{fontSize:"1.28rem"}}>{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
