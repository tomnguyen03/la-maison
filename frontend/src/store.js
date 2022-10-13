import { configureStore } from '@reduxjs/toolkit'
import appReducer from 'src/app.slice'
import authReducer from 'src/page-components/Auth/auth.slice'

const rootReducer = {
  app: appReducer,
  auth: authReducer
}
const store = configureStore({
  reducer: rootReducer
})
export default store
