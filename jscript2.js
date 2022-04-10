const madlibLayout = [{
    keyCode: 49,
    keyTrigger: "1",
    id: "kick-1",
    name: "Kick 1",
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

let screenOutput = document.getElementById("mpc__screen")

function createVents() {
    for (let i = 0; i < 28; i++) {
        mpcVent = document.createElement("div");
        mpcVent.classList.add("mpc__vent");
        document.getElementById("mpc__vents").appendChild(mpcVent);
    }

};

function chooseBank(madlibLayout, jDillaLayout, screenOutput) {
    const slider = document.getElementById("bankSlider");
     


    createPads(madlibLayout, screenOutput);
    slider.addEventListener("change", () => {
        if(slider.checked) {
            clearPads();
            screenOutput.innerHTML = "J Dilla Pack Enabled"
            createPads(jDillaLayout, screenOutput);
        } else {
            clearPads();
            screenOutput.innerHTML = "Madlib Pack Enabled"
            createPads(madlibLayout, screenOutput);
        }

    })

    

}

function _triggerSound(audio) {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
};


function createPads(padLayout, screenOutput) {
const fragment = document.createDocumentFragment();





padLayout.forEach(pad => {
    
    const padElement = document.createElement("button");
    const insertLineBreak = ["4", "R", "F", "V"].indexOf(pad.keyTrigger) !== -1;

    padElement.setAttribute("type", "button");
    padElement.classList.add("mpc__pad");
    padElement.innerText = pad.keyTrigger;

    let audio = document.getElementById(pad.keyTrigger);
    audio.src = pad.url;

    

    padElement.addEventListener("click", () => {
        padElement.classList.add("mpc__pad--active");
        setTimeout(() => padElement.classList.remove("mpc__pad--active"), 100);
        screenOutput.innerHTML = pad.id;
        this._triggerSound(audio);
    })

    window.addEventListener("keydown", (e) => {
        if (e.keyCode === pad.keyCode) {
            padElement.classList.add("mpc__pad--active");
            setTimeout(() => padElement.classList.remove("mpc__pad--active"), 100);
            screenOutput.innerHTML = pad.id;
            this._triggerSound(audio);
        }

    })


    fragment.appendChild(padElement);

    if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
    }

});
document.getElementById("mpc__pads").appendChild(fragment);
}

function clearPads() {
    let element = document.getElementById("mpc__pads");
while (element.firstChild) {
  element.removeChild(element.firstChild);
}

}


window.addEventListener("DOMContentLoaded", function () {
    createVents();
    chooseBank(madlibLayout, jDillaLayout, screenOutput);
    

});