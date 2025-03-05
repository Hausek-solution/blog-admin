import { useCallback, useEffect, useState } from "react"
import { getArticlebySlug } from "../request/article-request"
import { ArticleResponseType } from "../types/article-type"
import { AxiosResponse } from "axios"
import LoadingSpinner from "../components/loader"
import { LucideTriangleAlert } from "lucide-react"
import DOMPurify from 'dompurify';
import { Checkbox } from "../components/ui/checkbox"
import React from "react"
import { format } from "date-fns"

const ArticleDetailsPage = () => {
    const [data, setData] = useState<ArticleResponseType | undefined>(undefined)
    const [articleContent, setArticleContent] = useState<any>({ blocks: []})
    const [articleLoading, setArticleLoading] = useState(false)


    const fetchArticle = async () => {
        setArticleLoading(true)
        const articleSlug = window.location.pathname.split("/")[2]
        
        const response = await getArticlebySlug(articleSlug)
        const axiosResponse = response as AxiosResponse<ArticleResponseType, any>
        if (axiosResponse.status === 200) {
            setData(axiosResponse.data)
            setArticleContent(JSON.parse(axiosResponse.data.content))
        }

        setArticleLoading(false)
    }

    useEffect(() => {
        fetchArticle().then()
    }, [])

    const renderAticle = useCallback(() => {
        return (
            <>
                <div className="editorjs-preview font-raleway">
                    {
                        //@ts-ignore
                        articleContent.blocks.map((block, index) => {
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
                                                    <li key={i} className="">
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
                            }
                        }
                    )}
                </div>
            </>
        )
    }, [articleContent]) 
    
    return (
        <>
            <div className="app-container w-full pb-16">
                <div className="border-t  border-gray-300 border px-2">
                    {   articleLoading ?
                        <div className="w-full flex py-20 md:py-28 justify-center">
                            <div className="">
                                <LoadingSpinner className={{scale : "70%"}} loading={true}/>
                            </div> 
                        </div> :

                        <div className="mb-12 ipad:my-20">
                            <div className="mx-auto w-full max-w-screen-xl px-5 ipad:px-12 pt-14 pb-20 mini:px-16 bg-background text-text bg-white">
                                <p className="text-3xl font-semibold text-primary">{data?.title}</p>
                                <p className="mt-3 text-secondary">Dated {data?.published_at ? format(data?.published_at, "do MMMM yyyy 'by' h:mma"): ""}</p>

                                <div className="pt-16">
                                    <img
                                        src={data?.featured_image}
                                        alt="featuured image"
                                        className="rounded-md h-96 object-cover w-full object-center"
                                    />

                                    <div className="mt-8">
                                        {renderAticle()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default ArticleDetailsPage