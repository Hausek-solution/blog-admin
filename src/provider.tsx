import { ReactNode } from "react"
import { Toaster } from "./components/ui/toaster"
import MiddlewareProvider from "./middleware"


const Provider = ({ children }: {children: ReactNode}) => {

    return (
        <>
            <MiddlewareProvider>
                {children}
            </MiddlewareProvider>
            <Toaster/>
        </>
    )
}

export default Provider