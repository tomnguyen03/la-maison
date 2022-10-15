import { useSelector } from 'react-redux'

export function useAuthenticated() {
  return useSelector(state => state.auth.email.length)
}
