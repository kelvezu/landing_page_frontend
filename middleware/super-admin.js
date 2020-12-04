export default function ({ store, $auth, redirect }) {

    if (!store.getters['roles/GET_ROLES'].includes('super-admin')) {
        return redirect('/');
    }
}   