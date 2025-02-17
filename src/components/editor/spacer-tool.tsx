import { BlockTool, BlockToolData } from '@editorjs/editorjs';

interface SpacerData extends BlockToolData {
  spaces: number;
}


export default class SpacerTool implements BlockTool {

    private data: SpacerData;
    private api: any;
    private wrapper: HTMLElement | null;

    
    static get toolbox() {
      return {
        title: 'Spacer',
        icon: '<svg>⬜</svg>', // Add an icon for your tool
      };
    }
  
    constructor({ data, api }) {
      this.api = api;
      this.data = data || { spaces: 1 }; // Default to 1 space
      this.wrapper = null;
    }
  
    render(): HTMLElement {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('spacer-block');
      
        // Initialize data.spaces if it's undefined
        if (this.data.spaces === undefined) {
          this.data.spaces = 1; // Default to 1 space
        }
      
        // Create the spacer element
        const spacer = document.createElement('div');
        spacer.classList.add('spacer');
        spacer.style.height = `${this.data.spaces * 20}px`;
        spacer.style.backgroundColor = '#f0f0f0';
        this.wrapper.appendChild(spacer);
      
        // Listen for Enter key presses
        this.wrapper.addEventListener('keydown', this.handleKeyDown.bind(this));
      
        // Make the spacer focusable to capture key events
        this.wrapper.setAttribute('tabindex', '0');
        this.wrapper.focus();
      
        return this.wrapper;
    }
  
    handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default Enter behavior
  
        // Increment the number of spaces
        this.data.spaces += 1;
  
        // Update the spacer height
        const spacer = this.wrapper?.querySelector('.spacer') as HTMLElement | null;
        if (spacer) {
          spacer.style.height = `${this.data.spaces * 20}px`;
        }
      }
    }
  
    save(blockContent: HTMLElement): SpacerData {
      return {
        spaces: this.data.spaces,
      };
    }
  
    static get sanitize() {
      return {
        spaces: { type: 'number' }, // Ensure spaces is a number
      };
    }
  }