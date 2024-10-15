document.addEventListener('DOMContentLoaded', function() {

    function ShowMenu() {
        document.getElementById("menu").classList.toggle("vis");}
    document.getElementById("menu_button").addEventListener("click", ShowMenu);

    function HideLine() {
        setTimeout(() => { document.getElementById("temp-line").classList.add("fade"); }, 1000);
    }
    HideLine();

    const canvas = document.getElementById("wave-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let waves = [];
    // Function to create random waves near the bottom
    function createWaves() {
        waves.push({
            y: canvas.height - 220,
            amplitude: 20, 
            frequency: 0.003, 
            phase: 1000,
            speed: 2, 
            color: 'rgba(255, 92, 0, 1)',
            filled: true
        });
        waves.push({
            y: canvas.height - 180,
            amplitude: 20, 
            frequency: 0.003, 
            phase: 1300,
            speed: 2, 
            color: 'rgba(255, 92, 0, 1)',
            filled: false
        });
        waves.push({
            y: canvas.height - 140,
            amplitude: 20, 
            frequency: 0.003, 
            phase: 1200,
            speed: 3, 
            color: 'rgba(0, 118, 255, 1)',
            filled: true
        });
        waves.push({
            y: canvas.height - 100,
            amplitude: 20, 
            frequency: 0.003, 
            phase: 1400,
            speed: 3, 
            color: 'rgba(0, 118, 255, 1)',
            filled: false
        });
    }
    function drawWaves() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        for (const wave of waves) {
            ctx.beginPath();
            for (let x = 0; x < canvas.width; x++) {
                const y = wave.y + Math.sin(wave.frequency * (x + wave.phase)) * wave.amplitude;
                ctx.lineTo(x, y);
            }
            // Close the path and fill or stroke based on wave type
            if (wave.filled) {
                ctx.lineTo(canvas.width, canvas.height); 
                ctx.lineTo(0, canvas.height); 
                ctx.closePath(); 

                // Create gradient for filled waves
                const gradient = ctx.createLinearGradient(0, wave.y, 0, wave.y + 200);
                gradient.addColorStop(0, wave.color); 
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); 
                ctx.fillStyle = gradient; 
                ctx.fill(); 
            } else {
                ctx.strokeStyle = wave.color; 
                ctx.lineWidth = 3; 
                ctx.stroke(); 
            }
            wave.phase += wave.speed; 
        }
    }
    function animate() {
        drawWaves();
        requestAnimationFrame(animate);
    }
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('fullscreenchange', resizeCanvas);
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        waves = [];
        createWaves();
    }
    createWaves();
    animate();
    setTimeout(() => { canvas.style.opacity = 1; }, 500);

    const follower = document.getElementById("follower");
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