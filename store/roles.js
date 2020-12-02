export const state = () => ({
    auth_roles: [],
});

export const getters = {
    GET_ROLES: state => state.auth_roles
}

export const mutations = {
    SET_ROLES(state, roles) {
        const userRoles = roles.data;
        userRoles.map(role => {
            if (!state.auth_roles.includes(role.data.attributes.name)) {
                state.auth_roles.push(role.data.attributes.name)
            }
        })
    }
}