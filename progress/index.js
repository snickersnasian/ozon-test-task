const template = document.createElement("template")

template.innerHTML = `
    <link rel="stylesheet" href="./progress/style.css" />
    <div class="progress">
    <div class="progress__title">Progress</div>
    <div class="progress__wrapper">
    <div class="progress__graph">
        <div class="progress__circle-wrap">
        <svg class="progress__ring" width="120" height="120">
            <circle
            class="progress__circle-background"
            stroke="#F0F3F6"
            stroke-width="8"
            cx="60"
            cy="60"
            r="44"
            fill="transparent"
            />
            <circle
            class="progress__circle"
            stroke="#255AF6"
            stroke-width="8"
            cx="60"
            cy="60"
            r="44"
            fill="transparent"
            />
        </svg>
        </div>
    </div>
    <div class="progress__controls">
        <div class="progress__control">
        <input type="number"  class="progress__input" value="100"/>
        <div class="progress__control-title">Value</div>
        </div>
        <div class="progress__control">
        <label class="progress__switch">
            <input name="animation" class="progress__checkbox" type="checkbox" />
            <span class="progress__slider progress__slider_round"></span>
        </label>
        <div class="progress__control-title">Animate</div>
        </div>
        <div class="progress__control">
        <label class="progress__switch">
            <input name="hide" class="progress__checkbox" type="checkbox" />
            <span class="progress__slider progress__slider_round"></span>
        </label>
        <div class="progress__control-title">Hide</div>
        </div>
    </div>
    </div>
    </div>
`

class ProgressCard extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    updateCircle = (val) => {
        const circle = this.shadowRoot.querySelector(".progress__circle")
        const curcumference = this.getCurcumference()
        const offset = curcumference - (val / 100) * curcumference
        circle.style.strokeDashoffset = offset
    }

    toggleAnimation = () => {
        this.shadowRoot.querySelector(".progress__ring")
            .classList.toggle("progress__ring_rotating")
    }

    toggleVisibility = () => {
        this.shadowRoot.querySelector(".progress__graph")
            .classList.toggle("progress__graph_hidden")
    }

    static get observedAttributes() {
        return ["percentage", "animated", "hidden"]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.shadowRoot.querySelector(".progress__input").value = this.getAttribute("percentage")
        this.updateCircle(this.getAttribute("percentage"))
    }

    getCurcumference = () => {
        const circle = this.shadowRoot.querySelector(".progress__circle")
        const radius = circle.r.baseVal.value
        const curcumference = 2 * Math.PI * radius
        return curcumference
    }

    connectedCallback() {
        const circle = this.shadowRoot.querySelector(".progress__circle")
        const curcumference = this.getCurcumference()
        circle.style.strokeDasharray = `${curcumference} ${curcumference}`

        const percentInput = this.shadowRoot.querySelector(".progress__input")

        percentInput.addEventListener("change", (evt) => {
            const percent = evt.target

            if (percent.value > 100) {
                percent.value = 100
            } else if (percent.value < 0) {
                percent.value = 0
            }

            this.updateCircle(percent.value)
        })

        const animateState = this.shadowRoot.querySelector(
        '.progress__checkbox[name="animation"]'
        )
        const ring = this.shadowRoot.querySelector(".progress__ring")

        animateState.addEventListener("change", (evt) => {
            this.toggleAnimation()
        })

        const hideState = this.shadowRoot.querySelector(
        '.progress__checkbox[name="hide"]'
        )

        hideState.addEventListener("change", (evt) => {
            this.toggleVisibility()
        })
    }

    disconnectedCallback() {
        const percentInput = this.shadowRoot.querySelector(".progress__input")

        percentInput.removeEventListener("change", (evt) => {
            const percent = evt.target

            if (percent.value > 100) {
                percent.value = 100
            } else if (percent.value < 0) {
                percent.value = 0
            }

            setProgress(percent.value)
        })

        const animateState = this.shadowRoot.querySelector(
        '.progress__checkbox[name="animation"]'
        )

        animateState.removeEventListener("change", (evt) => {
            this.toggleAnimation()
        })

        const hideState = this.shadowRoot.querySelector(
        '.progress__checkbox[name="hide"]'
        )
        const progressGraph = this.shadowRoot.querySelector(".progress__graph")

        hideState.removeEventListener("change", (evt) => {
            this.toggleVisibility()
        })
    }
}

export default ProgressCard
