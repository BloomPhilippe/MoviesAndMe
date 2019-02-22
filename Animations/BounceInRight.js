import React from 'react'
import { Animated, Dimensions } from 'react-native'

/**
 * Animation qui commence de droite vers le milieu
 */
class BounceInRight extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            positionLeft: new Animated.Value(Dimensions.get('window').width)
        }
    }

    componentDidMount() {
        Animated.spring(
            this.state.positionLeft,
            {
                toValue: 0
            }
        ).start()
    }

    /**
     * this.props.children permet d'afficher les component enfant (à l'intérieur)
     * @returns {*}
     */
    render() {
        return (
            <Animated.View
                style={{ left: this.state.positionLeft }}>
                {this.props.children}
            </Animated.View>
        )
    }
}

export default BounceInRight