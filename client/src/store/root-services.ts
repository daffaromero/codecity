import staff from '@/services/staffs'
import auth from '@/services/auth'

const rootServices = {
  reducers: {
    // staff
    [staff.reducerPath]: staff.reducer,
    [auth.reducerPath]: auth.reducer,
  },
  middlewares: [
    // staff
    staff.middleware,
    auth.middleware,
  ],
}

export default rootServices
