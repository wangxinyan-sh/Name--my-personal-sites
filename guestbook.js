const form = document.querySelector(".guestbook-form");

const list = document.getElementById("message-list");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const name =
    form.querySelector("input").value;

    const text =
    form.querySelector("textarea").value;

    const card =
    document.createElement("div");

    card.className = "message-card";

    card.innerHTML = `
        <strong>${name}</strong>
        <p>${text}</p>
    `;

    list.prepend(card);

    form.reset();

});