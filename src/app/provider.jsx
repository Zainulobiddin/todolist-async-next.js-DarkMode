"use client"
import { store } from "@/store/store";
import { Provider } from "react-redux";

export default function Providers({children}) {
  return (
    <div>
      <Provider store={store}>
        {children}
      </Provider>
    </div>
  )
}
