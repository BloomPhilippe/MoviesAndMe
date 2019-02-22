import React from 'react'
import {View, StyleSheet, FlatList} from 'react-native'
import FilmItem from './FilmItem'

class FilmList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            films: []
        }
    }

    _displayDetailForFilm = (idFilm) => {
        this.props.navigation.navigate("FilmDetail", {
            id: idFilm
        })
    }

    render() {
        return (
            <View style={styles.View}>
                <FlatList
                    data={this.props.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item} displayDetail={this._displayDetailForFilm} />}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if(this.props.withInfiniScroll){
                            if (this.props.page < this.props.totalPages) {
                                this.props.loadFilms()
                            }
                        }
                    }}
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
    ViewChild: {
        marginBottom: 10,
        paddingHorizontal: 30,
    },
    FlatList: {
        flexDirection: 'column',
    },
});


export default FilmList
