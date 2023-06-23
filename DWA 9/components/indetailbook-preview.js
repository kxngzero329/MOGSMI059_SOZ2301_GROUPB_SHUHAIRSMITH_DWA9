//@ts-check
import { html, checkIfNullOrUndefined} from "../modules/helper.js"
import { books,authors} from "../data.js"
/**grabs thing that is usedto fetch the datalist {link} from the helpers */
const grabHtmlData= html.displaySection.dataListItems
const dataListItems= checkIfNullOrUndefined(grabHtmlData)

const template = document.createElement('template')
template.innerHTML = `
    <style>
    * {
  box-sizing: border-box;
  }

/* overlay */

.overlay {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-width: 0;
  box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
  animation-name: enter;
  animation-duration: 0.6s;
  z-index: 10;
  background-color: rgba(var(--color-light), 1);
}

@media (min-width: 30rem) {
  .overlay {
    max-width: 30rem;
    left: 0%;
    top: 0;
    border-radius: 8px;;
  }
}

.overlay__row {
  display: flex;
  gap: 0.5rem;
  margin: 0 auto;
  justify-content: center;
}

.overlay__button {
  font-family: Roboto, sans-serif;
  background-color: rgba(var(--color-blue), 0.1);
  transition: background-color 0.1s;
  border-width: 0;
  border-radius: 6px;
  height: 2.75rem;
  cursor: pointer;
  width: 50%;
  color: rgba(var(--color-blue), 1);
  font-size: 1rem;
  border: 1px solid rgba(var(--color-blue), 1);
}

.overlay__button_primary {
  background-color: rgba(var(--color-blue), 1);
  color: rgba(var(--color-force-light), 1);
}

.overlay__button:hover {
  background-color: rgba(var((var(--color-blue))), 0.2);
}

.overlay__button_primary:hover {
  background-color: rgba(var(--color-blue), 0.8);
  color: rgba(var(--color-force-light), 1);
}

.overlay__title {
  padding: 1rem 0 0.25rem;
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1;
  letter-spacing: -0.1px;
  max-width: 25rem;
  margin: 0 auto;
  color: rgba(var(--color-dark), 0.8)
}

.overlay__blur {
  width: 100%;
  height: 200px;
  filter: blur(10px);
  opacity: 0.5;
  transform: scale(2);
}

.overlay__image {
  max-width: 10rem;
  position: absolute;
  top: 1.5m;
  left: calc(50% - 5rem);
  border-radius: 2px;
  box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
}

.overlay__data {
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  color: rgba(var(--color-dark), 0.8)
}

.overlay__data_secondary {
  color: rgba(var(--color-dark), 0.6)
}

.overlay__content {
  padding: 2rem 1.5rem;
  text-align: center;
  padding-top: 3rem;
}

.overlay__preview {
  overflow: hidden;
  margin: -1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* backdrop */

.backdrop {
  display: none;
  background: rgba(var(--color-dark), 0.3);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}

.overlay[open] ~ .backdrop {
  display: block;
}
    </style>
<dialog class="overlay" data-list-active>
  <div class="overlay__preview"><img class="overlay__blur" data-list-blur src=""/><img class="overlay__image" data-list-image src=""/></div>
  <div class="overlay__content">
   <h3 class="overlay__title" data-list-title></h3>
  <div class="overlay__data" data-list-subtitle></div>
   <p class="overlay__data overlay__data_secondary" data-list-description></p>
 </div>

 <div class="overlay__row">
  <button class="overlay__button overlay__button_primary" data-list-close>Close</button>
 </div>
 </dialog>
`
      /**class controls the indetail book feature when a book is clicked it shows an indetail preview */
export default class IndetailBookPreview extends HTMLElement {
    /**shadow dom that encapsulates {@link template} */
    #inner = this.attachShadow({ mode: 'closed' });
    /**
     * @typedef {object} Extends -contains html elements
     * @prop {Element | null | undefined} focusOnBook - overlay of in-detail book features
     * @prop {Element | null | undefined}  blurImage - blured image of the mainImage of the selected book
     * @prop {Element | null | undefined}  mainImage     - main image of the selected book
     * @prop {Element | null | undefined} activeTitle  - html element that is the title of selected book
     * @prop {Element | null | undefined} publishedDate - html elemet that is the published date of the selected book
     * @prop {Element | null | undefined} activeDescription - html element that is description of the selected book
     * @prop {Element | null | undefined} activeCloseButton - button that closes the in-detail book feature overlay
     */
    /**@type {Extends} */
    #extends = {
     
      focusOnBook: null,
      blurImage: null,
      mainImage: null,
      activeTitle: null,
      publishedDate: null,
      activeDescription: null,
      activeCloseButton: null,
    };
  
    constructor() {
      super();
      const { content } = template;
      this.#inner.appendChild(content.cloneNode(true));
     
    }
  
    connectedCallback() {
      this.#extends = {
        focusOnBook: checkIfNullOrUndefined(this.#inner.querySelector('[data-list-active]')),
        blurImage: checkIfNullOrUndefined(this.#inner.querySelector('[data-list-blur]')),
        mainImage: checkIfNullOrUndefined(this.#inner.querySelector('[data-list-image]')),
        activeTitle: checkIfNullOrUndefined(this.#inner.querySelector('[data-list-title]')),
        publishedDate: checkIfNullOrUndefined(this.#inner.querySelector('[data-list-subtitle]')),
        activeDescription: checkIfNullOrUndefined(this.#inner.querySelector('[data-list-description]')),
        activeCloseButton: checkIfNullOrUndefined(this.#inner.querySelector('[data-list-close]')),
      }; 
      /*i use bind to acces #extends since it out of reach this function i also put the addEventListener
      in the   connectedCallback() to prevent event listener accumulation which caused me*/
      dataListItems.addEventListener("click", this.getIndetailBookData.bind(this));
   /**opens in-detail book feature modal */
    
      dataListItems.addEventListener(
               "click",() => {
                checkIfNullOrUndefined(this.#extends.focusOnBook).showModal();
                       }) // closes in-depth view of a clicked book
              /**closes in-detail book feature modal */
  
     checkIfNullOrUndefined(this.#extends.activeCloseButton).addEventListener(
        'click', ()=>{
            checkIfNullOrUndefined(this.#extends.focusOnBook).close()
        })
    }
      /**
     * adds the indetail book iformation
     * get In detail book data from selected book
     * @param {{ path: any; composedPath: () => any; target: { tagName: string; }; }} event
     */
      getIndetailBookData(event) {
        const pathArray = Array.from(event.path || event.composedPath());
        let active;
      
        for (const node of pathArray) {
          if (event.target.tagName !== "BUTTON") return;
      
          if (active) break;
      
          const previewId = node.children[2].children[0].innerHTML;
      
          for (const singleBook of books) {
            if (singleBook.id === previewId) {
              active = singleBook;
              break;
            }
          }
        }
      
        if (!active) return;
      
        checkIfNullOrUndefined(this.#extends.blurImage).src = active.image;
        checkIfNullOrUndefined(this.#extends.mainImage).src = active.image;
        checkIfNullOrUndefined(this.#extends.activeTitle).innerText = active.title;
        checkIfNullOrUndefined(this.#extends.publishedDate).innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
        checkIfNullOrUndefined(this.#extends.activeDescription).innerText = active.description;
      }
      /**returns objecet cotaining elements */  
     get elementObjects() {
    return console.log(this.#extends)
   }
   set elementObjects(newValue) {
      throw new Error(`you can not change ${this.#extends} to ${newValue}`)
   }        
   }
  customElements.define('indetailbook-preview', IndetailBookPreview);