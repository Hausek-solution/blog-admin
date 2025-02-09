import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
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
  } from "../components/ui/dropdown-menu"
  import EditorJS from '@editorjs/editorjs';
import { useEffect, useRef, useState } from "react";
import ImageTool from '@editorjs/image';
import Header from "@editorjs/header"
import Paragraph from "@editorjs/paragraph"
import LoadingSpinner from "../components/loader";
import DragDrop from 'editorjs-drag-drop';
import EditorjsList from '@editorjs/list';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table'

const UpdateArticlePage = () => {
    const [editorLoading, setEditorLoading] = useState(false)
    const editorInstance = useRef(null);

    useEffect(() => {
        if (!editorInstance.current) {
          const editor = new EditorJS({
            holder: "editorjs",
            onReady: () => {
              console.log('Editor.js is ready to work!');
              // Initialize the drag-and-drop plugin
              new DragDrop(editor);
            },
            autofocus: true,
            inlineToolbar: ['link', 'marker', 'bold', 'italic'],
            //@ts-ignore
            logLevel: "ERROR",
            tools: {
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                    //@ts-ignore
                    placeholder: "Start typing"
                },
                header: {
                    class: Header,
                    config: {
                    placeholder: 'Enter a header',
                    levels: [1, 2, 3, 4, 5, 6],
                    defaultLevel: 1,
                    },
                },
                table: {
                    //@ts-ignore
                    class: Table,
                    inlineToolbar: true,
                    config: {
                      rows: 2,
                      cols: 3,
                      maxRows: 5,
                      maxCols: 5,
                    },
                },
                quote: {
                    class: Quote,
                    inlineToolbar: true,
                    shortcut: 'CMD+SHIFT+O',
                    config: {
                      quotePlaceholder: 'Enter a quote',
                      captionPlaceholder: 'Quote\'s author',
                    },
                }, 
                defaultBlock: Paragraph
            },
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
                    <h1 className="text-lg font-medium ipad:text-xl md:text-2xl">Editor</h1>

                    <div className="mt-5 border border-gray-400 rounded-lg w-full py-20 bg-white min-h-80">
                        { editorLoading ?
                            <div className="py-7 flex justify-center">
                                <LoadingSpinner className={{scale : "70%"}} loading={true}/>
                            </div> : 
                            
                            <div id="editorjs" className="w-full text-lg"></div>
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default UpdateArticlePage