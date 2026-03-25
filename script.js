const USERS_API = 'https://jsonplaceholder.typicode.com/users';
const loading = document.getElementById("loading");
const usersBlock = document.getElementById("users-block");

function showUsers() {
    startLoading();
    generateUsersList();
}

function startLoading() {
    document.getElementById('show-users').style.display = "none";
    loading.textContent = "Loading users...";
}

function generateUsersList() {
    fetch(USERS_API)
        .then(response => {
            if (!response.ok) {
                loading.textContent = "Something went wrong!";
                throw new Error("Failed to fetch users");
            }
            return response.json();
        })
        .then(usersData => {
            usersData.slice(0, document.getElementById("users").value).forEach(user => {
                const userCard = document.createElement("div");
                userCard.classList.add("user-card");
                userCard.innerHTML = `<div><i class="fa-solid fa-user"></i><b>${user.name}</b></div>
                                    <div><i class="fa-solid fa-envelope"></i>${user.email}</div>
                                    <div><i class="fa-solid fa-phone"></i>${user.phone}</div>
                                    <div><i class="fa-solid fa-globe"></i>${user.website}</div>
                                    <div><i class="fa-solid fa-building"></i>${user.company.name}</div>`;
                usersBlock.appendChild(userCard);
                usersBlock.classList.add("users-displayed");
            });
            loading.style.display = "none";
        }).catch(error => {
            loading.textContent = "Something went wrong!";
            throw new Error("Failed to fetch users");
        });
    addBackBtn();
}
function addBackBtn() {
    const backBtn = document.getElementById("back");
    backBtn.innerHTML = `<i class="fa-solid fa-chevron-left"></i> Go Back`;
    backBtn.classList.add("back-btn");
    backBtn.addEventListener("click", () => {
        location.reload();
    });
    document.getElementById("container").appendChild(backBtn);
}