const userListEl = document.querySelector(".user-list");

async function fetchUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  const limitedUsers = [...users, ...Array(10).fill(null)].slice(0, 10);
  userListEl.innerHTML = limitedUsers.map(user => userHTML(user)).join("");
}

document.getElementById("searchId").addEventListener("input", (event) => {
  const value = event.target.value;
  if (value >= 1 && value <= 10) {
    loadPosts(value); // or whatever your fetching function is
  }
});

function showUserPosts(id) {
  localStorage.setItem("id", id);
  window.location.href = `${window.location.origin}/user.html`;
}

function userHTML(user) {
  return `
    <div class="user-card" onclick="showUserPosts(${user.id})">
      <div class="user-card_container">
        <h3>${user.name}</h3>
        <p><b>Email:</b> ${user.email}</p>
        <p><b>Phone:</b> ${user.phone}</p>
        <p><b>Website:</b> <a href="https://${user.website}" target="_blank">${user.website}</a></p>
      </div>
    </div>
  `;
}

fetchUsers(); // ✅ Call this instead of main()