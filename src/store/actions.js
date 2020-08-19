import axios from 'axios'

export default {
    lastUpdateAction({commit}) {
        return new Promise((resolve, reject) => {
            commit('lastupdateMut')
            axios.get(process.env.VUE_APP_COVID)
                .then(response => {
                    resolve(response.data);
                    commit('lastupdateMut', response.data);
                }).catch(err => {reject(err)})
        })
    },
    confirmedAction({commit},detail) {
        return new Promise((resolve, reject) => {
            commit('confirmedMut')
            axios.get(detail[0]+detail[1])
                .then(response => {
                    resolve(response.data);
                    commit('confirmedMut', response.data);
                }).catch(err => {reject(err)})
        })
    }
}
