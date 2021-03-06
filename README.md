# MoviesAndMe

## Introduction

Petit projet avec React Native dont certains packages tels que Redux (avec persist), React Navigation, React Native Elements,...

Le but de base était d'appréhender ce nouveau framework JS mais je compte bien l'améliorer.

Pour m'aider à la base, j'ai suivi la formation en ligne d'[Openclassrooms](https://openclassrooms.com/fr/courses/4902061-developpez-une-application-mobile-react-native).

J'ai démarrer par un application simple (CRNA) qui n'utilise pas les composants natifs (caméra, géolocalisation, accéléromètre, galerie photo, accès aux contacts, ...).

Grâce à l'outils [Expo](https://expo.io/learn), on peut créer une application React Native facilement et il met à notre disposition ne nombreuses fonctionnalités : 

- Debuggage

- Visualisation de l'appication emulateur

- Visualisation de l'application directement sur votre smartphone ou votre tablette

- Rafraîchissement automatique (watcher)

- Et bien d'autre chose...


## Mise en place

Installer Expo en global :

````angular2
npm install expo-cli --global
````

Démarrer l'app :

````angular2
npm start
````

Démarrer l'app sur l'émulateur :

````angular2
npm run android
````

Après démarrage, scanner le QR code via l'application Expo sur le smartphone.

Pour faire apparaitre le menu d'Expo sur le smartphone en cas d'erreur afin de forcer le rafraichissement ou autre, secouer le smartphone !

## Un peu de théorie

React est composé principalement de components !

Un component est un élément graphique comme une view, un bouton, texte,...

React est divisé en morceaux (component) réutilisables et indépendants.

Liste de components de bases [ici](https://facebook.github.io/react-native/docs/components-and-apis.html#basic-components)

Liste de components plus stylés [ici](https://react-native-training.github.io/react-native-elements/)

Pour appliquer un style (CSS), utiliser l'api StyleSheet (importer la dans le component). Voir doc [ici](https://facebook.github.io/react-native/docs/style)

Lorsqu'on utilise flatList, n'oubliez pas d'utiliser keyExtractor afin d'identifier chaque élément de la liste de manière unique.

Dans un component, les props sont les propriétées définies pas le component parent et elle ne peuvent être modifiée via votre component (enfant)

Utiliser les states mais lorsqu'ils sont modifiés, cela recharge **tout** le component !

La méthode setState est asynchrone donc si vous souhaitez utiliser les state directement leur valeur ne sera pas changée. 
Il faut utiliser le deuxième paramètre de setState qui sera une fonction appelé lorsque setState à terminé.

Lors d'installation de package, si vous obtenez des message **warning**, n'hésitez pas à faire une simple ``npm install``

## Utilsation de Redux

Pour gérer les states globalement (inter-component), on peut utiliser Redux.

Il est semblable à Vuex dans VueJS...

Il faut absolument utiliser de mutateur pour modifier le state dans reducer car le state est immuable.

Installer redux :

````angularjs
npm install --save redux
npm install --save react-redux@5.0.7
npm install
````

:exclamation: Les version de react-redux supérieur à 5.* ne fonctionne pas avec React Native

## Redux persist

**Si vous souhaiter que les données gérées par redux persiste, utiliser :** 

``npm install --save redux-persist``

**Dans le configuration du store (là où vous utiliser combineReducers) :**

- Importer persistCombineReducers de redux persist

````
import { persistCombineReducers } from 'redux-persist'
````

- Importer le type de moyen de sauvegarde

import storage from 'redux-persist/lib/storage'

- Créer constance avec la clé de persistance et le type de sauvegarde

````
const rootPersistConfig = {
    key: 'root',
    storage: storage
}
````

- modifier la création du store

Changer combineReducers par persistCombineReducers

Cette méthode prend en permier paramètre votre clé et le deuxième paramètre est un objet avec les reducers.

````
export default createStore(persistCombineReducers(rootPersistConfig, {toggleFavorite, setAvatar}))
````

**Dans App.js :**

- Importer persistStore de redux persist

````
import { persistStore } from 'redux-persist'
````

- Utiliser cette méthode pour sauver la persistance de votre store dans une variable

````
let persistor = persistStore(Store)
````

- Importer PersistGate de redux persist

````
import { PersistGate } from 'redux-persist/es/integration/react'
````

- Utiliser PersistGate pour encapsuler notre navigation en lui passant notre persistant

````
export default class App extends React.Component {
    render() {
        let persistor = persistStore(Store)
        return (
            <Provider store={Store}>
                <PersistGate persistor={persistor}>
                    <Navigation />
                </PersistGate>
            </Provider>
        )
    }
}

````

## Rappel

L'utilisation de trois points avant un objet, copie ses propriétés

````angular2
var obj1 = { toto: 'truc', x: 42 };

var clone = { ...obj1 }; // Clone est égal à { toto: 'truc', x: 42 }
````

[source](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/Syntaxe_d%C3%A9composition)


## Data-binding

Pour binder (lier) une fonction à plusieurs component sans avoir de soucis de context (this).

Imaginons que vous passez une fonction d'un component parent à un component enfant...
Quand vous appelez votre fonction du parent, la fonction connait son context this. 
Donc si vous utilisez dans la fonction une propriété du contexte, ça fonctionne :+1: .

Si vous utiliser la même fonction dans votre component enfant, la fonction a comme context celui de l'enfant donc votre propriété n'existe pas...
Cela provoque une erreur !

**Solution 1**

Dans le constructor du parent, vous bindez this (context) à la fonction qui sera passée à l'enfant.

````
constructor(props) {
    super(props)
    
    this._maFonction = this._maFonction.bind(this)

}
````

**Solution 2**

Utiliser une fonction flèchée...
Celle-ci permet de préserver son context.


## Afficher des différence en fonction du Système d'exploitation (IOS ou Android)

Utiliser le package Platform de React Native.

Dans le component où vous souhaiter placer des comportements différents, importer platform :

````
import { Platform } from 'react-native'
````

**Exemple :**

Cette exemple peut s'appliquer sur n'import quoi :+1:

````
const styles = StyleSheet.create({
    Header: {
        backgroundColor: Platform.OS === 'ios' ? '#0076ff' : '#7CB342',
    },
});
````


## Animation

Utiliser le package Animated de React Native.

````
import { Animated } from 'react-native'
````

[Exemple de création](./Animations/BounceInRight.js)

[Exemple d'utilisation](./Components/FilmItem.js)


## Paser d'une CRNA vers une application React Native avec du code natif

Sur une CRNA (Create-React-Native-App), on ne peut utiliser les composants du device (smartphone ou tablette) tels que la caméra, géolocalisation, accéléromètre, galerie photo, accès aux contacts, etc...
 
1. Installer le CLI de React Native en global

    ````
    npm install -g react-native-cli
    ````

2. Ejecter notre application

    Il possible que vous deviez effectuer cette commande 2 fois pour obtenir un chois pertinent...
    
    ````
    expo eject
    ````
    
    :exclamation: Choisissez le premier choix (Regular React Native)
    
    Ensuite encode les réponses nom de l'application.

3. Créer un fichier index.js

    Avec une application React Native avec du code natif, le point d'entré n'est plus App.js mais index.js
    
    4. Lier 
    
    ````
    react-native link
    ````

5. Préparer (si ce n'est pas fait) un émulateur, Xcode pour IOS ou Android Studio pour Android

    Pour IOS, il faut absolument être sur un macOS
    

## Démarrer l'App en mode natif

Attention cela peut être très la première car ça install tous les packages nécessaires...

**Pour Android :**

````
react-native run-android
````

**Pour IOS :**

````
react-native run-ios
````

## Erreur de démarrage de l'app

Problème dû au résidu laisser par Expo

Ce qui a été très long !!

1. Créer un nouveau projet en dehors de celui-ci

    ````
    react-native init NomDeMonApp
    ````

2. Récupérer les dossiers et fichiers de la CRNA

    App.js / Animations / API / Components / Helpers / Images / Navigation / Store
    
3. Installer les packages

    ````
    npm install --save react-native-elements react-navigation react-native-gesture-handler moment numeral redux
    npm i --save react-native-vector-icons
    npm install --save react-redux@5.0.7
    npm install
    react-native link
    react-native link react-native-vector-icons
    ````

4. Démarrer

    ````
    adb kill-server
    adb start-server
    react-native run-android
    ````
    
[source](https://openclassrooms.com/fr/courses/4902061-developpez-une-application-mobile-react-native/4959616-formalisez-votre-application-pour-utiliser-les-composants-du-device)


## Erreur settings.gradle

````
* Where:
Settings file 'C:\wamp64\www\git\ReactNative\TestNative\android\settings.gradle' line: 3

* What went wrong:
Could not compile settings file 'C:\wamp64\www\git\ReactNative\TestNative\android\settings.gradle'.
> startup failed:
  settings file 'C:\wamp64\www\git\ReactNative\TestNative\android\settings.gradle': 3: unexpected char: '\' @ line 3, column 133.
     s\react-native-gesture-handler\android')
                                   ^

  1 error
````

Changer les backslash par des slash dans les fichier de mon projet :

- android/build.gradle
- android/gradlew.bat
- android/gradle.properties
- android/settings.gradle

## Erreur canOverrideExistingModule=true

Vérifier dans android/app/src/main/java/com/moviesandme/MainApplication.java

Il y a surement deux import pour un même package... Et un instanciation en double également.


## Ajouter un package natif

````
npm i --save nomPackage
react-native link nomPackage
````

## Si votre refraichissement auto ne se fait pas

Dans l'emulator taper 2x sur r

Ou ctrl+m et activer le live reload

## Debug

1. Via le debug de Chrome (Il faut avoir Chrome)

    Ouvrir le menu (ctrl+m) dans l'application.
    
    Cliquer sur Debug JS Remotely
    
    Une fenetre chrome apparait, aller dans l'inspecteur pour voir vos logs
    
    Dans certains cas il faut effectuer cette commande pour que cela fonctionne
    
    ``adb reverse tcp:8081 tcp:8081``
    
    Il est possible d'utilse certaines variables en console comme $r
    
    Mais il faut cliquer sur top et choisir debuggerWorker.js
    
    
    
2. Via le devTools

    ``npm install -g react-devtools``
    
    Utilisation : ``react-devtools``
    
    Ouvrir le menu (ctrl+m) dans l'application.
    
    Cliquer sur Toggle Inspector
    
    Maintenant, quand vous cliquez sur un élément de votre application, react-devtools affiche les détails...




## Préparation de l'application pour le Store Google ou Ios

**Android**

- Créer une clé pour le store

En remplacant my-key-alias et my-release-key par ce que vous voulez...

La commande keytool fonctionne car j'ai ajouter Java jdk à mon path


````
 keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
````

- Ajouter les informations de la clé dans android/gradle.properties

````
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=***
MYAPP_RELEASE_KEY_PASSWORD=***
````

- Ajouter le code ci-dessous dans le fichier android/app/build.gradle

````
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
````

- Générer un bundle afin de ne plus utiliser node serveur

````
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
````

- Nettoyer le dossier build

````
rm -rf android/app/src/main/res/drawable-xxxhdpi android/app/src/main/res/drawable-xxhdpi android/app/src/main/res/drawable-xhdpi android/app/src/main/res/drawable-mdpi android/app/src/main/res/drawable-hdpi
````

- Lancer la compilation

````
cd android && ./gradlew assembleRelease
````


## Test votre APK

- Desinstaller l'application sur l'emulateur

Remplacer moviesandme pas le nom de votre app

````
adb uninstall "com.moviesandme"
````

- Installer l'application via l'APK

````
adb install .\app\build\outputs\apk\release\app-release.apk
````