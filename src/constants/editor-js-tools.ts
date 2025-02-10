import EditorjsList from '@editorjs/list';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table'
import Header from "@editorjs/header"
import Raw from "@editorjs/raw";

import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Warning from "@editorjs/warning";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import Code from '@editorjs/code';
import InlineCode from '@editorjs/inline-code';
import SimpleImage from '@editorjs/simple-image';
import Marker from '@editorjs/marker';
import LayoutBlockTool from "editorjs-layout"
import TextVariantTune from '@editorjs/text-variant-tune';
import AlignmentTune from 'editor-js-alignment-tune';
import IndentTune from 'editorjs-indent-tune'
import Title from "title-editorjs";
import ToggleBlock from 'editorjs-toggle-block';
import AIText from '@alkhipce/editorjs-aitext'
import { ToolConstructable } from '@editorjs/editorjs';


export const EDITOR_CONFIG_TOoL = {
    header: Title,
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
        tunes: ['alignmentTune', 'indentTune',],
        //@ts-ignore
        placeholder: "Start typing"
    },
    textVariant: TextVariantTune,
    indentTune: {
        class: IndentTune,
        config: {
            highlightIndent: {
                className: 'indentHighlight',
            },
        }
    },
    // header: {
    //     class: Header,
    //     config: {
    //         tunes: ['alignmentTune', 'indentTune', 'title'],
    //         placeholder: 'Enter a header',
    //         levels: [1, 2, 3, 4, 5, 6],
    //         defaultLevel: 1,
    //     },
    // },
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
        tunes: ['alignmentTune'],
        config: {
          quotePlaceholder: 'Enter a quote',
          captionPlaceholder: 'Quote\'s author',
        },
    }, 
    embed: Embed,
    list: List,
    warning: Warning,
    code: Code,
    linkTool: LinkTool,
    image: {
        class:ImageTool,
        config: {
            endpoints: {
              byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
              byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
            }
        }
    },
    raw: Raw,
    marker: Marker,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    // simpleImage: SimpleImage,
    alignmentTune: {
        class: AlignmentTune,
        config: {
            blocks: {
                header: {
                    default: 'left',
                    availableAlignments: ['left', 'center', 'right']
                },
            }
        }
    },
    toggle: {
        class: ToggleBlock,
        inlineToolbar: true,
        placeholder: "Type the > character followed by Space to create a new toggle"
    },
    aiText: {
        // if you do not use TypeScript you need to remove "as unknown as ToolConstructable" construction
        // type ToolConstructable imported from @editorjs/editorjs package
        class: AIText as unknown as ToolConstructable,
        placeholder: "Start typing for suggestions",
        config: {
            // here you need to provide your own suggestion provider (e.g., request to your backend)
            // this callback function must accept a string and return a Promise<string> --- to use an LLM model
            callback: (text: string) => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(' ' + text)
                    }, 1000)
                })
            },
        }
    },
}

export const EDITOR_BLOCK = [
    {
      type: "layout",
      data: {
        itemContent: {
          1: {
            blocks: [
              {
                type: "paragraph",
                data: {
                  text: "item content 1",
                },
              },
            ],
          },
        },
        layout: {
          type: "container",
          id: "demo-data-container",
          className: "demo-data-container",
          style: "border: 1px solid #000000; padding: 16px; ",
          children: [
            {
              type: "item",
              id: "demo-data-item-1",
              className: "demo-data-item-1",
              style:
                "border: 1px solid #000000; display: inline-block; padding: 8px; ",
              itemContentId: "1",
            },
          ],
        },
      },
    },
  ]