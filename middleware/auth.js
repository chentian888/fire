export default function({ store, redirect, route }) {
  console.log(route)
  if (!store.state.user || !store.state.user.email) {
    return redirect('/login')
  }
}
