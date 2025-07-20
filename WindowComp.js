class WindowComp extends HTMLElement {
    constructor() {
        super();
        // Attach shadow DOM
        const shadow = this.attachShadow({ mode: 'open' });

        // Create window structure
        const windowElement = document.createElement('div');
        windowElement.className = 'window';
        windowElement.innerHTML = `
            <div class="window-header">Window Title</div>
            <slot name="content"></slot>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .window {
                width: 300px;
                height: 200px;
                background-color: #000000ff;
                border: 1px solid #333;
                position: absolute;
                top: 50px;
                left: 50px;
                user-select: none;
            }
            .window-header {
                background-color: #333;
                color: white;
                padding: 5px;
                cursor: move;
                font-family: Arial, sans-serif;
            }
            ::slotted(*) {
                padding: 10px;
                font-family: Arial, sans-serif;
            }
        `;

        // Append to shadow DOM
        shadow.appendChild(style);
        shadow.appendChild(windowElement);

        // Dragging state
        this.isDragging = false;
        this.currentX = 50;
        this.currentY = 50;
        this.initialX = 0;
        this.initialY = 0;

        // Get header
        this.header = shadow.querySelector('.window-header');
        this.windowElement = shadow.querySelector('.window');

        // Bind event listeners
        this.header.addEventListener('mousedown', this.startDragging.bind(this));
        document.addEventListener('mousemove', this.drag.bind(this));
        document.addEventListener('mouseup', this.stopDragging.bind(this));
    }

    startDragging(e) {
        this.initialX = e.clientX - this.currentX;
        this.initialY = e.clientY - this.currentY;
        this.isDragging = true;
    }

    drag(e) {
        if (this.isDragging) {
            e.preventDefault();
            this.currentX = e.clientX - this.initialX;
            this.currentY = e.clientY - this.initialY;
            this.windowElement.style.left = this.currentX + 'px';
            this.windowElement.style.top = this.currentY + 'px';
        }
    }

    stopDragging() {
        this.isDragging = false;
    }
}

// Define the custom element
customElements.define('window-comp', WindowComp);