export const state = () => ({
    textMessage: null,
    displayType: 'hidden',
    colorBar: null,
    show: false,
});

export const getters = {
    GET_TEXT_MESSAGE: state => state.textMessage,
    GET_DISPLAY_TYPE: state => state.displayType,
    GET_COLOR_BAR: state => state.colorBar,
    GET_SHOW: state => state.show,
}

export const mutations = {
    SET_TEXT_MESSAGE(state, message) {
        state.textMessage = message
    },

    SET_DISPLAY_TYPE(state, value) {
        state.displayType = value
    },

    SET_COLOR_BAR(state, color) {
        state.colorBar = color
    },

    SET_SHOW(state, val) {
        state.show = val
    },

    SET_SNACKBAR_ATTR(state, { textMessage, show = true, colorBar }) {
        state.textMessage = textMessage;
        state.show = show;
        state.colorBar = colorBar;
    },

    SET_CLEAR_SNACKBAR_ATTR(state, val = null) {
        state.textMessage = val;
        state.show = false;
        state.colorBar = val;
    }
}