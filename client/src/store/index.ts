import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
//import { setupListeners } from '@reduxjs/toolkit/query'
import { createWrapper } from 'next-redux-wrapper'

import { isProduction } from '@/config/env'

import rootReducers from './root-reducers'
import rootServices from './root-services'

export const makeStore = () =>
  configureStore({
    reducer: {
      ...rootReducers,
      ...rootServices.reducers,
    },
    devTools: !isProduction,
    middleware: (middlewares) => middlewares().concat(rootServices.middlewares),
  })

const store = makeStore()

//setupListeners(store.dispatch)

export type Store = typeof store
export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch
export type Thunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const wrapper = createWrapper<Store>(makeStore)
