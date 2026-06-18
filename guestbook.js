const ADMIN_PASSWORD = "xinyan2026";
const form = document.querySelector(".guestbook-form");
const list = document.getElementById("message-list");

function getMessages() {
    return JSON.parse(localStorage.getItem("guestbook")) || [];
}

function saveMessages(messages) {
    localStorage.setItem("guestbook", JSON.stringify(messages));
}

function loadMessages() {
    const messages = getMessages();
    list.innerHTML = "";

    messages.forEach((msg, index) => {
        const card = document.createElement("div");
        card.className = "message-card";

        const repliesHtml = (msg.replies || []).map(reply => `
            <div class="reply-card">
                <strong>${reply.name}</strong>
                <span>${reply.time}</span>
                <p>${reply.text}</p>
            </div>
        `).join("");

        card.innerHTML = `
            <div class="message-header">
                <span class="avatar">👤</span>
                <div>
                    <strong>${msg.name}</strong>
                    <div class="message-time">${msg.time}</div>
                </div>
            </div>

            <p>${msg.text}</p>

            <div class="message-actions">

            <button class="reply-toggle"
            data-index="${index}">
            回复
            </button>
            
            <button class="delete-message"
            data-index="${index}">
            删除
            </button>
            
            </div>

            <div class="reply-form" id="reply-form-${index}">
                <input type="text" placeholder="你的名字">
                <textarea placeholder="写下你的回复..."></textarea>
                <button class="reply-submit" data-index="${index}">
                    提交回复
                </button>
            </div>

            <div class="reply-list">
                ${repliesHtml}
            </div>
        `;

        list.appendChild(card);
    });
}

function getTime() {
    const now = new Date();

    return (
        now.getFullYear() +
        "-" +
        String(now.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(now.getDate()).padStart(2, "0") +
        " " +
        String(now.getHours()).padStart(2, "0") +
        ":" +
        String(now.getMinutes()).padStart(2, "0")
    );
}

loadMessages();

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.querySelector("input").value.trim();
    const text = form.querySelector("textarea").value.trim();

    if (!name || !text) {
        alert("请填写名字和留言内容");
        return;
    }

    const messages = getMessages();

    messages.unshift({
        name: name,
        text: text,
        time: getTime(),
        replies: []
    });

    saveMessages(messages);
    loadMessages();
    form.reset();
});

list.addEventListener("click", function (e) {
    if (e.target.classList.contains("reply-toggle")) const pwd = prompt("请输入管理员密码");

    if (pwd !== ADMIN_PASSWORD) {
        alert("密码错误");
        return;
    }{
        const index = e.target.dataset.index;
        const replyForm = document.getElementById("reply-form-" + index);

        replyForm.classList.toggle("active");
    }

    if (e.target.classList.contains("reply-submit")) {
        const index = e.target.dataset.index;
        const replyForm = document.getElementById("reply-form-" + index);

        const name = replyForm.querySelector("input").value.trim();
        const text = replyForm.querySelector("textarea").value.trim();

        if (!name || !text) {
            alert("请填写名字和回复内容");
            return;
        }

        const messages = getMessages();

        if (!messages[index].replies) {
            messages[index].replies = [];
        }

        messages[index].replies.push({
            name:"👑 王昕琂（站长）",
            text:text,
            time:getTime()
        });
        

        saveMessages(messages);
        loadMessages();
    
    } 
});   


const clearBtn = document.getElementById("clearMessages");

if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        if (confirm("确定删除全部留言吗？")) {
            localStorage.removeItem("guestbook");
            loadMessages();
        }
    });
}
if (
    e.target.classList.contains("delete-message")
) {

    const pwd =
    prompt("管理员密码");

    if (pwd !== ADMIN_PASSWORD) {
        alert("密码错误");
        return;
    }

    const index =
    e.target.dataset.index;

    const messages =
    getMessages();

    messages.splice(index,1);

    saveMessages(messages);

    loadMessages();
}