export const state = () => ({
    form: {
        firstname: null,
        lastname: null,
        email: null,
        password: null,
        confirm_password: null,
    },
    usersData: [],
    metaData: {
        current_page: null,
        from: null,
        last_page: null,
        links: null,
        path: null,
        per_page: null,
        to: null,
        total: null, // total of users
    },
    loading: false,
})

export const getters = {
    GET_FIRSTNAME: state => state.form.firstname,
    GET_LASTNAME: state => state.form.lastname,
    GET_EMAIL: state => state.form.email,
    GET_PASSWORD: state => state.form.password,
    GET_CONFIRM_PASSWORD: state => state.form.confirm_password,
    GET_USERS_DATA: state => state.usersData,
    GET_META_CURRENT_PAGE: state => state.metaData.current_page,
    GET_META_TO: state => state.metaData.to,
    GET_META_LAST_PAGE: state => state.metaData.last_page,
    GET_META_TOTAL: state => state.metaData.total,
    GET_LOADING: state => state.loading,

}

export const actions = {
    addUsers({ state }) {
        return new Promise((resolve, reject) => {
            try {
                const response = this.$axios.$post('/v1/users/register', state.form);
                resolve(response);
            } catch (error) {
                reject(error)
            }
        })
    },

    async fetchUsers({ commit }, { page = 1, itemsPerPage = 10 }) {
        commit('SET_LOADING', true);
        try {
            const response = await this.$axios.$get('/v1/users', {
                params: {
                    page: page,
                    per_page: itemsPerPage
                }
            });
            commit('SET_USERS_DATA', response.data);
            commit('SET_META_DATA', response.meta);
        } catch (err) {
            console.error(`Failed to fetch users. ERROR: ${err}`)
        } finally {
            commit('SET_LOADING')
        }
    },

    async searchUsers({ commit }, searchKeyword) {
        commit('SET_LOADING', true);
        try {
            const response = await this.$axios.$get('/v1/users', {
                params: {
                    search: searchKeyword
                }
            })
            commit('SET_USERS_DATA', response.data);
            commit('SET_META_DATA', response.meta);
        } catch (error) {
            console.error(`Failed to search the user. ERROR: ${error}`)
        } finally {
            commit('SET_LOADING')
        }
    }
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

    SET_USERS_DATA(state, value) {
        state.usersData = value
    },

    SET_META_DATA(state, meta) {
        state.metaData.current_page = meta.current_page;
        state.metaData.from = meta.from;
        state.metaData.last_page = meta.last_page;
        state.metaData.links = meta.links;
        state.metaData.path = meta.path;
        state.metaData.per_page = meta.per_page;
        state.metaData.to = meta.to;
        state.metaData.total = meta.total;
    },

    SET_CLEAR_META_DATA(state) {
        state.metaData.current_page = null;
        state.metaData.from = null;
        state.metaData.last_page = null;
        state.metaData.links = null;
        state.metaData.path = null;
        state.metaData.per_page = null;
        state.metaData.to = null;
        state.metaData.total = null;
    },

    SET_META_CURRENT_PAGE(state, val) {
        state.metaData.current_page = val
    },

    SET_META_LAST_PAGE(state, val) {
        state.metaData.last_page = val
    },

    SET_LOADING(state, val = false) {
        state.loading = val
    }
}