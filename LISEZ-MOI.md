# Poké Gacha TCG — version application (PWA)

Ce dossier est le jeu prêt à être **installé comme une vraie appli** : icône sur l'écran d'accueil,
plein écran sans barre du navigateur, démarrage sans réseau.

## 0. À faire AVANT de changer d'adresse (important)
Ta progression est stockée dans le navigateur, **liée à l'adresse de la page**. Si tu passes du fichier
`.html` ouvert localement à une adresse hébergée, tu repars de zéro.
→ Dans l'ancienne version : **Options → Sauvegarde → Exporter (fichier)**.
→ Dans la nouvelle : **Options → Sauvegarde → Importer un fichier**.

## 1. Héberger le dossier (nécessaire, en HTTPS)
Un navigateur n'installe une appli que depuis une adresse HTTPS. Le gyroscope en a aussi besoin.
Choisis un hébergeur statique gratuit, par exemple :
- **Netlify Drop** : glisse le dossier `poke-gacha-app` sur la page, tu obtiens une adresse en https://…
- **GitHub Pages** : crée un dépôt, envoie le contenu du dossier à la racine, active Pages.
- **Cloudflare Pages**, **Vercel** : même principe (envoyer le dossier tel quel).
(Les conditions d'inscription changent : vérifie sur leur site.)
Le contenu du dossier doit être à la **racine** du site : `index.html`, `manifest.webmanifest`, `sw.js`, `icons/`.

## 2. Installer sur le téléphone
- **Android (Chrome)** : ouvre l'adresse, puis **Options → Installer sur l'écran d'accueil**,
  ou le menu ⋮ → « Installer l'application ».
- **iPhone / iPad (Safari)** : bouton Partager → **Sur l'écran d'accueil**.
  (Sur iPhone, le gyroscope demande une autorisation : accepte-la au premier booster.)

## 3. Mettre à jour le jeu
Remplace `index.html` sur l'hébergeur. L'appli affiche d'abord sa version enregistrée puis récupère la nouvelle :
la mise à jour est visible au lancement suivant. Pour forcer chez tout le monde, change `V='pokegacha-v1'`
en `v2`, `v3`… dans `sw.js`.

## 4. Un vrai fichier APK (facultatif)
Une fois le site hébergé en HTTPS, le service **PWABuilder** (pwabuilder.com) peut créer un paquet Android
à partir de l'adresse (il propose un APK à installer à la main, ou un paquet pour le Play Store).
Cet APK ouvre simplement ton site dans une coque Android : il ne change rien au fonctionnement.
Tu peux aussi utiliser l'outil en ligne de commande Bubblewrap. Le Play Store demande un compte développeur.

## Ce qui marche sans réseau
- L'appli elle-même (écrans, icônes).
- Les extensions déjà ouvertes ou téléchargées (Options → Données hors-ligne).
- Pas les images des cartes (elles se rechargent depuis le web) ni les boosters réels.
