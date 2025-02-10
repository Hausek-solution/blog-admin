import EditorJS from '@editorjs/editorjs';
import DragDrop from 'editorjs-drag-drop';
import { useEffect, useRef, useState } from "react";
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

const UpdateArticlePage = () => {
    const [editorLoading, setEditorLoading] = useState(false)
    const editorInstance = useRef(null);
    const [editorData, setEditorData] = useState(null); // State to store editor content
    const [showPreview, setShowPreview] = useState(false); // State to toggle preview
    const previewSheet = useRef<HTMLDivElement>(null)

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
            inlineToolbar: ['link', 'marker', 'bold', 'italic', 'image'],
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
          setShowPreview(true); // Show the preview
        }
    };


    return (
        <>
            <div className="app-container w-full pb-16">
                <div className="w-full flex justify-between text-gray-500 border-b border-gray-500 items-center">
                    <h1 className="mt-10 text-2xl ">Edit Article</h1>

                    <div className="space-x-3 flex items-center">
                        <Button className="text-white">Save as Draft</Button>

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
                              
                                <DropdownMenuItem>
                                    Schedule publish
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

                            <Input id="picture" type="file"  className="max-w-sm border border-gray-400 mt-2"/>
                        </div>

                        <div className="max-w-sm mt-14">
                            <p className="text-xl font-medium">Title</p>

                            <Input id="picture" placeholder="Enter article title" className="max-w-sm border border-gray-400 mt-2 py-6"/>
                        </div>
                    </div>

                    <div className="border border-gray-400 rounded-md w-full max-w-2xl">
                        <img
                            src="/images/dummy/blog2.jpg"
                            className="max-h-72 object-center object-fill"
                        />
                    </div>
                </div>

                <div className="mt-16">
                    <div className='flex items-center justify-between'>
                        <h1 className="text-lg font-medium ipad:text-xl md:text-2xl">Editor</h1>
                        
                        <div className=''>
                            <Button onClick={() => {previewSheet.current.click()}} className='text-white'>Preview</Button>
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
                        
                        <CustomSheetContent className='bg-white' side='bottom'>
                            <CustomSheetHeader>
                            <CustomSheetTitle>Edit profile</CustomSheetTitle>
                            
                            </CustomSheetHeader>
                        </CustomSheetContent>
                    </CustomSheet>
                </div>
            </div>
        </>
    )
}

export default UpdateArticlePage