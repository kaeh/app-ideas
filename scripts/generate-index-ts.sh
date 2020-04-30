#!/bin/bash

## Utilisation : ./generate-index-ts.sh -p(--path)="../path/to/folder" -e(--extension)="component.ts" [-d(--dry-run)]
## p correspond au path du dossier dans lequel on veux générer l'index.ts, en chemin relatif
## e correspond à l'extension des fichiers contenus dans ce dossier et ses sous dossiers, que l'on veux exporter (component.ts, service.ts, ...)
## d corresponde à un dry run, le fichier ne sera pas généré et tout sera sorti dans la console.

# Récupération des paramètres
for arg in "$@"
do
    case $arg in
        -p=*|--path=*)
        DIRECTORY=${arg#*=}
        shift # Remove --path= from processing
        ;;
        -e=*|--extension=*)
        EXTENSION="${arg#*=}"
        shift # Remove --extension= from processing
        ;;
        -d|--dry-run)
        DRY_RUN=0
        shift # Remove --dry-run name from processing
        ;;
        *)
        OTHER_ARGUMENTS+=("$1")
        shift # Remove generic argument from processing
        ;;
    esac
done

# Vérification des paramètres
[ -z "${DIRECTORY}" ] && echo "Le flag '-p' (directory) est obligatoire" && exit 1
[ -z "${EXTENSION}" ] && echo "Le flag '-e' (extension) est obligatoire" && exit 1

# Vérification de l'existence d'un fichier index.ts à cet emplacement
CURRENT_INDEX_FILE=${DIRECTORY}/index.ts
BACKUP_INDEX_FILE=${CURRENT_INDEX_FILE}.bkp

if [[ ${DRY_RUN} -eq 0 ]]; then
    echo "Simulation de création du nouveau fichier index.ts"
else
    [ -f ${CURRENT_INDEX_FILE} ] && echo "Backup du fichier index.ts existant" && mv ${CURRENT_INDEX_FILE} ${BACKUP_INDEX_FILE}
    echo "Création du nouveau fichier index.ts"
    touch ${CURRENT_INDEX_FILE}
fi

# Lecture des fichiers correspondant à l'extension, dans les sous dossiers du dossier données dans le path
find ${DIRECTORY} -name "*.${EXTENSION}" | while read -r LINE ; do
    # On enlève le chemin du fichier final
    FILE=${LINE//"$DIRECTORY/"/}
    # On enlève l'extension .ts
    FILE=${FILE//".ts"}
    # On génère la ligne d'export
    GENERATED_LINE="export * from \"./$FILE\";"
    # En cas de dry run, on l'affiche dans la console, sinon on l'ajoute au fichier index.ts en cours de création
    if [[ ${DRY_RUN} -eq 0 ]]; then
        echo ${GENERATED_LINE}
    else
        echo ${GENERATED_LINE} >> ${CURRENT_INDEX_FILE}
    fi
done

if [[ ! ${DRY_RUN} -eq 0 ]]; then
    # Vérification que le fichier généré contient quelque chose, si non on le supprime
    [ ! -s ${CURRENT_INDEX_FILE} ] && echo "Fichier généré vide : suppression" && rm ${CURRENT_INDEX_FILE}

    # Vérification de l'existence d'un fichier backup, si oui on le supprime
    [ -f ${BACKUP_INDEX_FILE} ] && echo "Suppression du backup" && rm ${BACKUP_INDEX_FILE}
fi
