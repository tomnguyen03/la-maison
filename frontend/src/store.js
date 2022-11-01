import {
  configureStore,
  getDefaultMiddleware
} from '@reduxjs/toolkit'
import appReducer from 'src/app.slice'
import authReducer from 'src/page-components/Auth/auth.slice'

const rootReducer = {
  app: appReducer,
  auth: authReducer
}
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: [...getDefaultMiddleware({ serializableCheck: false })]
})
export default store
