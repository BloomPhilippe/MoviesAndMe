import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Image,
    Share,
    Platform,
    TouchableOpacity
} from 'react-native'
import { Icon, Tile  } from 'react-native-elements'
import { getFilm, getImage } from '../API/TheMoviesDataBase'
import moment from 'moment'
import HeaderMenu from '../Components/HeaderMenu'
import { connect } from 'react-redux'


class FilmDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            film: undefined,
            isLoading: true,
        }
    }

    static navigationOptions = ({navigation}) => ({
        header: (
            <HeaderMenu title='Détails' navigation={navigation} />
        )
    })

    componentDidMount() {
        getFilm(this.props.navigation.state.params.id).then(data => {
            this.setState({
                film: data,
                isLoading: false,
            })
        })
    }

    _loading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }

    _displayIcon() {
       let icon ='heart-o'

           if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
               icon ='heart'
           }

           return <Icon
               raised
               name={icon}
               type='font-awesome'
               color='#f50'
               onPress={() => this._toggleFavorites()} />
    }

    _displayFilm() {
        const { film } = this.state
        if (film != undefined) {
            return (
                <ScrollView>
                    <View style={styles.container}>
                        <Tile
                            imageSrc={{uri: getImage(film.backdrop_path)}}
                            title={film.title}
                        >
                        </Tile>
                        {this._displayIcon()}
                        <View>
                            <Text style={styles.description_text}>{film.overview}</Text>
                            <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                            <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
                            <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
                            <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
                                return genre.name;
                            }).join(" / ")}
                            </Text>
                            <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function(company){
                                return company.name;
                            }).join(" / ")}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            )
        }
    }

    _toggleFavorites(){
        const action = {
            type: "TOGGLE_FAVORITE",
            value: this.state.film
        }
        this.props.dispatch(action)
    }

    _share(){
        const { film } = this.state
        Share.share({ title: film.title, message: film.overview })
    }

    _displayShare(){
        const { film } = this.state
        if( film != undefined ) {
            return (
                <TouchableOpacity
                    style={styles.share}
                    onPress={() => this._share()}>
                    <Icon
                        reverse
                        name='paper-plane'
                        type='font-awesome'
                        color='#e91e63'
                        onPress={() => this._share()} />
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._displayFilm()}
                {this._loading()}
                {this._displayShare()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 20,
    },
    image: {
        height: 169,
        margin: 0
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
    },
    default_text: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },
    share: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    share_icon: {
        backgroundColor: '#e91e63',
    },
})


const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(FilmDetail)