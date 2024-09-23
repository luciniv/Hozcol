document.addEventListener('DOMContentLoaded', function() {

    function ShowMenu() {
        document.getElementById("menu").classList.toggle("vis");}
    document.getElementById("menu_button").addEventListener("click", ShowMenu);

    function HideLine() {
        setTimeout(() => { document.getElementById("temp-line").classList.add("fade"); }, 1000);
    }
    HideLine();

    let follower = document.getElementById("follower");
    let load = false;
    let confettiPlay = true;
    const onMouseMove = (e) =>{
        var block_height = document.getElementsByClassName("block-1")[0].scrollHeight;
        if (!load) {
            follower.classList.remove("fade");
            load = true;}

        if (e.pageY >= block_height + 110) {
            follower.classList.add("fade");
            follower.style.cursor = "default";
            confettiPlay = false;}
        else {
            follower.classList.remove("fade");
            follower.style.cursor = "none";
            confettiPlay = true;}

        if (e.pageY >= block_height + 300) {
            follower.style.top = block_height + 300 + "px";} 
        else {
            follower.style.top = e.pageY + "px";}
        follower.style.left = e.pageX + "px";}
    document.addEventListener("mousemove", onMouseMove);

    follower.addEventListener("click", () => {
        const rect = follower.getBoundingClientRect();
        // Calculates the horizontal (x) center of the button.
        const x = (rect.left + rect.right) / 2;
        // Calculates the vertical (y) center of the button.
        const y = (rect.top + rect.bottom) / 2;

        if (confettiPlay) {
            confetti({
                origin: { 
                    x: x / window.innerWidth, 
                    y: y / window.innerHeight 
                },
                particleCount: 160,
                spread: 360,
                startVelocity: 20,
                decay: 0.9,
                scale: 0.9,
                // colors: ["#FFFFFF", "#FF5C00", "#0076FF"],
                ticks: 120
            })}
    });

});