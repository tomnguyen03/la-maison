import {
  configureStore,
  getDefaultMiddleware
} from '@reduxjs/toolkit'
import appReducer from 'src/app.slice'

const rootReducer = {
  app: appReducer,
}
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: [...getDefaultMiddleware({ serializableCheck: false })]
})
export default store
