import React from 'react'
import {View, StyleSheet, ActivityIndicator,} from 'react-native'
import { Button, Input, Icon } from 'react-native-elements'
import FilmList from './FilmList'
import {getFilms} from '../API/TheMoviesDataBase'
import HeaderMenu from '../Components/HeaderMenu'

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.page = 0
        this.totalPages = 0
        this.searchText = ""
        this.state = {
            films: [] ,
            isLoading: false ,
        }

        this._loadFilms = this._loadFilms.bind(this)
    }

    static navigationOptions = ({navigation}) => ({
        header: (
            <HeaderMenu title='Recherche' navigation={navigation} />
        )
    })

    _loading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }

    _loadFilms() {
        this.setState({ isLoading: true })
        if(this.searchText.length > 0) {
            getFilms(this.searchText, this.page+1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({
                    films: this.state.films.concat(data.results),
                    isLoading: false ,
                })
            })
        }
    }

    _searchFilms(){
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: [],
        }, () => {
            this._loadFilms()
        })


    }


    _displayDetailForFilm = (idFilm) => {
        this.props.navigation.navigate("FilmDetail", {
            id: idFilm
        })
    }


    render() {
        return (
            <View style={styles.View}>
                <View style={styles.ViewChild}>
                    <Input
                        style={styles.TextInput}
                        placeholder="Titre du film"
                        leftIcon={
                            <Icon
                                name='search'
                                size={24}
                                color='rgba(0,0,0,0.5)'
                            />
                        }
                        onChangeText={(text) => {this.searchText = text}}
                        onSubmitEditing={() => this._searchFilms()}

                    />
                </View>
                <View style={styles.ViewChild}>
                    <Button buttonStyle={styles.Button} title="Recherche" onPress={() => this._searchFilms()}/>
                </View>
                <FilmList
                    films={this.state.films}
                    navigation={this.props.navigation}
                    loadFilms={this._loadFilms}
                    page={this.page}
                    totalPages={this.totalPages}
                    withInfiniScroll={true}
                />
                {this._loading()}
            </View>

        );
    }
}

const styles = StyleSheet.create({
    View: {
        paddingHorizontal: 0,
        paddingVertical: 30,
    },
    ViewChild: {
        marginBottom: 10,
        paddingHorizontal: 30,
    },
    TextInput: {
    },
    Button: {
    },
    FlatList: {
        flexDirection: 'column',
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 200,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default Search
