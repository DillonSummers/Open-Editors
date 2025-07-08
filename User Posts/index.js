const userListEl = document.querySelector(".user-list");

// Make the function globally accessible
window.showUserPosts = function(id) {
  localStorage.setItem("id", id);
  window.location.href = "user.html";
};

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

async function fetchUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error("Network response was not ok");
    const users = await response.json();
    const limitedUsers = users.slice(0, 10);
    userListEl.innerHTML = limitedUsers.map(user => userHTML(user)).join("");
  } catch (error) {
    userListEl.innerHTML = "<p>Failed to load users. Please try again later.</p>";
    console.error("Fetch error:", error);
  }
}

// ✅ Call the fetch function
fetchUsers();