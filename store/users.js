export const state = () => ({
    form: {
        firstname: null,
        lastname: null,
        email: null,
        password: null,
        confirm_password: null,
    },
})

export const getters = {
    GET_FIRSTNAME: state => state.form.firstname,
    GET_LASTNAME: state => state.form.lastname,
    GET_EMAIL: state => state.form.email,
    GET_PASSWORD: state => state.form.password,
    GET_CONFIRM_PASSWORD: state => state.form.confirm_password,
}

export const actions = {
    async addUsers({ state }) {
        return new Promise((resolve, reject) => {
            try {
                const response = this.$axios.$post('/v1/users/register', state.form);
                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    },
}

export const mutations = {
    SET_FIRSTNAME(state, value) {
        state.form.firstname = value
    },

    SET_LASTNAME(state, value) {
        state.form.lastname = value
    },

    SET_EMAIL(state, value) {
        state.form.email = value
    },

    SET_PASSWORD(state, value) {
        state.form.password = value
    },

    SET_CONFIRM_PASSWORD(state, value) {
        state.form.confirm_password = value
    },
}