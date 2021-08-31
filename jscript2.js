function init() {
    for (let i = 0; i < 28; i++) {
        mpcVent = document.createElement("div");
        mpcVent.classList.add("mpc__vent");
        document.getElementById("mpc__vents").appendChild(mpcVent);
    }

};

window.addEventListener("DOMContentLoaded", function () {
    init();

});