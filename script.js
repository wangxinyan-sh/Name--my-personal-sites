// =====================
// Wangxinyan Personal Website 3.0
// =====================

// 返回顶部按钮
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

if(topBtn){
    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// 页面加载动画
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

// 导航平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if(target){
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// 留言板演示功能
const messageBtn = document.getElementById("messageBtn");

if(messageBtn){

    messageBtn.addEventListener("click", () => {

        const name =
            document.querySelector(".message-box input")
            ?.value || "";

        const text =
            document.querySelector(".message-box textarea")
            ?.value || "";

        if(name === "" || text === ""){

            alert("请先填写姓名和留言内容");

            return;
        }

        alert(
            "感谢留言，未来版本将支持在线保存留言！"
        );
    });
}

// 项目卡片弹窗
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

document.querySelectorAll(".project-card").forEach(card => {

    card.addEventListener("click", () => {

        const title =
            card.querySelector("h3")?.innerText || "项目";

        const content =
            card.querySelector("p")?.innerText || "";

        modalTitle.innerText = title;
        modalContent.innerText = content;

        modal.style.display = "flex";
    });

});

if(closeModal){

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

}

window.addEventListener("click", e => {

    if(e.target === modal){

        modal.style.display = "none";

    }

});

// 滚动出现动画
const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

document.querySelectorAll(
    ".section,.card,.project-card,.photo-card"
).forEach(el => {

    observer.observe(el);

});
const preview = document.getElementById("imagePreview");
const previewImg = document.getElementById("previewImg");
const closePreview = document.getElementById("closePreview");

document.querySelectorAll(".gallery-card img").forEach(function(img) {
    img.addEventListener("click", function() {
        if (preview && previewImg) {
            previewImg.src = this.src;
            preview.style.display = "flex";
        }
    });
});

if (closePreview) {
    closePreview.addEventListener("click", function() {
        preview.style.display = "none";
    });
}

if (preview) {
    preview.addEventListener("click", function(e) {
        if (e.target === preview) {
            preview.style.display = "none";
        }
    });
}
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
}