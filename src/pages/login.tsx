import LogoDark from "../components/icons/logo-dark"
import { Button } from "../components/ui/button"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import LoadingSpinner from "../components/loader"
import { FormControl,Form, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Input } from "../components/ui/input"
import { cn } from "../lib/utils"
import { ApplicationRoutes } from "../routes/routes-constant"

const HomePage = () => {
    const [redirectStatus, setRedirectStatus] = useState(false);

    const formSchema = z.object({
        email: z.string()
            .min(2, {
                message: "Email must be at least 2 characters.",}
            )
            .email({message: "Please enter a valid email address"}),
        password : z.string()
            .min(8, 
                {message: "Password must have a minimum of 8 characters"})
    }, {})

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setRedirectStatus(true)
    }
    const [formLoading, setFormLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        email: "",
        },
    })

    useEffect(() => {
        if (redirectStatus) {
          window.location.replace(ApplicationRoutes.DASHBOARD);
        }
    }, [redirectStatus]);

    
    
    return (
        <>
               <main className="font-neue">
                <div className="min-h-screen w-full flex justify-center items-center">
                    <div className={cn("max-w-xl md:border md:border-gray-300 md:rounded-lg p-6 w-full py-9")}>
                        <div className="text-center text-[#475367] flex flex-col items-center gap-y-5">
                            <LogoDark classname=""/>
                        </div>
                        
                        <p className="text-[#475367] mt-4 text-center font-jaka text-sm">
                            Sign in to Continue
                        </p>
                    
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-12">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-neue text-base text-slate-600">Email</FormLabel>

                                            <FormControl>
                                                <Input className="py-8 font-neue" placeholder="eg. user@gmail.com" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base text-slate-600 font-neue">Password</FormLabel>

                                            <FormControl>
                                                <Input type="password" className="py-8 font-neue focus:outline-none focus:ring-0" placeholder="----------------" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button disabled={formLoading}  className="text-white font-medium text-base px-5 py-6 mt-2 w-full" type="submit">
                                    { formLoading ? 
                                        <span className="">
                                            <LoadingSpinner color="#FFFFFF" className={{scale : "50%"}} loading={formLoading}/>
                                        </span> :
                                        <p className="">Login</p>
                                    }
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </main>
        </>
    )
}


export default HomePage