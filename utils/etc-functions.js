import debounce from 'lodash/debounce';

/***
 * @param Store getter
 * @param Store setter
 * @param Timer 1000
 * @returns Object
 */
export const getSet = function (getter, setter, timer = .500) {
    return {
        get() {
            return this.$store.getters[getter]
        },
        set: debounce(function (value) {
            this.$store.commit(setter, value)
        }, timer),
    }
}

// export const fetchData = async function (apiLink) {
//     try {
//         return response = await this.$axios.$get(apiLink)
//     } catch (err) {
//         return err
//     }
// }