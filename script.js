const btn = document.getElementById("btn");
const usersBlock = document.getElementById("users-block");

btn.addEventListener("click", () => {
    const usersCount = document.getElementById("users").value;
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            return response.json();
        })
        .then(usersData => {
            usersBlock.innerHTML = "";
            usersBlock.classList.add("users-displayed");
            usersData.slice(0,usersCount).forEach(user => {
                const div = document.createElement("div");
                div.classList.add("user-card");
                div.innerHTML = `<div>${user.name}</div>
                                    <div>${user.email}</div>
                                    <div>${user.phone}</div>
                                    <div>${user.website}</div>
                                    <div>${user.company.name}</div>`;
                usersBlock.appendChild(div);
            })
        });
});
