document.querySelectorAll(".like-btn").forEach(button => {
    const id = button.dataset.id;
    const key = "like_" + id;
    const span = button.querySelector("span");

    let count = Number(localStorage.getItem(key)) || 0;
    span.textContent = count;

    button.addEventListener("click", () => {
        count++;
        localStorage.setItem(key, count);
        span.textContent = count;
    });
});

document.querySelectorAll(".fav-btn").forEach(button => {
    const id = button.dataset.id;
    const key = "fav_" + id;

    if (localStorage.getItem(key) === "yes") {
        button.classList.add("active");
        button.textContent = "⭐ 已收藏";
    }

    button.addEventListener("click", () => {
        if (localStorage.getItem(key) === "yes") {
            localStorage.removeItem(key);
            button.classList.remove("active");
            button.textContent = "⭐ 收藏";
        } else {
            localStorage.setItem(key, "yes");
            button.classList.add("active");
            button.textContent = "⭐ 已收藏";
        }
    });
});

document.querySelectorAll(".share-btn").forEach(button => {
    button.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            button.textContent = "✅ 已复制";
            setTimeout(() => {
                button.textContent = "🔗 复制链接";
            }, 1500);
        } catch {
            alert("复制失败，请手动复制网址。");
        }
    });
});