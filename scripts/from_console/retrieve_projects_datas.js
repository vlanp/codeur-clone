// Configuration
const BASE_URL = "https://www.codeur.com"; // Modifiez selon votre site
const PROJECT_URLS = [
  "/projects/395427-ameliorer-le-logiciel-de-pause-workrave",
  "/projects/463106-recherche-developpeur",
  "/projects/463115-application-mobile-voyages-avec-geolocalisation",
  "/projects/463113-recherche-developpeur-python-urgent",
  "/projects/463112-fusion-de-formulaires-pour-generer-un-base-de-donnees",
  "/projects/463105-alerte-fichiers-modifier-sur-nas-synolgy",
  "/projects/419368-application-mobile-vtc",
  "/projects/463099-creation-de-saas-ultra-complexe-avec-integration-ia",
  "/projects/463098-jeu-video-de-foot-mobile-en-3v3-4v4-5v5",
  "/projects/463068-creation-d-une-application-simple-pour-les-slameurs",
  "/projects/463087-faire-un-devis-projet-gaming",
  "/projects/457747-j-ai-commence-une-application-sur-adalo-j-aimerais-la-perfectionner",
  "/projects/463084-devloppeur",
  "/projects/462779-developpeur-ia",
  "/projects/463076-developpement-d-un-mod-gta-avec-interactions",
  "/projects/463071-esp32-s3-ota-via-url",
  "/projects/463065-recherche-de-reine-d-abeille-non-marquee-sur-cadre-de-ruche",
  "/projects/463060-recherche-developpeur-mobile-android-et-ios",
  "/projects/463046-recherche-un-developpeur",
  "/projects/459516-specialiste-developpeur-symfony",
  "/projects/463037-developpement-d-une-application-de-vente-de-photos-evenementielles",
  "/projects/463028-integration-web-refonte-graphique-html-django-front-end",
  "/projects/463025-developpement-d-un-simulateur-de-devis-web-avec-calendrier-tva-pdf",
  "/projects/463019-notion-yield-tableau-de-bord-dashboard-kpi",
  "/projects/463016-recherche-developpeur-mobile",
  "/projects/463014-recherche-developpeur-sketchfab-pour-configurateur-3d",
  "/projects/268744-projet-confidentiel",
  "/projects/463005-application-web",
  "/projects/463004-recherche-developpeur-mobile",
  "/projects/462989-recherche-developpeur-web",
  "/projects/462967-creation-d-une-application-mobile",
  "/projects/462987-recherche-developpeur-mobile",
  "/projects/462986-creation-d-un-serveur-gta-rp-five-m",
  "/projects/462974-developpeur-fullstack-react-java-spring-boot-a-toulouse",
  "/projects/462968-developpement-application-mobile-secuanimale",
];

// Fonction pour extraire les données d'un document HTML
function extractProjectFromDocument(doc, projectUrl) {
  const project = { url: projectUrl };

  try {
    // Extraire l'ID du projet depuis l'URL
    const idMatch = projectUrl.match(/\/projects\/(\d+)/);
    project.id = idMatch ? idMatch[1] : null;

    // Sélectionner le turbo-frame du projet
    const frame = doc.evaluate(
      `//turbo-frame[starts-with(@id, "project_")]`,
      doc,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;

    if (!frame) {
      console.warn(`❌ Turbo-frame non trouvé pour ${projectUrl}`);
      return project;
    }

    // Extraire le titre
    const titleElement = doc.evaluate(
      './/h1[contains(@class, "text-3xl") and contains(@class, "font-bold")]',
      frame,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    project.titre = titleElement ? titleElement.textContent.trim() : null;

    // Extraire le statut (Ouvert/Fermé)
    const statusElement = doc.evaluate(
      './/span[contains(text(), "Ouvert") or contains(text(), "Fermé")]',
      frame,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    project.statut = statusElement ? statusElement.textContent.trim() : null;

    // Extraire le budget (depuis les métadonnées en haut)
    const budgetElement = doc.evaluate(
      './/span[contains(@data-bs-original-title, "Budget indicatif")]',
      frame,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    project.budget = budgetElement ? budgetElement.textContent.trim() : null;

    // Extraire le nombre d'offres
    const offersElement = doc.evaluate(
      './/span[contains(text(), "offres") or contains(text(), "offre")]',
      frame,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    project.offres = offersElement ? offersElement.textContent.trim() : null;

    // Extraire le nombre de vues
    const viewsElement = doc.evaluate(
      './/span[contains(text(), "vues") or contains(text(), "vue")]',
      frame,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    project.vues = viewsElement ? viewsElement.textContent.trim() : null;

    // Extraire le nombre d'interactions
    const interactionsElement = doc.evaluate(
      './/span[contains(text(), "interactions") or contains(text(), "interaction")]',
      frame,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    project.interactions = interactionsElement
      ? interactionsElement.textContent.trim()
      : null;

    // Extraire la description
    const descriptionElement = doc.evaluate(
      './/div[contains(@class, "project-description")]//div[contains(@class, "content")]',
      frame,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    project.description = descriptionElement
      ? descriptionElement.textContent.trim()
      : null;

    // Extraire la date de publication
    const dateElement = doc.evaluate(
      './/span[@class="pt-1"][contains(text(), "Publication")]//span[@class="font-semibold"]',
      frame,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    project.date_publication = dateElement
      ? dateElement.textContent.trim()
      : null;

    // Extraire le budget détaillé
    const budgetDetailElement = doc.evaluate(
      './/span[@class="pt-1"][contains(text(), "Budget indicatif")]//span[@class="font-semibold"]',
      frame,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    project.budget_detaille = budgetDetailElement
      ? budgetDetailElement.textContent.trim()
      : null;

    // Extraire les profils recherchés
    const profilesElements = doc.evaluate(
      './/span[@class="pt-1"][contains(text(), "Profils recherchés")]//a[@class="font-semibold text-body-color"]',
      frame,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );

    const profiles = [];
    for (let j = 0; j < profilesElements.snapshotLength; j++) {
      const profileElement = profilesElements.snapshotItem(j);
      profiles.push({
        nom: profileElement.textContent.trim(),
        url: profileElement.getAttribute("href"),
      });
    }
    project.profils_recherches = profiles;

    // Extraire les compétences/technologies (si présentes)
    const skillsElements = doc.evaluate(
      './/span[contains(@class, "badge") or contains(@class, "tag")]',
      frame,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );

    const skills = [];
    for (let j = 0; j < skillsElements.snapshotLength; j++) {
      const skillElement = skillsElements.snapshotItem(j);
      const skillText = skillElement.textContent.trim();
      if (
        skillText &&
        !skillText.includes("€") &&
        !skillText.includes("offres") &&
        !skillText.includes("vues")
      ) {
        skills.push(skillText);
      }
    }
    project.competences = skills.length > 0 ? skills : null;

    // Extraire la localisation du client (si présente)
    const locationElement = doc.evaluate(
      './/span[contains(text(), "Localisation") or contains(@class, "location")]//span[@class="font-semibold"]',
      frame,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    project.localisation = locationElement
      ? locationElement.textContent.trim()
      : null;

    return project;
  } catch (error) {
    console.error(`❌ Erreur lors de l'extraction de ${projectUrl}:`, error);
    return project;
  }
}

// Fonction pour récupérer et analyser une URL (méthode 1: Fetch)
async function fetchAndExtractProject(projectUrl) {
  const fullUrl = BASE_URL + projectUrl;

  try {
    console.log(`🔍 Récupération de ${fullUrl}...`);

    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    return extractProjectFromDocument(doc, projectUrl);
  } catch (error) {
    console.error(`❌ Erreur pour ${projectUrl}:`, error.message);
    return {
      url: projectUrl,
      error: error.message,
      id: projectUrl.match(/\/projects\/(\d+)/)?.[1] || null,
    };
  }
}

// Fonction principale avec fetch (recommandée si CORS autorisé)
async function extractMultipleProjects(
  urls = PROJECT_URLS,
  baseUrl = BASE_URL
) {
  console.log(`🚀 Extraction de ${urls.length} projets depuis ${baseUrl}...`);

  const projects = [];
  const batchSize = 5; // Traiter par lots pour éviter de surcharger le serveur

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    console.log(
      `📦 Traitement du lot ${Math.floor(i / batchSize) + 1}/${Math.ceil(
        urls.length / batchSize
      )}...`
    );

    const batchPromises = batch.map((url) => fetchAndExtractProject(url));
    const batchResults = await Promise.allSettled(batchPromises);

    batchResults.forEach((result, index) => {
      if (result.status === "fulfilled") {
        projects.push(result.value);
      } else {
        console.error(`❌ Échec pour ${batch[index]}:`, result.reason);
        projects.push({
          url: batch[index],
          error: result.reason?.message || "Erreur inconnue",
          id: batch[index].match(/\/projects\/(\d+)/)?.[1] || null,
        });
      }
    });

    // Pause entre les lots pour éviter de surcharger le serveur
    if (i + batchSize < urls.length) {
      console.log("⏸️ Pause de 2 secondes...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  return projects;
}

// Méthode alternative: Navigation automatique (si fetch échoue à cause de CORS)
function createNavigationScript(urls = PROJECT_URLS, baseUrl = BASE_URL) {
  const script = `
// Script de navigation automatique - Copiez ceci dans une nouvelle console après navigation
let projectData = JSON.parse(localStorage.getItem('extractedProjects') || '[]');
const urlsToProcess = ${JSON.stringify(urls)};
const baseUrl = '${baseUrl}';
let currentIndex = parseInt(localStorage.getItem('currentProjectIndex') || '0');

function extractCurrentPageAndNavigateNext() {
    // Extraire les données de la page actuelle
    const currentProject = extractProjectFromDocument(document, window.location.pathname);
    projectData.push(currentProject);
    
    console.log(\`✅ Projet \${currentIndex + 1}/\${urlsToProcess.length} extrait: \${currentProject.titre || 'Sans titre'}\`);
    
    // Sauvegarder les données
    localStorage.setItem('extractedProjects', JSON.stringify(projectData));
    localStorage.setItem('currentProjectIndex', (currentIndex + 1).toString());
    
    // Naviguer vers la page suivante
    currentIndex++;
    if (currentIndex < urlsToProcess.length) {
        setTimeout(() => {
            window.location.href = baseUrl + urlsToProcess[currentIndex];
        }, 2000);
    } else {
        console.log('🎉 Extraction terminée !');
        console.log('📊 Données extraites:', projectData);
        localStorage.removeItem('currentProjectIndex');
        localStorage.removeItem('extractedProjects');
    }
}

// Commencer l'extraction
extractCurrentPageAndNavigateNext();
`;

  console.log("📋 Script de navigation automatique généré. Pour l'utiliser:");
  console.log("1. Naviguez manuellement vers la première URL");
  console.log("2. Collez ce script dans la console:");
  console.log(script);

  return script;
}

// Exécution
(async function () {
  console.log("🔧 Choix de méthode d'extraction:");
  console.log("1. Méthode Fetch (plus rapide, peut échouer si CORS bloqué)");
  console.log("2. Méthode Navigation (plus lente mais fiable)");

  try {
    // Tenter la méthode Fetch d'abord
    const projects = await extractMultipleProjects();

    const successfulProjects = projects.filter((p) => !p.error);
    const failedProjects = projects.filter((p) => p.error);

    console.log(`✅ ${successfulProjects.length} projets extraits avec succès`);
    if (failedProjects.length > 0) {
      console.warn(`⚠️ ${failedProjects.length} projets ont échoué`);
      console.table(
        failedProjects.map((p) => ({ url: p.url, error: p.error }))
      );
    }

    console.log("📊 Résultats JSON:");
    console.log(JSON.stringify(successfulProjects, null, 2));

    // Si trop d'échecs, proposer la méthode alternative
    if (failedProjects.length > successfulProjects.length) {
      console.log("❌ Trop d'erreurs CORS. Utilisez la méthode navigation:");
      createNavigationScript();
    }
  } catch (error) {
    console.error("❌ Erreur générale:", error);
    console.log("🔄 Utilisation de la méthode navigation:");
    createNavigationScript();
  }
})();
