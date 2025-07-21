# WashConnectPro — Plateforme SaaS 3-en-1 qui connecte tous les acteurs de l'écosystème 

## Présentation

**WashConnectPro** est une plateforme SaaS innovante dédiée à la réservation intelligente de services de lavage automobile. qui permet aux clients de réserver facilement un service, aux prestataires de gérer leurs disponibilités et à des fournisseurs de proposer des produits de lavage. Notre solution sur-mesure vous offre une expérience simple, flexible et efficace pour entretenir votre véhicule.

---

## Fonctionnalités

### Pour les Clients
- Réservation facile de prestations de lavage (intérieur, extérieur, lustrage, etc.)
- Visualisation des centres partenaires avec géolocalisation
- Gestion du profil, historique des réservations et facturation en ligne
- Achat direct de produits de lavage premium via la marketplace

### Pour les Prestataires de Lavage (Providers)
- Création et gestion de services de lavage proposés
- Gestion des disponibilités horaires et des réservations en temps réel
- Suivi des statistiques de performance et revenus
- Gestion des commandes de produits

### Pour les Fournisseurs de Produits
- Mise en avant et vente de produits de lavage
- Gestion du catalogue, des stocks et des commandes
- Distribution possible via les centres partenaires

### Pour l’Administrateur
- Supervision globale de la plateforme
- Gestion des utilisateurs, prestataires, produits et transactions
- Analytics et reporting détaillés
- Contrôle de la sécurité

---

## Technologies Utilisées

- **MongoDB** : Base de données NoSQL flexible et scalable  
- **Express.js** : Framework backend pour API REST sécurisées  
- **React** : Interface utilisateur dynamique et responsive  
- **Node.js** : Serveur backend performant

---

## Structure de la Plateforme

### Page d’Accueil (Home)
- Section Hero avec présentation
- Boutons principaux : "Se connecter" et "Réserver un service"
- Sections pour découvrir les services et les produits disponibles

### Sélection du Profil (`/choose-profile`)
Interface avec 3 profils à choisir :  
1. **Client**  
   - Réserver des services et consulter l’historique  
   - Boutons : "S’inscrire comme Client" / "Se connecter"  
2. **Provider de Lavage**  
   - Proposer des services, gérer réservations  
   - Boutons : "S’inscrire comme Provider" / "Se connecter"  
3. **Fournisseur de Produit**  
   - Vendre et gérer des produits de lavage  
   - Boutons : "S’inscrire comme Fournisseur" / "Se connecter"  

### Pages d’Inscription
- `/register/client` : formulaire spécifique aux clients  
- `/register/providerLavage` : formulaire métier pour providers  
- `/register/providerProduct` : formulaire fournisseurs de produits  

### Authentification
- Page `/login` avec email + mot de passe  
- Redirection vers dashboard selon rôle (client, provider lavage, fournisseur produit)  
- Navigation sécurisée et adaptée

### Dashboards
- **Client** : réservations, recherche, historique, profil  
- **Provider de lavage** : gestion services, réservations, calendrier, statistiques  
- **Fournisseur de produit** : gestion catalogue, commandes, stocks, statistiques

---

## Fonctionnalités Avancées

### Réservation sans interruption
- Exploration des services sans connexion préalable  
- Invitation à se connecter/créer un compte à la réservation  
- Conservation des données saisies pour une expérience fluide  

### Paiement Anticipé (via Stripe ou autre)
1. Choix du service et créneau  
2. Paiement immédiat  
3. Réservation créée avec statut "en attente" et paiement "payé"  
4. Validation par le provider → créneau bloqué  
5. Paiement final vers le provider après réalisation  
6. Gestion des absences clients selon politique d’annulation  

---

## Modèle Relationnel (Principales Relations)

| Relation                        | Cardinalité                 | Relation inverse             |
|--------------------------------|----------------------------|-----------------------------|
| Utilisateur → Client/Provider/Fournisseur | 1 → 1                  | Chaque rôle → 1 Utilisateur  |
| Client → Réservation            | 1 → 0..*                   | Réservation → 1 Client       |
| Client → Paiement               | 1 → 0..*                   | Paiement → 1 Client          |
| Client → CommandeProduit        | 1 → 0..*                   | CommandeProduit → 1 Client   |
| ProviderLavage → Service        | 1 → 0..*                   | Service → 1 ProviderLavage   |
| ProviderLavage → Disponibilité  | 1 → 0..*                   | Disponibilité → 1 ProviderLavage |
| ProviderLavage → Réservation    | 1 → 0..*                   | Réservation → 1 ProviderLavage|
| FournisseurProduit → Produit    | 1 → 0..*                   | Produit → 1 FournisseurProduit |
| FournisseurProduit → CommandeProduit | 1 → 0..*              | CommandeProduit → 1 FournisseurProduit |
| Réservation → Client / Service / Paiement | 1 → 1 / 1 / 1       | Client/Service/Paiement → 0..* Réservation |
| CommandeProduit → Produit       | 1 → 1                      | Produit → 0..* CommandeProduit |
| CommandeProduit → Utilisateur   | 1 → 1                      | Utilisateur → 0..* CommandeProduit |
| Utilisateur → Dashboard         | 1 → 1                      | Dashboard → 1 Utilisateur    |

---

---

---

## Contributors

Ce projet a été réalisé en binôme par :

- **Maryam Es-sanhaji** — [@Maryamessanhaji](https://github.com/Maryamessanhaji)  
- **Abdelaali Azergui** — [@azeabd01](https://github.com/azeabd01)

Merci à Maryam et à moi-même pour cette collaboration !

---

