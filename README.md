# MoviesAndMe

Simple petit projet avec React Native

Utiliser [Expo](https://expo.io/learn) pour créer un app de base en React Native.

````angular2
npm install expo-cli --global
````

Expo permet de visualiser votre app directement sur votre smartphone ou sur un émulateur... 
Pour ce faire, vous devez installer Expo sur votre smartphone (via le store Google ou Apple). 

A chaque changement, il rafraichis l'app.

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

Pour gérer les states globalement (inter-component), on peut utiliser Redux.
Il est semblable à Vuex dans VueJS...
Il faut absolument utiliser de mutateur pour modifier le state dans reducer.

Installer redux :

````angularjs
npm install --save redux
npm install --save react-redux@5.0.7
npm install
````

:exclamation: Les version de react-redux supérieur à 5.* ne fonctionne pas avec React Native

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
 
