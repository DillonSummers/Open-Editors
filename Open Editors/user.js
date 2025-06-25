const postContainer = document.querySelector(".post-card-container");
const searchInput = document.getElementById("searchId");

// Load user ID from localStorage
let userId = localStorage.getItem("id") || 1;

// Fetch and display posts for that user
async function loadPosts(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
  const posts = await res.json();
  postContainer.innerHTML = posts.map(post => `
    <div class="post">
      <div class="post-title">${post.title}</div>
      <div class="post-body">${post.body}</div>
    </div>
  `).join("");
}

function goBack() {
  window.location.href = "index.html";
}

// Listen for input changes to filter by ID
searchInput.addEventListener("input", () => {
  const id = searchInput.value;
  if (id) {
    loadPosts(id);
  }
});

loadPosts(userId);