const btn = document.getElementById("btn");
const usersBlock = document.getElementById("users-block");

btn.addEventListener("click", () => {
    const usersCount = document.getElementById("users").value;
    usersBlock.innerHTML = "";
    const loading = document.createElement("p");
    loading.textContent = "Loading users...";
    usersBlock.appendChild(loading);
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
                const userCard = document.createElement("div");
                userCard.classList.add("user-card");
                userCard.innerHTML = `<div><i class="fa-solid fa-user"></i><b>${user.name}</b></div>
                                    <div><i class="fa-solid fa-envelope"></i>${user.email}</div>
                                    <div><i class="fa-solid fa-phone"></i>${user.phone}</div>
                                    <div><i class="fa-solid fa-globe"></i>${user.website}</div>
                                    <div><i class="fa-solid fa-building"></i>${user.company.name}</div>`;
                usersBlock.appendChild(userCard);
            });
            const backBtn = document.createElement("button");
            backBtn.innerHTML = `<i class="fa-solid fa-chevron-left"></i> Go Back`;
            backBtn.classList.add("back-btn");
            backBtn.addEventListener("click", () => {
                location.reload();
            });
            usersBlock.appendChild(backBtn);
        });
});
