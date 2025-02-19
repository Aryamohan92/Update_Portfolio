//Source:
//1.Create a Scroll To Top Button Using Pure HTML & CSS & Javascript
//https://youtu.be/6eRwCRPy7Tc?si=9CjSymEUGMgXMViQ

//get the button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

//Show the button when the user scrolls down  from the top
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

//Scroll to the top when the button is clicked
scrollToTopBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
};


//Source:
//2.Show and Hide (toggle Element) Tutorial - JavaScript and HTML
//https://youtu.be/1YczTmDCIBY?si=eT8vfHB8Ian-k-Vz

document.querySelectorAll('.toggle-button').forEach(button => {
    button.addEventListener('click', () => {
        const target = document.getElementById(button.dataset.target);
        if (target.style.display === "none" || target.style.display === "") {
            target.style.display = "block";
        } else {
            target.style.display = "none";
        }
    });
});
