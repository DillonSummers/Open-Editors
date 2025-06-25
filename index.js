const userListEl = document.querySelector(".user-list");

async function fetchUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  const limitedUsers = users.slice(0, 10); // only first 10 users
  userListEl.innerHTML = limitedUsers.map(user => userHTML(user)).join("");
}

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