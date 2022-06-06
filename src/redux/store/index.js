/** @format */

import { configureStore } from "@reduxjs/toolkit"
import mainReducer from "../reducers"

const store = configureStore({
  reducer: mainReducer,
  // we're going to tell Redux which reducer function to use!
})

export default store
