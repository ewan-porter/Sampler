const mpc = {
    elements: {
        container: null,
        main: null,
        mpcPads: null,
        pads: []
    },


    init() {
        //create main elements
        this.elements.container = document.createElement("div");
        this.elements.main = document.createElement("div");
        //left side container
        this.elements.mpcControls = document.createElement("div");

        //left side elements
        this.elements.mpcBrand = document.createElement("div");
        this.elements.mpcScreen = document.createElement("div");
        this.elements.mpcBankPanelGrid = document.createElement("div");
        this.elements.mpcPanel1 = document.createElement("div");
        this.elements.mpcPanel2 = document.createElement("div");
        this.elements.mpcBanks = document.createElement("div");
        this.elements.mpcPanel3 = document.createElement("div");
        this.elements.mpcCircle = document.createElement("div");

        //right side container
        this.elements.mpcRight = document.createElement("div");
        //vents container
        this.elements.mpcVents = document.createElement("div");


        //vents loop
        for (let i = 0; i < 28; i++) {
            this.elements.mpcVent = document.createElement("div");
            this.elements.mpcVent.classList.add("mpc__vent");
            this.elements.mpcVents.appendChild(this.elements.mpcVent);
        }

        //inner elements right side
        this.elements.mpcText = document.createElement("div");
        this.elements.mpcPads = document.createElement("div");



        //setup container elements
        this.elements.container.classList.add("container");
        this.elements.main.classList.add("mpc");

        //left side container
        this.elements.mpcControls.classList.add("mpc__controls");

        //left side inner elements
        this.elements.mpcBrand.classList.add("mpc__brand");
        this.elements.mpcBrand.innerHTML = "<h1>AKAI <span class='mpc__brand--pro'>professional</span></h1>"
        this.elements.mpcScreen.classList.add("mpc__screen");
        this.elements.mpcBankPanelGrid.classList.add("mpc__bank-panel-grid");

        //left side grid elements
        this.elements.mpcPanel1.classList.add("mpc__panel1");
        this.elements.mpcPanel2.classList.add("mpc__panel2");
        this.elements.mpcBanks.classList.add("mpc__banks");
        const buttons = this.elements.mpcBanks.appendChild(this.bankInit());
        // this.elements.mpcBanks.innerHTML = "<button type='button' id='bank1' class='mpc__button'>Madlib</button><button type='button' id='bank2' class='mpc__button'>J Dilla</button>"
        this.elements.mpcPanel3.classList.add("mpc__panel3");
        this.elements.mpcCircle.classList.add("mpc__circle");

        //right side container
        this.elements.mpcRight.classList.add("mpc__right");

        //vents container
        this.elements.mpcVents.classList.add("mpc__vents");

        //left side inner elements
        this.elements.mpcText.classList.add("mpc__text");
        this.elements.mpcText.innerHTML = "<h1><span class='mpc__text--outline'>MPC</span>2000</h1><p>MIDI PRODUCTION CENTER</p>"
        this.elements.mpcPads.classList.add("mpc__pads");
        this.elements.mpcPads.appendChild(this._createPads(buttons));

        this.elements.pads = this.elements.mpcPads.querySelectorAll(".mpc__pad");






        // Add to DOM
        //container elements


        //left side elements
        this.elements.mpcControls.appendChild(this.elements.mpcBrand);
        this.elements.mpcControls.appendChild(this.elements.mpcScreen);
        this.elements.mpcControls.appendChild(this.elements.mpcBankPanelGrid);

        //left side grid elements
        this.elements.mpcBankPanelGrid.appendChild(this.elements.mpcPanel1);
        this.elements.mpcBankPanelGrid.appendChild(this.elements.mpcPanel2);
        this.elements.mpcBankPanelGrid.appendChild(this.elements.mpcBanks);
        this.elements.mpcBankPanelGrid.appendChild(this.elements.mpcPanel3);
        this.elements.mpcBankPanelGrid.appendChild(this.elements.mpcCircle);

        //right side elements
        this.elements.mpcRight.appendChild(this.elements.mpcVents);
        this.elements.mpcRight.appendChild(this.elements.mpcText);
        this.elements.mpcRight.appendChild(this.elements.mpcPads);

        this.elements.container.appendChild(this.elements.main);
        this.elements.main.appendChild(this.elements.mpcControls);
        this.elements.main.appendChild(this.elements.mpcRight);
        document.body.appendChild(this.elements.container);
    },

    bankInit() {
        // const fragment2 = document.createDocumentFragment();
        // const banks = [ {
        //     id: "Madlib"
        // }, {
        //     id: "J Dilla"
        // },];

        // banks.forEach(bank => {
        //     const bankButton = document.createElement("button");
        //     bankButton.setAttribute("type", "button");
        //     bankButton.classList.add("mpc__button");
        //     bankButton.innerHTML = bank.id;
        //     fragment2.appendChild(bankButton);
        // });

        const bankButton = document.createElement("input");
        bankButton.setAttribute("type", "checkbox");
        bankButton.classList.add("mpc__button");
        bankButton.innerHTML = "Switch it up";



        // bank1.addEventListener("click", function() {
        //     if (bank1.classList.contains("mpc__button--active")) {
        //       bank1.classList.remove("mpc__button--active"); 
        //     } else {
        //         bank1.classList.add("mpc__button--active"); 
        //     }

        // })


        return bankButton;


    },

    _createPads(buttons) {

        const fragment = document.createDocumentFragment();
        const padLayout = this.definePad(buttons);




        padLayout.forEach(pad => {
            const padElement = document.createElement("button");
            const insertLineBreak = ["4", "R", "F", "V"].indexOf(pad.keyTrigger) !== -1;

            padElement.setAttribute("type", "button");
            padElement.classList.add("mpc__pad");
            padElement.innerText = pad.id;

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

    definePad(buttons) {
        const madlibLayout = [{
                keyCode: 49,
                keyTrigger: "1",
                id: "kick-1",
                url: "audio/madlib/kick-1.wav"
            },
            {
                keyCode: 50,
                keyTrigger: "2",
                id: "kick-2",
                url: "audio/madlib/kick-2.wav"
            },
            {
                keyCode: 51,
                keyTrigger: "3",
                id: "clap-1",
                url: "audio/madlib/clap-1.wav"
            },
            {
                keyCode: 52,
                keyTrigger: "4",
                id: "clap-2",
                url: "audio/madlib/clap-2.wav"
            },
            {
                keyCode: 81,
                keyTrigger: "Q",
                id: "crash-1",
                url: "audio/madlib/crash-1.wav"
            },
            {
                keyCode: 87,
                keyTrigger: "W",
                id: "crash-2",
                url: "audio/madlib/crash-2.wav"
            },
            {
                keyCode: 69,
                keyTrigger: "E",
                id: "guitar-1",
                url: "audio/madlib/guitar-1.wav"
            },
            {
                keyCode: 82,
                keyTrigger: "R",
                id: "guitar-2",
                url: "audio/madlib/guitar-2.wav"
            },
            {
                keyCode: 65,
                keyTrigger: "A",
                id: "hh-1",
                url: "audio/madlib/hh-1.wav"
            },
            {
                keyCode: 83,
                keyTrigger: "S",
                id: "hh-2",
                url: "audio/madlib/hh-2.wav"
            },
            {
                keyCode: 68,
                keyTrigger: "D",
                id: "snare-1",
                url: "audio/madlib/snare-1.wav"
            },
            {
                keyCode: 70,
                keyTrigger: "F",
                id: "snare-2",
                url: "audio/madlib/snare-2.wav"
            },
            {
                keyCode: 90,
                keyTrigger: "Z",
                id: "synth-1",
                url: "audio/madlib/synth-1.wav"
            },
            {
                keyCode: 88,
                keyTrigger: "X",
                id: "synth-2",
                url: "audio/madlib/synth-2.wav"
            },
            {
                keyCode: 67,
                keyTrigger: "C",
                id: "vox-1",
                url: "audio/madlib/vox-1.wav"
            },
            {
                keyCode: 86,
                keyTrigger: "V",
                id: "vox-2",
                url: "audio/madlib/vox-2.wav"
            },

        ];

        const jDillaLayout = [{
                keyCode: 49,
                keyTrigger: "1",
                id: "kick-1",
                url: "audio/jdilla/kick-1.wav"
            },
            {
                keyCode: 50,
                keyTrigger: "2",
                id: "kick-2",
                url: "audio/jdilla/kick-2.wav"
            },
            {
                keyCode: 51,
                keyTrigger: "3",
                id: "clap-1",
                url: "audio/jdilla/clap-1.wav"
            },
            {
                keyCode: 52,
                keyTrigger: "4",
                id: "clap-2",
                url: "audio/jdilla/clap-2.wav"
            },
            {
                keyCode: 81,
                keyTrigger: "Q",
                id: "crash-1",
                url: "audio/jdilla/crash-1.wav"
            },
            {
                keyCode: 87,
                keyTrigger: "W",
                id: "crash-2",
                url: "audio/jdilla/crash-2.wav"
            },
            {
                keyCode: 69,
                keyTrigger: "E",
                id: "fx-1",
                url: "audio/jdilla/fx-1.wav"
            },
            {
                keyCode: 82,
                keyTrigger: "R",
                id: "fx-2",
                url: "audio/jdilla/fx-2.wav"
            },
            {
                keyCode: 65,
                keyTrigger: "A",
                id: "hh-1",
                url: "audio/madlib/hh-1.wav"
            },
            {
                keyCode: 83,
                keyTrigger: "S",
                id: "hh-2",
                url: "audio/jdilla/hh-2.wav"
            },
            {
                keyCode: 68,
                keyTrigger: "D",
                id: "snare-1",
                url: "audio/jdilla/snare-1.wav"
            },
            {
                keyCode: 70,
                keyTrigger: "F",
                id: "snare-2",
                url: "audio/jdilla/snare-2.wav"
            },
            {
                keyCode: 90,
                keyTrigger: "Z",
                id: "shaker-1",
                url: "audio/jdilla/shaker-1.wav"
            },
            {
                keyCode: 88,
                keyTrigger: "X",
                id: "sshaker-2",
                url: "audio/jdilla/shaker-2.wav"
            },
            {
                keyCode: 67,
                keyTrigger: "C",
                id: "vox-1",
                url: "audio/jdilla/vox-1.wav"
            },
            {
                keyCode: 86,
                keyTrigger: "V",
                id: "vox-2",
                url: "audio/jdilla/vox-2.wav"
            },

        ];

         

        buttons.addEventListener("change", () => {
            let activeLayout = jDillaLayout;   
        })

        return activeLayout;

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