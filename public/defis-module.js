(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════
     DATA — 100 DÉFIS (séquentiels 0-99)
  ═══════════════════════════════════════════════════ */
  const DEFIS = [
    // ── 🩸 MENSTRUATION (0-19) ──
    { cat: 'menstruation', icon: '🩸', text: 'Les règles durent en moyenne combien de jours ? Note la date de début de tes prochaines règles. Connais ton cycle.' },
    { cat: 'menstruation', icon: '🩸', text: 'Si tu as déjà eu très mal pendant tes règles, dis-toi aujourd\'hui : "Je mérite des règles sans souffrance."' },
    { cat: 'menstruation', icon: '🩸', text: 'Si quelqu\'un te dit que tu es "impure" pendant tes règles, rappelle-toi : le sang des règles n\'est pas sale. C\'est ton corps qui se renouvelle. 💪' },
    { cat: 'menstruation', icon: '🩸', text: 'Bouge doucement aujourd\'hui : une marche, quelques étirements. Observe comment ton corps se sent — même pendant tes règles.' },
    { cat: 'menstruation', icon: '🩸', text: 'Pose une alarme discrète sur ton téléphone pour te rappeler de changer ta protection toutes 4 à 6 heures.' },
    { cat: 'menstruation', icon: '🩸', text: 'Essaie de noter la date de début de tes prochaines règles. Ton cycle est unique — apprends à le connaître.' },
    { cat: 'menstruation', icon: '🩸', text: 'Parle de ce que sont vraiment les règles à une amie aujourd\'hui — juste pour normaliser la conversation.' },
    { cat: 'menstruation', icon: '🩸', text: 'Fais 3 respirations profondes maintenant. Ton corps et ton cycle sont connectés à ton état émotionnel.' },
    { cat: 'menstruation', icon: '🩸', text: 'Tu te souviens de tes premières règles ? Comment tu t\'es sentie ? C\'est OK de se souvenir et d\'en parler.' },
    { cat: 'menstruation', icon: '🩸', text: 'Pose une question sur la contraception à quelqu\'un de confiance ou cherche une info fiable aujourd\'hui.' },
    { cat: 'menstruation', icon: '🩸', text: 'Tu n\'as jamais essayé les serviettes lavables ? Renseigne-toi — ça pourrait changer beaucoup de choses.' },
    { cat: 'menstruation', icon: '🩸', text: 'La prochaine fois que tes règles approchent, essaie de boire plus d\'eau. Observe la différence.' },
    { cat: 'menstruation', icon: '🩸', text: 'Parle de la précarité menstruelle à quelqu\'un qui ne sait pas ce que c\'est. Une phrase suffit.' },
    { cat: 'menstruation', icon: '🩸', text: 'Prends soin de toi avec tendresse aujourd\'hui, surtout si tu as tes règles. Une douche, c\'est OK — c\'est même recommandé.' },
    { cat: 'menstruation', icon: '🩸', text: 'Connais-tu à peu près quand tu ovules ? Ton cycle a ses propres signaux — apprends à les lire.' },
    { cat: 'menstruation', icon: '🩸', text: 'Tu connais ton flux habituel ? Commence à l\'observer — c\'est une info précieuse sur ta santé.' },
    { cat: 'menstruation', icon: '🩸', text: 'Pose une bouillotte ou bouteille d\'eau chaude sur ton ventre si tu as mal. Ça aide vraiment.' },
    { cat: 'menstruation', icon: '🩸', text: 'Dis le mot "règles" à voix haute aujourd\'hui, sans baisser la voix. 🌸' },
    { cat: 'menstruation', icon: '🩸', text: 'La prochaine fois que tu te sens "à fleur de peau" sans raison, vérifie où tu en es dans ton cycle.' },
    { cat: 'menstruation', icon: '🩸', text: 'Si tu souffres vraiment à chaque cycle, note-le et consulte. Ta douleur n\'est pas dans ta tête.' },

    // ── 💪 CONFIANCE & ESTIME DE SOI (20-39) ──
    { cat: 'confiance', icon: '💪', text: 'Dis le mot "règles" à voix haute aujourd\'hui — sans chuchoter, sans rougir. Juste le dire. C\'est déjà un acte de courage.' },
    { cat: 'confiance', icon: '💪', text: 'Calcule la date approximative de tes prochaines règles. Note-la quelque part. Connaître son corps, c\'est du pouvoir.' },
    { cat: 'confiance', icon: '💪', text: 'Regarde-toi dans un miroir pendant 30 secondes. Dis une seule chose que tu aimes chez toi. Une seule suffit.' },
    { cat: 'confiance', icon: '💪', text: 'Prépare une petite trousse de secours dans ton sac : une protection, un médicament si tu as souvent mal. Tu mérites d\'être prête.' },
    { cat: 'confiance', icon: '💪', text: 'Aujourd\'hui, refuse une remarque blessante sur ton corps — en silence, dans ta tête si tu ne peux pas à voix haute. Décide que cette remarque ne te définit pas.' },
    { cat: 'confiance', icon: '💪', text: 'Parle de tes règles à une amie sans baisser la voix. Juste naturellement, comme si c\'était normal. Parce que ça l\'est.' },
    { cat: 'confiance', icon: '💪', text: 'Écris 3 mots qui te décrivent telle que tu es — pas telle que les autres voudraient que tu sois.' },
    { cat: 'confiance', icon: '💪', text: 'Observe ta couleur de flux lors de tes prochaines règles sans paniquer. Note juste : clair, foncé, abondant, léger. Ton corps te parle.' },
    { cat: 'confiance', icon: '💪', text: 'Aujourd\'hui, dis non à quelque chose qui ne te convient pas. Même pour un petit truc. S\'affirmer s\'apprend.' },
    { cat: 'confiance', icon: '💪', text: 'Bois 8 verres d\'eau aujourd\'hui. Surtout pendant tes règles, ton corps en a besoin.' },
    { cat: 'confiance', icon: '💪', text: 'Envoie un message de fierté à une amie. Dis-lui une chose que tu admires en elle. La sororité commence là.' },
    { cat: 'confiance', icon: '💪', text: 'Note pendant 3 jours comment tu te sens avant tes règles — humeur, énergie, ventre. Tu vas commencer à voir un schéma.' },
    { cat: 'confiance', icon: '💪', text: 'Aujourd\'hui, occupe l\'espace. Parle en classe, lève la main, donne ton avis. Même si ta voix tremble.' },
    { cat: 'confiance', icon: '💪', text: 'Parle à ta maman, grande sœur ou tante de tes règles. Une vraie conversation. Demande-lui comment ça se passait pour elle.' },
    { cat: 'confiance', icon: '💪', text: 'Fais une liste de 5 choses que tu sais faire. Pas des qualités — des compétences. Cuisine, coiffure, maths, écoute, danse. Tout compte.' },
    { cat: 'confiance', icon: '💪', text: 'Si tu as mal pendant tes règles, essaie une bouillotte sur le ventre ce soir. Note si ça aide.' },
    { cat: 'confiance', icon: '💪', text: 'Aujourd\'hui, ne t\'excuse pas d\'exister. Si tu as tendance à dire "désolée" pour tout — observe combien de fois tu le fais. C\'est le début.' },
    { cat: 'confiance', icon: '💪', text: 'Explique à un garçon de ton entourage ce que sont les règles en une phrase simple. Sans gêne. Il a besoin de savoir.' },
    { cat: 'confiance', icon: '💪', text: 'Écris sur un papier une peur que tu gardes pour toi. Tu n\'as pas à la montrer. Juste la nommer. Nommer une peur, c\'est déjà la réduire.' },
    { cat: 'confiance', icon: '💪', text: 'Aujourd\'hui, compare-toi seulement à toi d\'hier. Pas aux autres filles. Pas aux réseaux sociaux. Juste : est-ce que j\'avance ?' },

    // ── 🗣️ PAROLE & TABOUS (40-59) ──
    { cat: 'parole', icon: '🗣️', text: 'Aujourd\'hui, apprends le nom scientifique d\'une partie de ton corps que tu n\'as jamais osé prononcer. Ton corps mérite d\'être connu et nommé correctement.' },
    { cat: 'parole', icon: '🗣️', text: 'Aujourd\'hui, pose une question sur ton corps à un adulte de confiance. Une vraie question que tu n\'as jamais osé poser.' },
    { cat: 'parole', icon: '🗣️', text: 'Si quelqu\'un fait une blague sur les règles devant toi aujourd\'hui, ne ris pas pour faire plaisir. Reste silencieuse ou dis simplement : "C\'est pas drôle."' },
    { cat: 'parole', icon: '🗣️', text: 'Écris sur un papier un mythe sur les règles que tu as déjà cru. Barre-le. Il n\'a plus de pouvoir sur toi.' },
    { cat: 'parole', icon: '🗣️', text: 'Aujourd\'hui, nomme une douleur que tu gardes pour toi d\'habitude. À toi-même, à une amie, ou juste sur papier. Nommer c\'est exister.' },
    { cat: 'parole', icon: '🗣️', text: 'Dis à quelqu\'un "j\'ai mes règles" sans chercher un mot de remplacement. Pas "mes affaires", pas "mes trucs". Les règles.' },
    { cat: 'parole', icon: '🗣️', text: 'Trouve une adulte — maman, tante, prof — et demande-lui comment elle vivait ses règles à ton âge. Écoute vraiment sa réponse.' },
    { cat: 'parole', icon: '🗣️', text: 'Aujourd\'hui, corrige une fausse info sur le corps féminin si tu en entends une. Doucement, mais clairement.' },
    { cat: 'parole', icon: '🗣️', text: 'Parle de la précarité menstruelle à quelqu\'un qui ne sait pas ce que c\'est. Une phrase suffit. Tu peux changer une vision.' },
    { cat: 'parole', icon: '🗣️', text: 'Si tu as déjà eu honte de tes règles, écris pourquoi. Pas pour garder la honte — pour la comprendre et la laisser partir.' },
    { cat: 'parole', icon: '🗣️', text: 'Aujourd\'hui, explique l\'ovulation à quelqu\'un en une phrase simple. Si tu ne sais pas encore — cherche, puis explique.' },
    { cat: 'parole', icon: '🗣️', text: 'Dis à voix haute : "Mon corps ne me fait pas honte." Une fois. Devant ton miroir. Même si tu n\'y crois pas encore totalement.' },
    { cat: 'parole', icon: '🗣️', text: 'Trouve un mot en ta langue locale pour désigner les règles. Réfléchis à ce que ce mot dit de la façon dont on voit les femmes.' },
    { cat: 'parole', icon: '🗣️', text: 'Aujourd\'hui, refuse d\'utiliser un euphémisme pour parler de ton corps. Appelle les choses par leur nom pendant toute la journée.' },
    { cat: 'parole', icon: '🗣️', text: 'Si tu connais une fille plus jeune que toi, dis-lui une vérité sur les règles que tu aurais aimé savoir à son âge.' },
    { cat: 'parole', icon: '🗣️', text: 'Écris une question que tu n\'as jamais osé poser sur ton corps. Garde-la. Cherche la réponse avant la fin de la semaine.' },
    { cat: 'parole', icon: '🗣️', text: 'Aujourd\'hui, parle de tes règles sans t\'excuser de les mentionner. Pas de "désolée c\'est gênant mais…". Juste la phrase.' },
    { cat: 'parole', icon: '🗣️', text: 'Dis à un garçon de ton entourage une vraie info sur le cycle menstruel. Sans gêne, comme tu lui parlerais de météo.' },
    { cat: 'parole', icon: '🗣️', text: 'Pense à un tabou lié au corps féminin dans ta famille ou ta communauté. Écris-le. Tu n\'as pas à l\'accepter parce qu\'il existe depuis longtemps.' },
    { cat: 'parole', icon: '🗣️', text: 'Aujourd\'hui, parle de toi à la première personne. "Je pense que…", "Je veux…", "Je ressens…". Ta voix compte. Elle a toujours compté.' },

    // ── 🤝 SORORITÉ (60-79) ──
    { cat: 'sororite', icon: '🤝', text: 'Passe une serviette hygiénique à une amie sans qu\'elle ait à demander deux fois. La solidarité ne se fait pas attendre.' },
    { cat: 'sororite', icon: '🤝', text: 'Aujourd\'hui, défends une fille qu\'on critique pour son corps — son poids, sa taille, sa peau. Une phrase suffit.' },
    { cat: 'sororite', icon: '🤝', text: 'Envoie un message vocal ou écrit à une amie pour lui dire une chose vraie et belle sur elle. Pas un emoji — des mots.' },
    { cat: 'sororite', icon: '🤝', text: 'Si une amie a ses règles et se sent mal, propose-lui quelque chose de concret — une bouillotte, t\'asseoir avec elle, lui apporter de l\'eau.' },
    { cat: 'sororite', icon: '🤝', text: 'Aujourd\'hui, ne participe pas aux ragots sur le corps ou la vie intime d\'une autre fille. Sors de la conversation si tu dois.' },
    { cat: 'sororite', icon: '🤝', text: 'Pense à une fille que tu admires dans ton entourage. Dis-le lui directement aujourd\'hui. On ne le dit pas assez.' },
    { cat: 'sororite', icon: '🤝', text: 'Si tu vois une fille mal à l\'aise ou en difficulté aujourd\'hui, approche-toi. Demande juste : "Ça va ?"' },
    { cat: 'sororite', icon: '🤝', text: 'Partage une info utile sur la santé menstruelle dans un groupe WhatsApp de filles. Pas un cours — juste une chose simple et vraie.' },
    { cat: 'sororite', icon: '🤝', text: 'Aujourd\'hui, célèbre la réussite d\'une amie sans jalousie. Sa victoire ne diminue pas la tienne.' },
    { cat: 'sororite', icon: '🤝', text: 'Pense à une fille que tu as jugée sans la connaître. Décide aujourd\'hui de la voir différemment.' },
    { cat: 'sororite', icon: '🤝', text: 'Si une amie te parle de douleurs menstruelles, ne lui dis pas "c\'est normal, supporte". Écoute-la vraiment.' },
    { cat: 'sororite', icon: '🤝', text: 'Invite une amie à faire le Quiz Dignité avec toi. Comparez vos résultats. Riez, apprenez, grandissez ensemble.' },
    { cat: 'sororite', icon: '🤝', text: 'Aujourd\'hui, prête quelque chose sans attendre qu\'on te le rende — un stylo, une protection, un sourire.' },
    { cat: 'sororite', icon: '🤝', text: 'Si tu es en position d\'aider une fille plus jeune, fais-le. Réponds à une question, rassure, accompagne.' },
    { cat: 'sororite', icon: '🤝', text: 'Rappelle à une amie qu\'elle a le droit de dire non — à une sortie, une pression, une situation qui ne lui convient pas.' },
    { cat: 'sororite', icon: '🤝', text: 'Aujourd\'hui, écoute une amie sans chercher à donner des conseils. Juste écouter. C\'est déjà énorme.' },
    { cat: 'sororite', icon: '🤝', text: 'Pense à une fille qui manque de protections menstruelles près de toi. Qu\'est-ce que tu pourrais faire concrètement ?' },
    { cat: 'sororite', icon: '🤝', text: 'Dis à une amie : "Tu n\'as pas à souffrir en silence." Ces 6 mots peuvent changer sa journée.' },
    { cat: 'sororite', icon: '🤝', text: 'Crée ou rejoins un espace de parole entre filles — même informel, même 3 personnes. Les filles ont besoin de se parler.' },
    { cat: 'sororite', icon: '🤝', text: 'Aujourd\'hui, sois la grande sœur que tu aurais voulu avoir. Pour une fille autour de toi. Juste aujourd\'hui.' },

    // ── 🧘 CORPS & BIEN-ÊTRE (80-99) ──
    { cat: 'bienetre', icon: '🧘', text: 'Dors 8 heures cette nuit. Pas de négociation. Ton corps reconstruit tout pendant que tu dors.' },
    { cat: 'bienetre', icon: '🧘', text: 'Bois 1,5 litre d\'eau aujourd\'hui. Pose une bouteille devant toi dès le matin. Ton cycle menstruel te remerciera.' },
    { cat: 'bienetre', icon: '🧘', text: 'Fais 10 minutes d\'étirements ce soir avant de dormir. Pas du sport — juste laisser ton corps se déposer.' },
    { cat: 'bienetre', icon: '🧘', text: 'Mange un fruit ou un légume aujourd\'hui que tu n\'as pas l\'habitude de manger. Ton corps aime la variété.' },
    { cat: 'bienetre', icon: '🧘', text: 'Pose une main sur ton ventre. Respire profondément 5 fois. Sens ton corps vivant. C\'est tout. C\'est suffisant.' },
    { cat: 'bienetre', icon: '🧘', text: 'Aujourd\'hui, repose-toi sans culpabilité. Se reposer n\'est pas de la paresse. C\'est du soin.' },
    { cat: 'bienetre', icon: '🧘', text: 'Note dans un carnet ou ton téléphone comment tu te sens physiquement aujourd\'hui. Énergie, ventre, tête. Juste observer.' },
    { cat: 'bienetre', icon: '🧘', text: 'Danse seule dans ta chambre pendant une chanson. Ton corps mérite de bouger pour le plaisir, pas seulement pour les autres.' },
    { cat: 'bienetre', icon: '🧘', text: 'Mange lentement à un repas aujourd\'hui. Pose ta fourchette entre chaque bouchée. Écoute quand ton corps dit "c\'est assez".' },
    { cat: 'bienetre', icon: '🧘', text: 'Identifie une tension dans ton corps — épaules, mâchoire, ventre. Respire dessus. Laisse-la partir doucement.' },
    { cat: 'bienetre', icon: '🧘', text: 'Aujourd\'hui, limite les réseaux sociaux à 30 minutes. Observe comment tu te sens dans ton corps quand tu décroches.' },
    { cat: 'bienetre', icon: '🧘', text: 'Marche 20 minutes dehors aujourd\'hui. Pas pour maigrir. Pour te sentir vivante et présente dans ton corps.' },
    { cat: 'bienetre', icon: '🧘', text: 'Prends une douche en prenant le temps — pas en vitesse. Ton corps mérite qu\'on s\'occupe de lui avec attention.' },
    { cat: 'bienetre', icon: '🧘', text: 'Ce soir, écris 3 sensations positives que ton corps t\'a offertes aujourd\'hui. La chaleur du soleil, un bon repas, un fou rire.' },
    { cat: 'bienetre', icon: '🧘', text: 'Aujourd\'hui, ne saute aucun repas. Ton corps a besoin de carburant régulier — surtout pendant et avant tes règles.' },
    { cat: 'bienetre', icon: '🧘', text: 'Identifie un aliment que tu manges quand tu as tes règles qui aggrave tes douleurs (sucre, sel, friture). Essaie de le réduire cette fois.' },
    { cat: 'bienetre', icon: '🧘', text: 'Ris aujourd\'hui — vraiment. Cherche quelque chose qui te fait rire. Le rire est une médecine que personne ne te prescrit assez.' },
    { cat: 'bienetre', icon: '🧘', text: 'Aujourd\'hui, touche ton corps avec bienveillance — pas pour le juger, pas pour le comparer. Juste poser tes mains et te dire : ce corps est à moi.' },
    { cat: 'bienetre', icon: '🧘', text: 'Dors tôt ce soir — avant 22h si tu peux. Observe demain matin comment tu te réveilles différemment.' },
    { cat: 'bienetre', icon: '🧘', text: 'Écris une lettre d\'une phrase à ton corps : "Ce que je veux pour toi cette année, c\'est…" Tu n\'as pas à la montrer. Juste l\'écrire.' }
  ];

  /* ═══════════════════════════════════════════════════
     DONNÉES SPÉCIALES PAR DATE (mois-jour)
  ═══════════════════════════════════════════════════ */
  const SPECIAL_DEFIS = {
    '5-28': {
      icon: '🌸', special: true,
      title: 'Journée Mondiale de l\'Hygiène Menstruelle',
      message: 'Aujourd\'hui, des millions de filles dans le monde n\'ont pas de protection menstruelle. Toi tu es là. Tu apprends. Tu agis. C\'est déjà une forme de militantisme.',
      text: 'Parle des règles à 3 personnes aujourd\'hui. Pas en chuchotant. Naturellement. Comme si c\'était normal — parce que ça l\'est.'
    },
    '3-8': {
      icon: '💪', special: true,
      title: 'Journée Internationale des Femmes',
      message: 'Être une femme ce n\'est pas une limite. C\'est une force qu\'on t\'a appris à minimiser. Aujourd\'hui, on arrête.',
      text: 'Écris le nom d\'une femme qui t\'inspire — dans ta famille, ton quartier, ton pays. Dis-lui ou écris pourquoi elle compte. Aujourd\'hui, les femmes se célèbrent entre elles.'
    },
    '10-11': {
      icon: '🌍', special: true,
      title: 'Journée Internationale de la Fille',
      message: 'Il y a des filles qui n\'ont pas pu ouvrir cette app aujourd\'hui. Pas parce qu\'elles ne voulaient pas — parce qu\'elles n\'en avaient pas le droit. Toi tu l\'as. Utilise-le.',
      text: 'Partage Quiz Dignité avec une fille que tu connais. Une seule. Tu viens peut-être de changer quelque chose pour elle.'
    },
    '11-25': {
      icon: '🚫', special: true,
      title: 'Journée contre les Violences faites aux Femmes',
      message: 'Ton corps t\'appartient. Personne n\'a le droit de te faire du mal, de te forcer, de te faire honte. Si quelque chose ne va pas — tu peux en parler. Tu mérites d\'être protégée.',
      text: 'Dis à une fille autour de toi : "Si jamais tu as besoin, je suis là." Ces mots peuvent tout changer.'
    },
    '7-31': {
      icon: '👩🏾‍🤝‍👩🏾', special: true,
      title: 'Journée de la Femme Africaine',
      message: 'Les femmes africaines portent ce continent depuis toujours — souvent en silence. Aujourd\'hui on leur rend hommage. Et on décide de porter notre part, debout et fières.',
      text: 'Pense à une femme africaine — connue ou inconnue — qui t\'a montré ce que la force veut dire. Écris son nom. Garde-le précieusement.'
    },
    '10-1': {
      icon: '🏫', special: true,
      title: 'Journée Internationale des Enseignants',
      message: 'Des milliers de filles abandonnent l\'école à cause de leurs règles. Parce qu\'elles n\'ont pas de protection. Parce qu\'elles ont honte. L\'éducation est un droit. Ton avenir aussi.',
      text: 'Aujourd\'hui, remercie un enseignant ou une enseignante qui t\'a appris quelque chose d\'important. Pas forcément en classe — dans la vie.'
    },
    '4-6': {
      icon: '🤸🏾‍♀️', special: true,
      title: 'Journée Mondiale du Sport Féminin',
      message: 'Ton corps est capable de choses incroyables — même pendant tes règles. Surtout pendant tes règles. Bouge, transpire, existe pleinement.',
      text: 'Fais 15 minutes de mouvement aujourd\'hui — danse, marche, sport. Prouve-toi que ton corps est fort, pas faible. Que tu aies tes règles ou non.'
    },
    '11-20': {
      icon: '🧒🏾', special: true,
      title: 'Journée Mondiale des Droits de l\'Enfant',
      message: 'Tu as des droits. Le droit d\'aller à l\'école. Le droit d\'être protégée. Le droit de connaître ton corps. Le droit de dire non. Personne ne peut te les enlever — même si parfois on fait comme s\'ils n\'existaient pas.',
      text: 'Écris un droit que tu veux exercer pleinement cette année. Pas pour quelqu\'un d\'autre — pour toi.'
    }
  };

  /* ═══════════════════════════════════════════════════
     LOGIQUE TEMPORELLE & STREAK
  ═══════════════════════════════════════════════════ */
  function getDayOfYear() {
    const n = new Date();
    const start = new Date(n.getFullYear(), 0, 0);
    return Math.floor((n - start) / 86400000);
  }

  function getTodayKey() {
    const n = new Date();
    return `${n.getFullYear()}-${n.getMonth() + 1}-${n.getDate()}`;
  }

  function getSpecialKey() {
    const n = new Date();
    return `${n.getMonth() + 1}-${n.getDate()}`;
  }

  function getCurrentDefi() {
    const special = SPECIAL_DEFIS[getSpecialKey()];
    if (special) return special;
    return DEFIS[(getDayOfYear() - 1) % 100];
  }

  function isDoneToday() {
    return localStorage.getItem('hm_defi_last_done') === getTodayKey();
  }

  function getStreak() {
    return parseInt(localStorage.getItem('hm_defi_streak') || '0', 10);
  }

  function getTotalDone() {
    return parseInt(localStorage.getItem('hm_defi_total_done') || '0', 10);
  }

  function getUnlockedBadges() {
    try { return JSON.parse(localStorage.getItem('hm_badges_defi') || '[]'); }
    catch { return []; }
  }

  function markDone() {
    const today = getTodayKey();
    const lastDone = localStorage.getItem('hm_defi_last_done');
    const yesterday = (() => {
      const d = new Date(); d.setDate(d.getDate() - 1);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    })();

    let streak = getStreak();
    if (lastDone === today) return { streak, newBadges: [] }; // already done
    if (lastDone === yesterday) { streak++; }
    else { streak = 1; }

    const done = getTotalDone() + 1;
    localStorage.setItem('hm_defi_last_done', today);
    localStorage.setItem('hm_defi_streak', String(streak));
    localStorage.setItem('hm_defi_total_done', String(done));

    const newBadges = checkBadges(streak, done);
    return { streak, newBadges };
  }

  function checkBadges(streak, done) {
    const badges = getUnlockedBadges();
    const newBadges = [];

    const award = (id, icon, name, text) => {
      if (!badges.includes(id)) {
        badges.push(id);
        newBadges.push({ icon, name, text });
      }
    };

    award('curieuse', '🌱', 'Curieuse', 'Tu as ouvert la porte. La curiosité est le début de tout.');
    if (streak >= 7) award('constante', '🔥', 'Constante', '7 jours de suite. Tu reviens. C\'est ça la vraie force.');
    if (done >= 20) award('consciente', '🌸', 'Consciente', 'Tu connais ton corps. Tu te connais toi-même. C\'est rare et précieux.');
    if (done >= 50) award('liberee', '👑', 'Libérée', '50 défis. Tu n\'es plus celle d\'avant. Et c\'est exactement ce qu\'on voulait pour toi.');

    localStorage.setItem('hm_badges_defi', JSON.stringify(badges));
    return newBadges;
  }

  function getStreakMessage(streak) {
    if (streak >= 100) return '100 jours. Tu as tout vu, tout appris, tout vécu. Quiz Dignité t\'appartient maintenant. 🔥👑🌸';
    if (streak >= 50)  return '50 jours sans t\'arrêter. Tu n\'es plus une débutante. Tu es une Girl qui sait ce qu\'elle veut.';
    if (streak >= 30)  return '1 mois. Tu es constante, tu es sérieuse, tu grandis. Respect. 👑';
    if (streak >= 21)  return '21 jours. Les scientifiques disent que c\'est le temps pour créer une habitude. Tu viens de le prouver. 🔥🔥🔥';
    if (streak >= 14)  return '2 semaines. Tu es dans le rythme maintenant. Ne t\'arrête pas.';
    if (streak >= 7)   return '1 semaine. Tu n\'as pas lâché. Ton corps est fier de toi. 🔥🔥';
    if (streak >= 3)   return '3 jours de suite. Tu commences à prendre l\'habitude. Continue.';
    return 'C\'est parti. Ta flamme vient de s\'allumer. 🔥';
  }

  /* ═══════════════════════════════════════════════════
     MODAL DÉFI DU JOUR
  ═══════════════════════════════════════════════════ */
  let modalEl = null;
  let autoShownToday = false;

  function buildModal() {
    const el = document.createElement('div');
    el.id = 'hm-defi-modal';
    el.style.cssText = `
      position:fixed;inset:0;z-index:9999;
      background:rgba(45,10,31,.72);backdrop-filter:blur(6px);
      display:flex;align-items:flex-end;justify-content:center;
      opacity:0;transition:opacity .25s;pointer-events:none;
    `;
    el.innerHTML = `
      <div id="hm-defi-sheet" style="
        width:100%;max-width:480px;
        background:#FFF4F7;border-radius:28px 28px 0 0;
        padding:28px 22px 42px;
        transform:translateY(100%);transition:transform .3s cubic-bezier(.32,1.2,.6,1);
        max-height:92vh;overflow-y:auto;
      ">
        <div style="width:40px;height:4px;background:#E8003D33;border-radius:99px;margin:0 auto 20px;"></div>
        <div id="hm-defi-header" style="text-align:center;margin-bottom:18px;"></div>
        <div id="hm-defi-body" style="
          background:linear-gradient(135deg,#FFF0F5,#FFE8EF);
          border-radius:18px;padding:20px 18px;margin-bottom:18px;
          border:1.5px solid rgba(232,0,61,.12);
        "></div>
        <div id="hm-defi-streak" style="margin-bottom:18px;"></div>
        <div id="hm-defi-badges" style="margin-bottom:18px;"></div>
        <div style="display:flex;gap:10px;">
          <button id="hm-defi-later" style="
            flex:1;padding:14px;border-radius:14px;border:2px solid rgba(232,0,61,.2);
            background:white;color:#B33;font-size:.88rem;font-weight:700;cursor:pointer;
          ">Plus tard</button>
          <button id="hm-defi-done" style="
            flex:2;padding:14px;border-radius:14px;border:none;
            background:linear-gradient(135deg,#E8003D,#FF6B9D);
            color:white;font-size:.92rem;font-weight:800;cursor:pointer;
            box-shadow:0 5px 18px rgba(232,0,61,.32);
          ">Défi accompli 🌸</button>
        </div>
      </div>
    `;

    el.addEventListener('click', (e) => {
      if (e.target === el) hideModal();
    });
    el.querySelector('#hm-defi-later').addEventListener('click', hideModal);
    el.querySelector('#hm-defi-done').addEventListener('click', handleDone);

    document.body.appendChild(el);
    return el;
  }

  function populateModal() {
    const defi = getCurrentDefi();
    const streak = getStreak();
    const done = isDoneToday();

    const header = modalEl.querySelector('#hm-defi-header');
    const body = modalEl.querySelector('#hm-defi-body');
    const streakEl = modalEl.querySelector('#hm-defi-streak');
    const badgesEl = modalEl.querySelector('#hm-defi-badges');
    const doneBtn = modalEl.querySelector('#hm-defi-done');

    // Header
    if (defi.special) {
      header.innerHTML = `
        <div style="font-size:2.2rem;margin-bottom:6px;">${defi.icon}</div>
        <div style="font-size:.72rem;font-weight:700;color:#E8003D;letter-spacing:.5px;text-transform:uppercase;margin-bottom:4px;">Jour spécial</div>
        <div style="font-size:1.05rem;font-weight:800;color:#2D0A1F;">${defi.title}</div>
      `;
    } else {
      const catLabels = { menstruation:'Santé menstruelle', confiance:'Confiance & Estime', parole:'Parole & Tabous', sororite:'Sororité', bienetre:'Corps & Bien-être' };
      header.innerHTML = `
        <div style="font-size:2rem;margin-bottom:6px;">${defi.icon}</div>
        <div style="font-size:.72rem;font-weight:700;color:#E8003D;letter-spacing:.5px;text-transform:uppercase;margin-bottom:4px;">Défi du jour · ${catLabels[defi.cat] || ''}</div>
        <div style="font-size:1rem;font-weight:800;color:#2D0A1F;">À toi de jouer 🌸</div>
      `;
    }

    // Body
    if (defi.special) {
      body.innerHTML = `
        <div style="font-size:.82rem;color:#7A3D5A;line-height:1.7;margin-bottom:14px;font-style:italic;">${defi.message}</div>
        <div style="font-size:.92rem;color:#2D0A1F;line-height:1.7;font-weight:600;">${defi.text}</div>
      `;
    } else {
      body.innerHTML = `<div style="font-size:.95rem;color:#2D0A1F;line-height:1.75;font-weight:600;">${defi.text}</div>`;
    }

    // Streak
    if (streak > 0) {
      const flames = streak >= 7 ? '🔥🔥' : streak >= 3 ? '🔥' : '';
      streakEl.innerHTML = `
        <div style="background:linear-gradient(135deg,#FFE8EF,#FFD6E8);border-radius:14px;padding:13px 16px;display:flex;align-items:center;gap:10px;">
          <span style="font-size:1.6rem;">🔥</span>
          <div>
            <div style="font-size:.78rem;font-weight:700;color:#E8003D;">${streak} jour${streak > 1 ? 's' : ''} de suite ${flames}</div>
            <div style="font-size:.72rem;color:#7A3D5A;margin-top:2px;">${getStreakMessage(streak)}</div>
          </div>
        </div>
      `;
    } else {
      streakEl.innerHTML = '';
    }

    // Badges pending display (cleared after shown)
    badgesEl.innerHTML = '';

    // Done state
    if (done) {
      doneBtn.textContent = '✅ Défi fait aujourd\'hui';
      doneBtn.style.background = 'linear-gradient(135deg,#7FB069,#52A35D)';
      doneBtn.disabled = true;
      doneBtn.style.opacity = '0.85';
    } else {
      doneBtn.textContent = 'Défi accompli 🌸';
      doneBtn.style.background = 'linear-gradient(135deg,#E8003D,#FF6B9D)';
      doneBtn.disabled = false;
      doneBtn.style.opacity = '1';
    }
  }

  function showDefiModal(auto) {
    if (!modalEl) modalEl = buildModal();
    populateModal();

    modalEl.style.pointerEvents = 'auto';
    modalEl.style.opacity = '1';
    requestAnimationFrame(() => {
      const sheet = modalEl.querySelector('#hm-defi-sheet');
      if (sheet) sheet.style.transform = 'translateY(0)';
    });
  }

  function hideModal() {
    if (!modalEl) return;
    const sheet = modalEl.querySelector('#hm-defi-sheet');
    if (sheet) sheet.style.transform = 'translateY(100%)';
    modalEl.style.opacity = '0';
    setTimeout(() => { if (modalEl) modalEl.style.pointerEvents = 'none'; }, 300);
  }

  function handleDone() {
    if (isDoneToday()) { hideModal(); return; }
    const { streak, newBadges } = markDone();

    const doneBtn = modalEl.querySelector('#hm-defi-done');
    doneBtn.textContent = '✅ Bravo !';
    doneBtn.style.background = 'linear-gradient(135deg,#7FB069,#52A35D)';
    doneBtn.disabled = true;

    // Update streak display
    const streakEl = modalEl.querySelector('#hm-defi-streak');
    const flames = streak >= 7 ? '🔥🔥' : streak >= 3 ? '🔥' : '';
    streakEl.innerHTML = `
      <div style="background:linear-gradient(135deg,#FFE8EF,#FFD6E8);border-radius:14px;padding:13px 16px;display:flex;align-items:center;gap:10px;">
        <span style="font-size:1.6rem;">🔥</span>
        <div>
          <div style="font-size:.78rem;font-weight:700;color:#E8003D;">${streak} jour${streak > 1 ? 's' : ''} de suite ${flames}</div>
          <div style="font-size:.72rem;color:#7A3D5A;margin-top:2px;">${getStreakMessage(streak)}</div>
        </div>
      </div>
    `;

    // Show new badges
    if (newBadges.length > 0) {
      const badgesEl = modalEl.querySelector('#hm-defi-badges');
      badgesEl.innerHTML = newBadges.map(b => `
        <div style="background:linear-gradient(135deg,#FFF0F5,#FFE0EE);border-radius:14px;padding:12px 16px;margin-bottom:8px;display:flex;align-items:center;gap:10px;border:1.5px solid rgba(232,0,61,.18);animation:hmBadgePop .4s cubic-bezier(.32,1.2,.6,1);">
          <span style="font-size:1.8rem;">${b.icon}</span>
          <div>
            <div style="font-size:.8rem;font-weight:800;color:#E8003D;">Badge débloqué : ${b.name}</div>
            <div style="font-size:.72rem;color:#7A3D5A;margin-top:2px;">${b.text}</div>
          </div>
        </div>
      `).join('');
    }

    setTimeout(hideModal, 2200);
  }

  /* ═══════════════════════════════════════════════════
     CONFIDENTIALITÉ — PAGE OVERLAY
  ═══════════════════════════════════════════════════ */
  let privacyEl = null;

  function buildPrivacyPage() {
    const el = document.createElement('div');
    el.id = 'hm-privacy-page';
    el.style.cssText = `
      position:fixed;inset:0;z-index:9998;
      background:#FFF4F7;overflow-y:auto;
      transform:translateX(100%);transition:transform .3s ease;
    `;
    el.innerHTML = `
      <div style="max-width:480px;margin:0 auto;padding:24px 20px 80px;">
        <button id="hm-privacy-back" style="
          background:white;border:1.5px solid rgba(232,0,61,.2);border-radius:12px;
          padding:7px 16px;font-size:.82rem;color:#B33;font-weight:700;cursor:pointer;margin-bottom:20px;
        ">← Retour</button>
        <div style="text-align:center;margin-bottom:22px;">
          <div style="font-size:2rem;margin-bottom:6px;">🔐</div>
          <div style="font-size:1.2rem;font-weight:800;color:#E8003D;">Politique de confidentialité</div>
          <div style="font-size:.75rem;color:#9B6B8A;margin-top:4px;">ONG Happy Mum's — Quiz Dignité</div>
        </div>
        ${[
          ['📋 Collecte des données', 'Quiz Dignité collecte uniquement les informations que vous saisissez volontairement (prénom, pays). Ces données sont stockées localement sur votre appareil via le mécanisme localStorage et ne sont jamais transmises à des serveurs externes.'],
          ['📊 Données de progression', 'Votre progression dans le quiz (points, badges, historique de jeu, streak de défis) est également stockée localement sur votre appareil. Ces données vous appartiennent et disparaissent si vous effacez les données de votre navigateur.'],
          ['🔍 Google Analytics', 'Nous utilisons Google Analytics 4 pour mesurer l\'audience globale de l\'application (nombre de visites, pays, comportement général). Ces données sont anonymisées et agrégées. Aucune donnée personnelle identifiable n\'est transmise à Google.'],
          ['👶 Protection des mineures', 'Quiz Dignité est conçu pour les jeunes filles à partir de 12 ans. Nous ne collectons pas délibérément de données personnelles sensibles. Aucun compte utilisateur n\'est créé. Aucun mot de passe n\'est requis.'],
          ['🍪 Cookies', 'Nous n\'utilisons pas de cookies publicitaires ou de traçage. Le stockage local (localStorage) utilisé ne constitue pas un cookie au sens légal.'],
          ['🤝 Partage de données', 'ONG Happy Mum\'s ne vend, ne loue et ne partage aucune donnée personnelle avec des tiers à des fins commerciales.'],
          ['✏️ Vos droits', 'Vous pouvez à tout moment effacer vos données en vidant le stockage local de votre navigateur. Pour toute demande, contactez-nous à onghappymums@gmail.com.'],
          ['📞 Contact', 'ONG Happy Mum\'s — Abidjan, Côte d\'Ivoire\n📱 +225 07 13 51 26 98\n📧 onghappymums@gmail.com\n🌐 quizdignite.org'],
        ].map(([t, x]) => `
          <div style="background:rgba(255,255,255,.85);border-radius:16px;padding:16px;margin-bottom:10px;border:1.5px solid rgba(255,107,157,.12);">
            <div style="font-size:.9rem;font-weight:800;color:#E8003D;margin-bottom:7px;">${t}</div>
            <div style="font-size:.82rem;color:#6B4E6B;line-height:1.7;white-space:pre-line;">${x}</div>
          </div>
        `).join('')}
        <p style="font-size:.65rem;color:#B09AB0;text-align:center;margin-top:16px;">Dernière mise à jour : mai 2026 · © ONG Happy Mum's</p>
      </div>
    `;
    el.querySelector('#hm-privacy-back').addEventListener('click', hidePrivacy);
    document.body.appendChild(el);
    return el;
  }

  function showPrivacy() {
    if (!privacyEl) privacyEl = buildPrivacyPage();
    requestAnimationFrame(() => { privacyEl.style.transform = 'translateX(0)'; });
  }

  function hidePrivacy() {
    if (privacyEl) privacyEl.style.transform = 'translateX(100%)';
  }

  /* ═══════════════════════════════════════════════════
     DOM HOOKS — détection profil & injection nav
  ═══════════════════════════════════════════════════ */
  function isFilleProfil() {
    const root = document.getElementById('root');
    return root ? root.innerHTML.includes('👧 Je suis une fille') : false;
  }

  // Renomme "Défis éducatifs" → "Défi du jour" pour le profil fille
  function patchDefiCard() {
    if (!isFilleProfil()) return;
    const root = document.getElementById('root');
    if (!root) return;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.textContent === 'Défis éducatifs') {
        node.textContent = 'Défi du jour';
      }
      if (node.textContent === '5 défis — discussion orale') {
        node.textContent = 'Le défi d\'aujourd\'hui 🌸';
      }
    }

    // Mise à jour icône 🎯 → 🌸 sur la tuile
    root.querySelectorAll('span').forEach(span => {
      if (span.textContent === '🎯' && span.parentElement) {
        const card = span.closest('div[style*="border-radius:18px"]') || span.closest('div[style*="border-radius: 18px"]');
        if (card && card.innerText && (card.innerText.includes('Défi du jour') || card.innerText.includes('Défis éducatifs'))) {
          span.textContent = '🌸';
        }
      }
    });
  }

  // Auto-show : ouvre le modal automatiquement quand fille arrive sur quiz_cats (une fois par session)
  let autoShownFlag = false;
  function checkAutoShow() {
    if (autoShownFlag) return;
    if (!isFilleProfil()) { autoShownFlag = false; return; }
    const root = document.getElementById('root');
    if (!root || !root.innerHTML.includes('Choisis un type de questions')) return;
    autoShownFlag = true;
    setTimeout(() => showDefiModal(true), 350);
  }

  function checkScreenReset() {
    if (!document.getElementById('root')?.innerHTML.includes('Choisis un type de questions')) {
      autoShownFlag = false;
    }
  }

  /* ═══════════════════════════════════════════════════
     EXPOSE GLOBAL FUNCTIONS
  ═══════════════════════════════════════════════════ */
  window.qdShowDailyDefi = () => showDefiModal(false);
  window.qdShowPrivacy = showPrivacy;

  /* ═══════════════════════════════════════════════════
     MUTATION OBSERVER — surveillance du DOM React
  ═══════════════════════════════════════════════════ */
  let debounceTimer = null;
  function onMutation() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      checkScreenReset();
      patchDefiCard();
      checkAutoShow();
    }, 120);
  }

  const observer = new MutationObserver(onMutation);
  observer.observe(document.body, { childList: true, subtree: true });

  /* ═══════════════════════════════════════════════════
     STYLE ANIMATION BADGE
  ═══════════════════════════════════════════════════ */
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    @keyframes hmBadgePop {
      from { transform: scale(.7); opacity: 0; }
      to   { transform: scale(1); opacity: 1; }
    }
  `;
  document.head.appendChild(styleEl);

})();
