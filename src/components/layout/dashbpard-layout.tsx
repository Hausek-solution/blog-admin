import { ReactNode } from "react"
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar"
import AppSidebar from "./app-sidebar"

const DashboardLayout = ({children}: {children: ReactNode}) => {

    
    return (
        <>
            <main className="font-outfit overflow-x-hidden">
                <SidebarProvider>
                    <AppSidebar />
                    
                    <main className="w-full">
                        <SidebarTrigger />
                        {children}
                    </main>
                </SidebarProvider>
            </main>
        </>
    )
}

export default DashboardLayout