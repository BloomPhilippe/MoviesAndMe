const initialState = { avatar: require('../../assets/ic_tag_faces.png') }

/**
 * State doit rester immuable !
 * @param state
 * @param action
 * @returns {*}
 */
function setAvatar(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'ADD_AVATAR':
            return nextState = {
                ...state,
                avatar: action.value
            }
        default:
            return state
    }
}

export default setAvatar