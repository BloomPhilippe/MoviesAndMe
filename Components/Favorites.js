import React from 'react'
import {View, StyleSheet, FlatList} from 'react-native'
import HeaderMenu from '../Components/HeaderMenu'
import { connect } from 'react-redux'
import FilmList from './FilmList'
import Avatar from './Avatar'

class Favorites extends React.Component {
    constructor(props) {
        super(props)
    }

    static navigationOptions = ({navigation}) => ({
        header: (
            <HeaderMenu title='Favoris' navigation={navigation} />
        )
    })


    _displayDetailForFilm = (idFilm) => {
        this.props.navigation.navigate("FilmDetail", {
            id: idFilm
        })
    }

    render() {
        return (
            <View style={styles.View}>
                <View style={styles.ViewAvatar}>
                    <Avatar/>
                </View>
                <FilmList
                    films={this.props.favoritesFilm}
                    navigation={this.props.navigation}
                    loadFilms={this._loadFilms}
                    page={1}
                    totalPages={1}
                    withInfiniScroll={false}
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    View: {
        paddingHorizontal: 0,
        paddingVertical: 30,
    },
    ViewAvatar: {
        alignItems: 'center'
    },
    ViewChild: {
        marginBottom: 10,
        paddingHorizontal: 30,
    },
    FlatList: {
        flexDirection: 'column',
    },
});

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm
    }
}

export default connect(mapStateToProps)(Favorites)
