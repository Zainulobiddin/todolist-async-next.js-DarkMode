import { configureStore } from "@reduxjs/toolkit"
import categoriesReducer from "./features/categories/categories-slice"

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
  },
})
