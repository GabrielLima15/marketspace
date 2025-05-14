import { ReactNode } from "react";
import { AuthContextProvider } from "./AuthContext";
import { ProductContextProvider } from "./ProductContext";

type Props = {
  children: ReactNode
}

export default function AppContext({children}: Props) {
  return (
    <AuthContextProvider>
      <ProductContextProvider>
        {children}
      </ProductContextProvider>
    </AuthContextProvider>
  )
}