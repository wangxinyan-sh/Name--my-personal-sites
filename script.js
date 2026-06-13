console.log("Wangxinyan Personal Website loaded.");

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

topBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const sections = document.querySelectorAll(".section");

sections.forEach(function (section) {
    section.classList.add("reveal");
});

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, {
    threshold: 0.15
});

sections.forEach(function (section) {
    observer.observe(section);
});

const messageButton = document.querySelector(".message-box button");

messageButton.addEventListener("click", function () {
    alert("这是静态留言板，后续可以升级为真实留言功能。");
});