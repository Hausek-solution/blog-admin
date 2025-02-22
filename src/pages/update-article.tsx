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
import DOMPurify from 'dompurify';
import {Option} from '../components/ui/multiple-selector';

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
import React from 'react';
import { createAnArticle, getArticlebySlug, updateAnArticle } from '../request/article-request';
import { AxiosResponse } from 'axios';
import { ArticleResponseType } from '../types/article-type';
import { LucideTriangleAlert } from 'lucide-react';
import { Checkbox } from '../components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import MultiSelector from '../components/articles/tag-selector';
import { displayToast } from '../helper/toast-displayer';
import { useToast } from '../hooks/use-toast';

const UpdateArticlePage = () => {
    const [editorLoading, setEditorLoading] = useState(false)
    const editorInstance = useRef(null);
    const [editorData, setEditorData] = useState(null); // State to store editor content
    const previewSheet = useRef<HTMLDivElement>(null)
    const [data, setData] = useState<ArticleResponseType | undefined>(undefined)

    // loading state
    const [saveDraftLoading, setSaveDraftLoading] = useState(false)
    const [category, setCategory] = useState<'blog' | 'research'>("blog")
    const [featuredImage, setFeaturedImage] = useState("")
    const [title, setTitle] = useState("")
    const [isFeatured, setIsFeatured] = useState(false)
    const [imageFile, setImageFile] = useState<File>(null)
    const [selectedTags, setSelectedTags] = React.useState<Option[]>([]);
    const [previousTags, setPreviousTags] = React.useState<Option[]>([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState('');
    const [saveArticleLoading, setSaveArticleLoading] = useState(false)
    const { toast } = useToast()
    const [reload, setReload] = useState(false)

    const fetchArticle = async () => {
        setEditorLoading(true)
        const articleSlug = window.location.pathname.split("/")[2]
        
        const response = await getArticlebySlug(articleSlug)
        const axiosResponse = response as AxiosResponse<ArticleResponseType, any>
        if (axiosResponse.status === 200) {
            setData(axiosResponse.data)
            setPreviewURL(axiosResponse.data.featured_image)
            setCategory(axiosResponse.data.categories)
            setIsFeatured(axiosResponse.data.is_featured)
            setPreviousTags(axiosResponse.data.tags.map(t => {return { label: t.name, value: t.name}}))
            setTitle(axiosResponse.data.title)
        }

        setEditorLoading(false)
    }
    
    useEffect(() => {
        fetchArticle().then()
    }, [reload])

    useEffect(() => {
        if (!editorInstance.current && data !== undefined) {
            console.log("Hello")
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
            data: JSON.parse(data.content)
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
    }, [data]);

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
          console.log(editorData)
        //   setShowPreview(true); // Show the preview
        }
    };

    const renderPreview = useCallback(() => {
        return (
            <>
                <div className="editorjs-preview font-raleway">
                    {editorData.blocks.map((block, index) => {
                    switch (block.type) {
                        case "checklist":
                            if (!block?.data?.items?.length) return null;

                            return (
                                <div key={index} className="flex flex-col gap-y-2">
                                    {block.data.items.map((item, i) => (
                                        <div key={i} className="flex items-center space-x-3">
                                            {/* <input
                                                type="checkbox"
                                                checked={item.meta?.checked || false} // Ensure it defaults to false if undefined
                                                disabled
                                                className="cdx-checklist__item-checkbox"
                                            /> */}
                                            <Checkbox 
                                                checked={item.checked || false}
                                                id={item.text}
                                                disabled
                                                // className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                            
                                            />
                                            <label htmlFor={item.text}
                                                className="text-black"
                                            >{item.text}</label>
                                        </div>
                                    ))}
                                </div>
                            );
                            
                    case "paragraph":
                        const indentLevel = block.tunes?.indentTune?.indentLevel || 0;

                        return (
                            <p 
                                key={index} 
                                className="ce-paragraph font-raleway font-normal"
                                style={{ marginLeft: `${indentLevel * 20}px` }} 
                                dangerouslySetInnerHTML={{ __html: block.data.text }}
                            />
                        );
                    case "header":
                        const { text, color, alignText, titleType } = block.data;
                        const hIndentLevel = block.tunes?.indentTune?.indentLevel || 0;
                        const headerLevel = titleType ? titleType.toLowerCase() : "h2"; // Default to h2 if titleType is missing
                        const headerStyle = {
                            color: color || "inherit", // Apply custom color
                            textAlign: alignText ? alignText.replace("Text-Align-", "") : "left", // Apply text alignment
                            marginLeft: `${hIndentLevel * 20}px`
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
                    case 'linkTool':
                        return (
                            <a target='_blank' className='text-blue-500' href={block.data.link}>{block.data.link}</a>
                        )
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
                            const renderList = (items, style, indentLevel = 0, counterType) => {
                                const ListTag = style === "ordered" ? "ol" : "ul";
                        
                                // Map counterType to CSS list-style-type values
                                const counterStyles = {
                                    "upper-roman": "upper-roman",
                                    "lower-roman": "lower-roman",
                                    "upper-alpha": "upper-alpha",
                                    "lower-alpha": "lower-alpha",
                                    "numeric": "decimal", // Default numeric type
                                };
                        
                                // Determine the list-style-type based on counterType
                                const listStyleType = counterType ? counterStyles[counterType] || "decimal" : undefined;
                    
                                return (
                                    <ListTag
                                        className={`cdx-block cdx-list`}
                                        style={{
                                            marginLeft: `${indentLevel * 20}px`, // Apply indent dynamically
                                            listStyleType: listStyleType, // Apply list-style-type
                                        }}
                                    >
                                        {items.map((item, i) => (
                                            <li key={i} className="cdx-list__item">
                                                <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content) }} />
                                                {item.items.length > 0 && renderList(item.items, style, indentLevel + 1, counterType)}
                                            </li>
                                        ))}
                                    </ListTag>
                                );
                            };
                        
                            return renderList(
                                block.data.items,
                                block.data.style,
                                block.tunes?.indentTune?.indentLevel,
                                block.data.meta?.counterType
                            );
                    case "table":

                        const { withHeadings, stretched, content } = block.data;
                        const tableIndentLevel = block.tunes?.indentTune?.indentLevel || 0;

                        return (
                            <table
                                key={index}
                                className={`ce-table border-collapse ${stretched ? "w-full" : ""}`} 
                                style={{ marginLeft: `${tableIndentLevel * 20}px` }} // Apply indent dynamically
                            >
                                <tbody>
                                    {content.map((row, i) => (
                                        <tr key={i} className="border">
                                            {row.map((cell, j) => (
                                                i === 0 && withHeadings ? (
                                                    <th
                                                        key={j}
                                                        className="ce-table__header py-3 px-3 border font-bold bg-gray-200 " // Style headings differently
                                                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(cell) }} 
                                                    />
                                                ) : (
                                                    <td
                                                        key={j}
                                                        className="ce-table__cell py-3 px-3 border"
                                                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(cell) }}
                                                    />
                                                )
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
                            <div key={index} className="ce-warning border-amber-500 border rounded-md p-4 font-raleway font-normal text-amber-800 bg-yellow-50 w-full max-w-lg">
                                <div className='flex items-center space-x-3'>
                                    <LucideTriangleAlert size={18}/>
                                    <strong className="ce-warning__title ">{block.data.title}</strong>
                                </div>
                                <p className="ce-warning__message font-normal pt-4">{block.data.message}</p>
                            </div>
                        );
                    case "delimiter":
                        return <hr key={index} className="ce-delimiter" />;
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
                    case "linespacer":
                        return (
                            <div
                                key={index}
                                className="ce-linespacer"
                                style={{
                                    height: `${block.data.spaces * 10}px`, // Adjust height based on spaces
                                    backgroundColor: 'transparent', // Optional: Add a background color for visibility
                                    margin: '10px 0', // Optional: Add margin for spacing
                                }}
                            />
                        );
                    default:
                        return <p key={index}>Unsupported block type: {block.type}</p>;
                    }})}
                </div>
            </>
        )
    }, [editorData]) 

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file)

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

    const getPublishingTime = (status: "draft" | "scheduled" | "published") => {
        const pDate =  new Date().toISOString()
        if (status === "draft") return null
        if (status === "published") return pDate 
    }

    const handleTagsChange = (tags: Option[]) => {
        setSelectedTags(tags);
        // You can now use the selected tags in this component
        console.log('Selected Tags:', tags);
    };

    const saveArticle = async (status: "draft" | "scheduled" | "published") => {

        if (editorInstance.current) {
            const savedData = await editorInstance.current.save();
            setEditorData(savedData);

            if (title === "") {
                displayToast({
                    message: "Title cannot be blank",
                    messageType: "error",
                    toast: toast
                })

                return
            }

            setSaveArticleLoading(true)


            const formattedTags =  selectedTags.map(tags => ({name: tags.label}))
            const previousFormattedTags = previousTags.map(tags => ({name: tags.label}))

            const response = await updateAnArticle({
                article_id: data.id,
                data: {
                    categories: category,
                    content: JSON.stringify(savedData),
                    featured_image: data.featured_image,
                    is_featured: isFeatured,
                    published_at: getPublishingTime(status),
                    status: status,
                    tags: [...formattedTags, ...previousFormattedTags],
                    title: title
                }
            })

            const createResponse = response as AxiosResponse<ArticleResponseType, any>

            if (createResponse.status === 200) {
                displayToast({
                    message: "Article updated successfully",
                    messageType: "success",
                    toast: toast
                })
            } else {
                displayToast({
                    message: response as string,
                    messageType: "error",
                    toast: toast
                })
            }

        }

        setSaveArticleLoading(false)
        setReload(!reload)
    }



    return (
        <>
            <div className="app-container w-full pb-16">
                <div className="w-full flex justify-between text-gray-500 border-b border-gray-500 items-center">
                    <h1 className="mt-10 text-2xl ">Edit Article</h1>

                    <div className="space-x-3 flex items-center">
                        <Button onClick={() => {saveArticle("draft")}} className="text-white">
                                <p className="">Save as Draft</p>
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
                            
                                <DropdownMenuItem>
                                    Schedule publish
                                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {saveArticle("published")}}>
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
                
                { editorLoading  ? 
                    <div className="w-full flex py-20 md:py-28 justify-center">
                        <div className="">
                            <LoadingSpinner className={{scale : "70%"}} loading={true}/>
                        </div> 
                    </div> :

                    <>                
                        <div className="flex flex-col mt-14 md:flex-row gap-8">
                            <div className="">
                                <div className="max-w-sm">
                                    <p className="text-gray-400">Featured image</p>

                                    <Input id="picture" disabled onChange={handleFileChange} type="file"  className="max-w-sm border border-gray-400 mt-2"/>
                                </div>

                                <div className="max-w-sm mt-14">
                                    <p className="text-xl font-medium">Title</p>

                                    <Input value={title} onChange={(e) => {setTitle(e.target.value)}} id="picture" placeholder="Enter article title" className="max-w-sm border border-gray-400 mt-2 py-6"/>
                                </div>
                            </div>

                            {/* <Button onClick={()=> { getPublishingTime()}} className='text-white'>Heloo pesants</Button> */}

                            <div className=" rounded-md w-full max-w-2xl">
                                { previewURL && 
                                    <img
                                        src={previewURL}
                                        className="max-h-72 object-center object-fill"
                                        alt='Featured image'
                                    />
                                }
                            </div>
                        </div>

                        <div className='pt-8'>
                            <p className="text-xl mb-3 font-medium">Category</p>

                            <RadioGroup 
                                className='flex space-x-4'
                                //@ts-ignore
                                onValueChange={(e)=> {setCategory(e)}}
                                defaultValue={"blog"}
                                value={category}
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="blog" id="r1" />
                                    <Label className='text-lg' htmlFor="r1">Blog</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="research" id="r2" />
                                    <Label className='text-lg' htmlFor="r2">Research Insight</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className='flex items-center space-x-3 mt-4 mini:mt-10 '>
                            <Checkbox
                                checked={isFeatured}
                                // @ts-ignore
                                onCheckedChange={(e) => {setIsFeatured(e)}}
                            />

                            <Label className='text-lg'>is Featured</Label>
                        </div>

                        <div className='pt-10'>
                            {/* <MultipleSelectorControlled onChange={handleTagsChange}/> */}
                            <p className="text-xl font-medium mb-5">Tags <span className='font-raleway font-normal text-sm'></span></p>
                            <MultiSelector onChange={handleTagsChange} previousTags={previousTags}/>
                        </div>

                        <div className='flex items-center space-x-3 mt-5'>
                            <div className='bg-secondary text-white px-3 py-1 rounded-full'>{previousTags.map(tags => tags.value)}</div>
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
                                    <CustomSheetTitle className='pb-14'>Preview Article</CustomSheetTitle>

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
                           
                        { saveArticleLoading &&
                            <div className='bg-black/30 flex items-center justify-center h-screen w-full fixed top-0 left-0'>
                                <div className=''>
                                    <LoadingSpinner className={{scale : "80%"}} color='#FFF' loading={true}/>
                                </div>
                            </div>
                        }
                    </>
                }
            </div>
        </>
    )
}

export default UpdateArticlePage