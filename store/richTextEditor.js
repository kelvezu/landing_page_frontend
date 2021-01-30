export const state = () => ({
    content: null
})

export const getters = {
    GET_CONTENT: state => state.content
}

export const actions = {}

export const mutations = {
    SET_CONTENT(state, payload = null) {
        state.content = payload
    }
}