document.addEventListener('DOMContentLoaded', function() {

    function aboutInteraction(){
        var elements = document.getElementsByClassName("card-button");
        for(var i = 0; i < elements.length; i++){
        elements[i].onclick = function(){

            const content = this.nextElementSibling;

            if (content.style.maxHeight) {
                content.style.maxHeight = null;} 
            else {
                content.style.maxHeight = content.scrollHeight + "px";}

            if (this.style.bottom == "-18px") {
                this.textContent = "Read more";
                this.style.bottom = "10px"; }
            else {
                this.textContent = "Read less";
                this.style.bottom = "-18px"; }

            const fade = content.firstElementChild.nextElementSibling;
            /* toggle between hiding and showing the fade */
            if (fade.style.display == "none") {
                fade.style.display = "block"; }
            else {
                fade.style.display = "none"; }
        };
    }}
    aboutInteraction();
});