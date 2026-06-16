const form = document.querySelector(".guestbook-form");
const list = document.getElementById("message-list");

function loadMessages() {

    const messages =
        JSON.parse(
            localStorage.getItem("guestbook")
        ) || [];

    list.innerHTML = "";

    messages.forEach(msg => {

        const card =
            document.createElement("div");

        card.className = "message-card";

        card.innerHTML = `
            <div class="message-header">
                <span class="avatar">👤</span>
                <div>
                    <strong>${msg.name}</strong>
                    <div class="message-time">
                        ${msg.time}
                    </div>
                </div>
            </div>

            <p>${msg.text}</p>
        `;

        list.appendChild(card);

    });

}

loadMessages();

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name =
        form.querySelector("input").value;

    const text =
        form.querySelector("textarea").value;

    if (!name || !text) return;

    const messages =
        JSON.parse(
            localStorage.getItem("guestbook")
        ) || [];

    const now = new Date();

    messages.unshift({
        name,
        text,
        time:
            now.getFullYear() +
            "-" +
            String(now.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(now.getDate()).padStart(2, "0") +
            " " +
            String(now.getHours()).padStart(2, "0") +
            ":" +
            String(now.getMinutes()).padStart(2, "0")
    });

    localStorage.setItem(
        "guestbook",
        JSON.stringify(messages)
    );

    loadMessages();

    form.reset();

});
const clearBtn =
    document.getElementById("clearMessages");

if (clearBtn) {

    clearBtn.addEventListener("click", () => {

        if (
            confirm("确定删除全部留言吗？")
        ) {

            localStorage.removeItem(
                "guestbook"
            );

            loadMessages();

        }

    });

}