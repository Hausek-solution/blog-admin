import EditorJS from '@editorjs/editorjs';
import DragDrop from 'editorjs-drag-drop';
import { useCallback, useEffect, useRef, useState } from "react";
import LoadingSpinner from "../components/loader";
import { Button } from "../components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import { EDITOR_CONFIG_TOoL } from "../constants/editor-js-tools";
import Undo from 'editorjs-undo';
import { ScrollArea } from '../components/ui/scroll-area';

import {
    CustomSheet,
    CustomSheetClose,
    CustomSheetContent,
    CustomSheetDescription,
    CustomSheetFooter,
    CustomSheetHeader,
    CustomSheetTitle,
    CustomSheetTrigger,
  } from "../components/ui/full-screensheet"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "../components/ui/popover"
import React from 'react';
import { Calendar } from '../components/ui/calendar';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CountdownTimer from '../components/articles/time-countdown';
import { LucideCalendarSearch } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';


const CreateArticlePage = () => {
    const [editorLoading, setEditorLoading] = useState(false)
    const editorInstance = useRef(null);
    const [editorData, setEditorData] = useState(null); // State to store editor content
    const previewSheet = useRef<HTMLDivElement>(null)
    const [changeSchedule, setChangeSchedule] = useState(false)
    const [date, setDate] = useState<Date | undefined>(new Date())

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState('');

    const [open, setOpen] = useState(false)

    // loading state
    const [saveDraftLoading, setSaveDraftLoading] = useState(false)
    const [scheduleDetailsLoading, setScheduleDetailsLoading] = useState(false)
    const [scheduleDate, setScheduleDate] = useState(false)

    const scheduledDialogBtn = useRef<HTMLDivElement>(null)
    

    useEffect(() => {
        if (!editorInstance.current) {
          const editor = new EditorJS({
            holder: "editorjs",
            onReady: () => {
              console.log('Editor.js is ready to work!');
              // Initialize the drag-and-drop plugin
              new DragDrop(editor);
              new Undo({ editor });
            },
            autofocus: true,
            inlineToolbar: ['bold', 'italic', 'marker', 'link'],
            //@ts-ignore
            logLevel: "ERROR",
            //@ts-ignore
            tools: EDITOR_CONFIG_TOoL,
            tunes: ['textVariant', 'indentTune'],

        });
    
          console.log('Editor instance created:', editor); // Debugging log
          editorInstance.current = editor;
        }
    
        return () => {
          console.log('Cleaning up editor instance:', editorInstance.current); // Debugging log
          if (editorInstance.current && typeof editorInstance.current.destroy === 'function') {
            editorInstance.current.destroy();
            editorInstance.current = null;
          }
        };
    }, []);

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

    const saveData = async () => {
        if (editorInstance.current) {
          const savedData = await editorInstance.current.save();
          console.log('Saved data:', savedData);
        }
    };

    const handlePreview = async () => {
        if (editorInstance.current) {
          const savedData = await editorInstance.current.save();
          setEditorData(savedData); // Save editor content to state
          console.log(savedData)
        //   setShowPreview(true); // Show the preview
        }
    };
    
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setSelectedFile(file);
            const fileReader = new FileReader();

            fileReader.onload = () => {
                setPreviewURL(fileReader.result as string);
            };
            fileReader.readAsDataURL(file);
        }else {
            setSelectedFile(null);
            setPreviewURL('');
        }
    }

    const renderPreview = useCallback(() => {
        return (
            <>
                <div className="editorjs-preview">
                    {editorData.blocks.map((block, index) => {
                    switch (block.type) {
                    case "paragraph":
                        return (
                        <p key={index} className="ce-paragraph">
                            {block.data.text}
                        </p>
                        );
                        case "header":
                            const { text, color, alignText, titleType } = block.data;
                            const headerLevel = titleType ? titleType.toLowerCase() : "h2"; // Default to h2 if titleType is missing
                            const headerStyle = {
                                color: color || "inherit", // Apply custom color
                                textAlign: alignText ? alignText.replace("text-align-", "") : "left", // Apply text alignment
                            };
                
                            return React.createElement(
                                headerLevel,
                                {
                                key: index,
                                className: `ce-header ce-header--${headerLevel}`,
                                style: headerStyle,
                                },
                                text
                            );
                
                    case "quote":
                        return (
                        <blockquote key={index} className="ce-quote">
                            <p className="ce-quote__text">{block.data.text}</p>
                            {block.data.caption && (
                            <footer className="ce-quote__caption">{block.data.caption}</footer>
                            )}
                        </blockquote>
                        );
                    case "list":
                        return (
                        <ul key={index} className="cdx-block cdx-list">
                            {block.data.items.map((item, i) => (
                            <li key={i} className="cdx-list__item">
                                {item}
                            </li>
                            ))}
                        </ul>
                        );
                    case "table":
                        return (
                        <table key={index} className="ce-table">
                            <tbody>
                            {block.data.content.map((row, i) => (
                                <tr key={i}>
                                {row.map((cell, j) => (
                                    <td key={j} className="ce-table__cell">
                                    {cell}
                                    </td>
                                ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        );
                    case "image":
                        return (
                        <div key={index} className="ce-image">
                            <img
                            src={block.data.file.url}
                            alt={block.data.caption}
                            className="ce-image__img"
                            />
                            {block.data.caption && (
                            <p className="ce-image__caption">{block.data.caption}</p>
                            )}
                        </div>
                        );
                    case "code":
                        return (
                        <pre key={index} className="ce-code">
                            <code>{block.data.code}</code>
                        </pre>
                        );
                    case "warning":
                        return (
                        <div key={index} className="ce-warning">
                            <strong className="ce-warning__title">{block.data.title}</strong>
                            <p className="ce-warning__message">{block.data.message}</p>
                        </div>
                        );
                    case "delimiter":
                        return <hr key={index} className="ce-delimiter" />;
                    case "checklist":
                        return (
                        <ul key={index} className="cdx-block cdx-checklist">
                            {block.data.items.map((item, i) => (
                            <li key={i} className="cdx-checklist__item">
                                <input
                                type="checkbox"
                                checked={item.checked}
                                disabled
                                className="cdx-checklist__item-checkbox"
                                />
                                <span className="cdx-checklist__item-text">{item.text}</span>
                            </li>
                            ))}
                        </ul>
                        );
                    case "embed":
                        return (
                        <div
                            key={index}
                            className="ce-embed"
                            dangerouslySetInnerHTML={{ __html: block.data.embed }}
                        />
                        );
                    case "raw":
                        return (
                        <div
                            key={index}
                            className="ce-raw"
                            dangerouslySetInnerHTML={{ __html: block.data.html }}
                        />
                        );
                    default:
                        return <p key={index}>Unsupported block type: {block.type}</p>;
                    }})}
                </div>
            </>
        )
    }, [editorData]) 

    return (
        <>
            <div className="app-container w-full pb-16">
                <div className="w-full flex justify-between text-gray-500 border-b border-gray-500 items-center">
                    <h1 className="mt-10 text-2xl ">Create Article</h1>

                    <div className="space-x-3 flex items-center">
                        <Button className="text-white">
                            { saveDraftLoading ? 
                                <span className="">
                                    <LoadingSpinner color="#FFFFFF" className={{scale : "50%"}} loading={saveDraftLoading}/>
                                </span> :
                                <p className="">Save as Draft</p>
                            }
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Open</Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Options</DropdownMenuLabel>

                                <DropdownMenuSeparator />

                                <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    Preview
                                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                </DropdownMenuItem>
                              
                                <DropdownMenuItem onClick={()=> {scheduledDialogBtn.current.click()}}>
                                    <p className=''>Schedule publish</p>                                    
                                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Publish
                                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                </DropdownMenuGroup>

                                <DropdownMenuSeparator />

                                <DropdownMenuGroup>
                                <DropdownMenuItem>Use LLM</DropdownMenuItem>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem>Email</DropdownMenuItem>
                                        <DropdownMenuItem>Message</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>More...</DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                                <DropdownMenuItem>
                                    New Team
                                    <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                </DropdownMenuGroup>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem disabled>API</DropdownMenuItem>

                                <DropdownMenuSeparator />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className="flex flex-col mt-14 md:flex-row gap-8">
                    <div className="">
                        <div className="max-w-sm">
                            <p className="">Featured image</p>

                            <Input id="picture" onChange={handleFileChange} type="file"  className="max-w-sm border border-gray-400 mt-2"/>
                        </div>

                        <div className="max-w-sm mt-14">
                            <p className="text-xl font-medium">Title</p>

                            <Input id="picture" placeholder="Enter article title" className="max-w-sm border border-gray-400 mt-2 py-6"/>
                        </div>
                    </div>

                    <div className="border border-gray-400 rounded-md w-full max-w-2xl">
                        { previewURL && 
                            <img
                                src={previewURL}
                                className="max-h-72 object-center object-fill"
                                alt='Featured image'
                            />
                        }
                    </div>
                </div>

                <div className="mt-16">
                    <div className='flex items-center justify-between'>
                        <h1 className="text-lg font-medium ipad:text-xl md:text-2xl">Editor</h1>
                        
                        <div className=''>
                            <Button onClick={() => {handlePreview(); previewSheet.current.click()}} className='text-white'>Preview</Button>
                        </div>
                    </div>


                    <div className="mt-5 border border-gray-400 rounded-lg w-full py-20 bg-white min-h-80">
                        { editorLoading ?
                            <div className="py-7 flex justify-center">
                                <LoadingSpinner className={{scale : "70%"}} loading={true}/>
                            </div> : 
                            
                            <div id="editorjs" className="w-full text-lg px-6 md:px-0 font-raleway"></div>
                        }
                    </div>
                </div>
                
                <div className=''>
                    <CustomSheet>
                        <CustomSheetTrigger asChild>
                            <div ref={previewSheet} className='hidden'>Open</div>
                        </CustomSheetTrigger>
                        
                        <CustomSheetContent className='bg-white blog-container font-raleway' side='bottom'>
                            <CustomSheetHeader>
                            <CustomSheetTitle>Preview Article</CustomSheetTitle>

                            <div className='min-h-60 font-raleway'>
                                { !editorData ?
                                    <div className='min-h-60 w-full flex items-center justify-center'>
                                        <p className=''>No content to preview</p>
                                    </div> :
                                    
                                    renderPreview()
                                }
                            </div>
                            
                            </CustomSheetHeader>
                        </CustomSheetContent>
                    </CustomSheet>
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
                                            <Button className="text-white">
                                                { scheduleDate ? 
                                                    <span className="">
                                                        <LoadingSpinner color="#FFFFFF" className={{scale : "50%"}} loading={scheduleDate}/>
                                                    </span> :
                                                    <p className="">Set Schedule</p>
                                                }
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
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

export default CreateArticlePage