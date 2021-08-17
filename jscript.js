const mpc = {
    elements: {
        container: null,
        main: null,
        padsContainer: null,
        pads: []
    },


    init() {
        //create main elements
        this.elements.container = document.createElement("div");
        this.elements.main = document.createElement("div");
        this.elements.mpcScreen = document.createElement("div");
        this.elements.padsContainer = document.createElement("div");

        //setup main elements
        this.elements.container.classList.add("container");
        this.elements.main.classList.add("mpc");
        this.elements.mpcScreen.classList.add("mpc__screen");
        this.elements.padsContainer.classList.add("mpc__pads");
        this.elements.padsContainer.appendChild(this._createPads());
``
        this.elements.pads = this.elements.padsContainer.querySelectorAll(".mpc__pad");

        // Add to DOM
        this.elements.container.appendChild(this.elements.main);
        this.elements.main.appendChild(this.elements.mpcScreen);
        this.elements.main.appendChild(this.elements.padsContainer);
        document.body.appendChild(this.elements.container);
    },

    _createPads() {
        const fragment = document.createDocumentFragment();
        const padLayout = [{
                keyCode: 81,
                keyTrigger: "Q",
                id: "bass",
                url: "audio/bass.wav"
            },
            {
                keyCode: 87,
                keyTrigger: "W",
                id: "kick",
                url: "audio/kick.wav"
            },
            {
                keyCode: 69,
                keyTrigger: "E",
                id: "open-hat",
                url: "audio/open-hat.wav"
            },
            {
                keyCode: 65,
                keyTrigger: "A",
                id: "riser",
                url: "audio/riser.wav"
            },
            {
                keyCode: 83,
                keyTrigger: "S",
                id: "snare",
                url: "audio/snare.wav"
            },
            {
                keyCode: 68,
                keyTrigger: "D",
                id: "vox",
                url: "audio/vox.wav"
            },
        ]

        padLayout.forEach(pad => {
            const padElement = document.createElement("button");
            const insertLineBreak = ["E", "D"].indexOf(pad.keyTrigger) !== -1;

            padElement.setAttribute("type", "button");
            padElement.classList.add("mpc__pad");
            padElement.innerText = pad.keyTrigger;

            let audio = document.getElementById(pad.keyTrigger);
            audio.src = pad.url;

            padElement.addEventListener("click", () => {
                padElement.classList.add("mpc__pad--active");
                setTimeout(() => padElement.classList.remove("mpc__pad--active"), 100);
                this._triggerSound(audio);
            })

            window.addEventListener("keydown", (e) => {
                if (e.keyCode === pad.keyCode) {
                    padElement.classList.add("mpc__pad--active");
                    setTimeout(() => padElement.classList.remove("mpc__pad--active"), 100);
                    this._triggerSound(audio);
                }

            })


            fragment.appendChild(padElement);
            
            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }

        });
        return fragment;
    },

    _triggerSound(audio) {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
    }
};


window.addEventListener("DOMContentLoaded", function () {
    mpc.init();

});