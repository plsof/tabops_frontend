import { login, getInfo } from '@/api/user'
import { getName, setName, setToken, removeName, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  username: getName(),
  token: '',
  // name: '',
  avatar: '',
  // introduction: '',
  roles: []
}

const mutations = {
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // SET_INTRODUCTION: (state, introduction) => {
  //   state.introduction = introduction
  // },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        // const { data } = response
        const info = { 'username': username, 'token': response.access }
        commit('SET_USERNAME', username)
        commit('SET_TOKEN', response.access)
        setName(info.username)
        setToken(info)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // getInfo(state.token).then(response => {
      getInfo(state.username).then(response => {
        // const { data } = response
        const data = response.data[0]
        // console.log(data)

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        var roles = ''
        if (data['is_superuser']) {
          roles = ['admin']
        } else {
          roles = ['editor']
        }
        data['roles'] = roles
        // var name = 'Super Admin'
        var avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
        // var introduction = 'I am a super administrator'

        // const { roles, name, avatar, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_USERNAME', data.username)
        commit('SET_ROLES', roles)
        // commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        // commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeName()
      removeToken(state.username)
      commit('SET_USERNAME', '')
      resetRouter()
      resolve()
    })
  },

  // remove token
  resetToken({ commit, state }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeName()
      removeToken(state.username)
      commit('SET_USERNAME', '')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
