// const FeaturedArticle = () => {
//     return (
//         <>
        
//         </>
//     )
// }

// export default FeaturedArticle

import { LucideCalendarSearch, LucideGrid, LucideLayoutGrid, LucideList } from "lucide-react"
import { useCallback, useState } from "react"
import { ArticleResponseType, RecentArticles } from "../../types/article-type"
import ArticleCard from "../../components/articles/article-card"
import { cn } from "../../lib/utils"
import CustomPagination from "../../components/articles/custom-pagination"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "../../components/ui/popover"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../components/ui/dialog"
  import { useRef } from "react"
import { Button } from "../../components/ui/button"
import LoadingSpinner from "../../components/loader"
import CountdownTimer from "../../components/articles/time-countdown"
import { CalendarDatePicker } from "../../components/ui/calender-date-picker"
import { Calendar } from "../../components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { format } from "date-fns"

const dummyArticles : ArticleResponseType[] = [
    {
        categories: "blog",
        featured_image: '/images/dummy/blog.jpg',
        id: 1,
        is_featured: false,
        published_at: null,
        slug: 'sks-ssjdjd-sjdjd',
        title: 'Test of Title of article',
        content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident suscipit nostrum dolorum eius expedita accusantium ducimus ad incidunt quam illo ut eaque natus mollitia voluptas temporibus beatae at, totam neque?",
        created_at: "2025-02-03",
        status: "published",
        tags: [{name: "Housing"}, {name: "Agency"}],
        updated_at: null
    },
    {
        categories: "blog",
        featured_image: '/images/dummy/blog.jpg',
        id: 2,
        is_featured: false,
        published_at: null,
        slug: 'sks-ssjdjd-sjdjd',
        title: 'Test of Title of article',
        content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident suscipit nostrum dolorum eius expedita accusantium ducimus ad incidunt quam illo ut eaque natus mollitia voluptas temporibus beatae at, totam neque?",
        created_at: "2025-02-03",
        status: "published",
        tags: [{name: "Housing"}, {name: "Agency"}],
        updated_at: null
    },
    {
        categories: "blog",
        featured_image: '/images/dummy/blog2.jpg',
        id: 3,
        is_featured: false,
        published_at: null,
        slug: 'sks-ssjdjd-sjdjd',
        title: 'Test of Title of article',
        content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident suscipit nostrum dolorum eius expedita accusantium ducimus ad incidunt quam illo ut eaque natus mollitia voluptas temporibus beatae at, totam neque?",
        created_at: "2025-02-03",
        status: "published",
        tags: [{name: "Housing"}, {name: "Agency"}],
        updated_at: null
    },
    {
        categories: "research",
        featured_image: '/images/dummy/dummy2.jpg',
        id: 4,
        is_featured: false,
        published_at: null,
        slug: 'sks-ssjdjd-sjdjd',
        title: 'Test of Title of article',
        content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident suscipit nostrum dolorum eius expedita accusantium ducimus ad incidunt quam illo ut eaque natus mollitia voluptas temporibus beatae at, totam neque?",
        created_at: "2025-02-03",
        status: "published",
        tags: [{name: "Housing"}, {name: "Agency"}],
        updated_at: null
    },
]

const FeaturedArticle = () => {
    const [activelayout, setAciveLayout] = useState<"list" | "grid">("list")
    const PAGE_SIZE = 10
    const [page, setPage] = useState(1)
    const scheduledDialogBtn = useRef<HTMLDivElement>(null)
    const [scheduleDetailsLoading, setScheduleDetailsLoading] = useState(false)
    const [changeSchedule, setChangeSchedule] = useState(false)

    const [totalNumberOfPages, setTotalNumberOfPages] = useState(7)
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [open, setOpen] = useState(false)


    const renderArticles = useCallback(() => {
        return (
            <>
                <div className="">
                    <div className={cn("gap-7",
                        { "grid grid-cols-1 ipad:grid-cols-2 gap-8": activelayout === "list"},
                        { "grid grid-cols-1 sm:grid-cols-2 mini:grid-cols-3": activelayout === "grid"},
                    )}>
                        { dummyArticles.map((art, index) => (
                            <ArticleCard
                                data={art}
                                displayLayout={activelayout}
                                key={art.id}
                                scheduledBtn={scheduledDialogBtn}
                            />
                        ))}
                    </div>
                </div>
            </>
        )
    }, [activelayout, page])

    const handlePageChange = (page: number) => {
        setPage(page);
        // You can also fetch data or perform other actions here
      };

    const scheduleFormSchema = z.object({
        date_of_birth: z.date({
            required_error: "Please enter date of birth"
        }),
    });

    const scheduleForm = useForm<z.infer<typeof scheduleFormSchema>>({
        resolver: zodResolver(scheduleFormSchema),
    })

    const onSubmit = async (values: z.infer<typeof scheduleFormSchema>) => {

    }

    

    return (
        <>
            <div className="app-container w-full pb-16">
                <div className="w-full flex justify-between text-gray-500 border-b border-gray-500 items-center">
                    <h1 className="mt-10 text-2xl ">Featured Articles <span className="font-medium">(23)</span></h1>

                    <div className="flex items-center space-x-3">
                        <LucideList onClick={() => {setAciveLayout("list")}} className="cursor-pointer"/>
                        <LucideLayoutGrid onClick={() => {setAciveLayout("grid")}} className="cursor-pointer"/>
                    </div>
                </div>

                <div className="mt-16 ">
                    {renderArticles()}
                </div>
            </div>

            <Dialog>
                <DialogTrigger asChild>
                    <div ref={scheduledDialogBtn} className="hidden">Scheduled details</div>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Schedule details</DialogTitle>
                    </DialogHeader>

                    <div className="">
                        { scheduleDetailsLoading ?  
                            <div className="py-7 flex justify-center">
                                <LoadingSpinner className={{scale : "70%"}} loading={true}/>
                            </div> :

                            <div className="">
                                <CountdownTimer
                                    publishDate={'2025-03-25T00:00:00'}
                                />

                                <div className="">
                                    { !changeSchedule ?
                                        <p onClick={()=> {setChangeSchedule(true)}} className="text-center text-secondary cursor-pointer">Change schedule</p> :
                                        
                                        <Form {...scheduleForm}>
                                            <form onSubmit={scheduleForm.handleSubmit(onSubmit)} className="space-y-6 mt-9">
                                                <div className="ipad:px-4">
                                                    <FormField
                                                        control={scheduleForm.control}
                                                        name="date_of_birth"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col">
                                                                <Popover open={open} onOpenChange={setOpen}>
                                                                    <PopoverTrigger asChild className="w-full hover:bg-transparent focus:bg-transparent">
                                                                        <FormControl className="border border-gray-300 w-full dark:border-[#1D2739]">
                                                                            <Button
                                                                                variant={"outline"}
                                                                                className={cn(
                                                                                    "w-full py-7 pl-3 text-left font-normal",
                                                                                    !field.value && "text-muted-foreground"
                                                                                )}
                                                                            >
                                                                                {field.value ? (
                                                                                    format(field.value, "PPP")  
                                                                                ) : (
                                                                                    <span>Select Date</span>
                                                                                )}

                                                                                <LucideCalendarSearch className="ml-auto h-4 w-4 opacity-50" />
                                                                            </Button>
                                                                        </FormControl>
                                                                    </PopoverTrigger>

                                                                    <PopoverContent className="w-auto p-0" align="start">
                                                                        <Calendar
                                                                            mode="single"
                                                                            captionLayout="dropdown-buttons"
                                                                            selected={date}
                                                                            onSelect={(e: Date | undefined)=> {                                                                    
                                                                                field.onChange(e)
                                                                                setDate(e)
                                                                                // setOpen(false) 
                                                                            }}
                                                                            fromYear={1920}
                                                                            toYear={2030}
                                                                            classNames={{
                                                                                dropdown_year: 'focus:bg-white hover:bg-white active:bg-white',
                                                                                caption_dropdowns: 'flex space-x-2 focus:bgwhi',
                                                                            }}
                                                                            disabled={(date) => 
                                                                                date < new Date()
                                                                            }
                                                                            initialFocus
                                                                        />
                                                                    </PopoverContent>
                                                                </Popover>

                                                                <FormMessage className="font-normal text-xs dark:text-red-500"/>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                                
                                                <div className="flex items-center justify-center pb-5">
                                                    <Button className="text-white">Change Schedule</Button>
                                                </div>
                                            </form>
                                        </Form>
                                    }
                                </div>
                            </div>
                        }

                    </div>
             
                    {/* <DialogFooter>
                        <Button className="text-white" type="submit">Change schedule</Button>
                    </DialogFooter> */}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default FeaturedArticle