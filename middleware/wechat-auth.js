export default function({ store, redirect, route }) {
  if (!store.state.autherUser) {
    const { fullPath } = route
    return redirect(`/wechat-redirect?visit=${fullPath.substr(1)}`)
  }
}
