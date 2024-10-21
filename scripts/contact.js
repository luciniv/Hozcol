document.addEventListener('DOMContentLoaded', function() {

    (function () {
    "use strict";
    // Form Validation
    // Fetch all the forms we want to apply custom validation styles to
    const forms = document.querySelectorAll(".needs-validation");
    const result = document.getElementById("result");

    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
        "submit",
        function (event) {
            if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();

            form.querySelectorAll(":invalid")[0].focus();
            } else {
            const formData = new FormData(form);
            event.preventDefault();
            event.stopPropagation();
            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });
            const json = JSON.stringify(object);
            result.innerHTML = "Please wait...";

            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
                },
                body: json
            })
                .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.innerHTML = json.message;
                    // result.classList.remove("text-gray-500");
                    // result.classList.add("text-green-500");
                } else {
                    console.log(response);
                    result.innerHTML = json.message;
                    result.classList.remove("text-gray-500");
                    result.classList.add("text-red-500");
                }
                })
                .catch((error) => {
                console.log(error);
                result.innerHTML = "Something went wrong!";
                })
                .then(function () {
                form.reset();
                form.classList.remove("was-validated");
                setTimeout(() => {
                    result.style.display = "none";
                }, 5000);
                });
            }
            form.classList.add("was-validated");
        },
        false
        );
    });
    })();

    function faqInteraction(){
        var elements = document.getElementsByClassName("faq-title");
        for(var i = 0; i < elements.length; i++){
        elements[i].onclick = function(){

            const divider = this.nextElementSibling;

            const content = divider.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;} 
            else {
                content.style.maxHeight = content.scrollHeight + "px";}

            /* toggle between hiding and showing divider */
            if (divider.style.display == "none") {
                setTimeout(() => { divider.style.display = "block"; }, 250);} 
            else {
                divider.style.display = "none";}

            const arrow = this.getElementsByClassName("faq-arrow")[0];
            arrow.classList.toggle("rotate");
        };
    }}
    faqInteraction();
});