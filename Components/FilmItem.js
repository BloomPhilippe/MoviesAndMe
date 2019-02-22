import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import {Button, Card, Icon} from 'react-native-elements'
import {getImage} from '../API/TheMoviesDataBase'
import BounceInRight from '../Animations/BounceInRight'
import { connect } from 'react-redux'

class FilmItem extends Component {

    _toggleFavorites(){
        const action = {
            type: "TOGGLE_FAVORITE",
            value: this.props.film
        }
        this.props.dispatch(action)
    }

    _displayIcon() {
        let icon ='heart-o'

        if (this.props.favoritesFilm.findIndex(item => item.id === this.props.film.id) !== -1) {
            icon ='heart'
        }

        return <Icon
            raised
            name={icon}
            type='font-awesome'
            color='#f50'
            onPress={() => this._toggleFavorites()} />
    }

    render() {
        const displayDetail = this.props.displayDetail
        return (
            <BounceInRight>
                <TouchableOpacity>
                    <Card style={styles.Card}
                          title={this.props.film.title}
                          image={{uri: getImage(this.props.film.poster_path)}}
                    >
                        {this._displayIcon()}
                        <Text style={{marginBottom: 10}} numberOfLines={2}>
                            {this.props.film.overview}
                        </Text>
                        <Button
                            backgroundColor='#03A9F4'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title='Voir'
                            onPress={() => displayDetail(this.props.film.id)}
                        />
                    </Card>
                </TouchableOpacity>
            </BounceInRight>
        );
    }
}

const styles = StyleSheet.create({
    Card: {
        flex: 1,
        marginBottom: 15,
    }
});

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(FilmItem)