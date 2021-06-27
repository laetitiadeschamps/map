# Installation de ce projet

1. Exécuter `composer install`
2. Modifier les droits du dossier `storage`
```bash
sudo chgrp -R www-data storage
sudo chmod -R g+w storage
```
3. Créer le fichier de configuration
```bash
cp .env.example .env
```
4. Compléter le fichier de configuration
