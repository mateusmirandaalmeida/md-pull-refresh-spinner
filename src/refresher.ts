export class Refresher {

    private element: HTMLElement;
    private callback: Function;
    private pressed: Boolean;
    /**
     * 
     * @param elm 
     * @param callback 
     */
    constructor(callback: Function, elm?: HTMLElement){
        this.element = elm || document.body;
        this.callback = callback;
        this.onInit();
    }

    onInit(){
        this.element.addEventListener('mousedown', event => {
            console.log(event);
            this.pressed = true;
            this.onMouseDown(event, this.element);
        });
        document.addEventListener('mouseup', event => {
            this.pressed = false;
            this.onMouseUp(event, this.element);
        });
    }

    onMouseDown(event: any, elm: HTMLElement){
        if(elm.scrollTop > 0) return;
        elm.addEventListener('mousemove', this.onMouseMove);
        this.handlingUserSelect(true);
    }

    onMouseUp(event: any, elm: HTMLElement){
        elm.removeEventListener('mousemove', this.onMouseMove);
        this.handlingUserSelect(false);
    }

    onMouseMove(event: any){
        console.log(event);
    }

    handlingUserSelect(enabled: Boolean){
        let style = document.createElement('style');
        style.id = 'md-pull-refresh-spinner';
        style.innerHTML = `
            * {
                -webkit-touch-callout: none !important; /* iOS Safari */
                -webkit-user-select: none !important; /* Safari */
                 -khtml-user-select: none !important; /* Konqueror HTML */
                   -moz-user-select: none !important; /* Firefox */
                    -ms-user-select: none !important; /* Internet Explorer/Edge */
                        user-select: none !important; 
            }
        `;
        let elm = document.getElementById('md-pull-refresh-spinner');
        if(enabled && !elm){
            document.head.appendChild(style);
        }else if(elm){
            document.head.removeChild(elm);
        }
    }

}