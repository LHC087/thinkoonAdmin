export default {
  set_token(state, token) {
    state.token = token
    sessionStorage.token = token
  },
  del_token(state) {
    state.token = ''
    sessionStorage.removeItem('token')
  },
  set_cachedViews(state, cachedViews) {
    state.cachedViews = cachedViews
    sessionStorage.cachedViews = cachedViews
  },
  del_cachedViews(state) {
    state.cachedViews = ''
    sessionStorage.removeItem('cachedViews')
  }
}
