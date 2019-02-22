import React, {Component} from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native'
import {Header, Icon} from 'react-native-elements'

class HeaderMenu extends React.Component {
    render() {
        const title = this.props.title
        const navigation = this.props.navigation
        return (
            <Header containerStyle={styles.Header}
                leftComponent={{ icon: 'home', type: 'font-awesome', color: '#fff', onPress: () => navigation.navigate('Search')}}
                centerComponent={{ text: title, style: { color: '#fff'}}}
                rightComponent={<Icon
                    name='heart'
                    type='font-awesome'
                    color='#fff'
                    onPress={() =>  this.props.navigation.navigate("Favorites")} />}
            />
        );
    }
}

const styles = StyleSheet.create({
    Header: {
        backgroundColor: Platform.OS === 'ios' ? '#0076ff' : '#7CB342',
    },
});

export default HeaderMenu;