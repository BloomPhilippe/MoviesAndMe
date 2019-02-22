import React from 'react'
import {createStackNavigator, createAppContainer} from 'react-navigation'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'

const SearchStackNavigator = createStackNavigator(
    {
        Search: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
            screen: Search,
        },
        FilmDetail: {
            screen: FilmDetail,
        },
        Favorites: {
            screen: Favorites,
        },
    },
    {
        //headerMode: 'none',
        initialRouteName: 'Search',
    }
)

export default createAppContainer(SearchStackNavigator)