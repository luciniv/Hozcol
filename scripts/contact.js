document.addEventListener('DOMContentLoaded', function() {

    function faqInteraction(){
        var elements = document.getElementsByClassName("faq-title");
        for(var i = 0; i < elements.length; i++){
        elements[i].onclick = function(){

            var divider = this.nextElementSibling;

            var content = divider.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;} 
            else {
                content.style.maxHeight = content.scrollHeight + "px";}

            /* toggle between hiding and showing divider */
            if (divider.style.display == "none") {
                setTimeout(() => { divider.style.display = "block"; }, 250);} 
            else {
                divider.style.display = "none";}

            var arrow = this.getElementsByClassName("faq-arrow")[0];
            arrow.classList.toggle("rotate");
        };
    }}
    faqInteraction();
});