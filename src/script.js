let i = 0; // Declare i outside to persist its value
let result = []; // Store fetched repositories here

const select_lang = document.getElementById("select-lang");
const repoContent = document.getElementById("repo-content");
const forks_count = document.getElementById("fork");
const stars_count = document.getElementById("star");
const issues = document.getElementById("issue");
const description = document.getElementById("desc");
const repo_name = document.getElementById("repo-name");
const language = document.getElementById("language");
const refresh = document.getElementById("refresh");

// Fetch repos when language is selected
select_lang.addEventListener("change", async (e) => {
  const lang = e.target.value;
  result = await getRepo(lang); // Fetch the repositories for the selected language
  i = 0; // Reset index when a new language is selected
  displayRepo(result[i]); // Display the first repository
});

// Refresh button to cycle through repos
refresh.addEventListener("click", () => {
  increment(result.length); // Update index
  displayRepo(result[i]); // Display the repository based on the new index
});

// Function to fetch repositories by language
async function getRepo(lang) {
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=language:${lang}`
    );
    const data = await response.json();
    return data["items"];
  } catch (e) {
    console.log("Error fetching data", e);
  }
}

// Function to increment the index and reset if necessary
function increment(len) {
  if (i < len - 1) {
    i++;
  } else {
    i = 0;
  }
}

// Function to display the selected repository's details
function displayRepo(item) {
  if (item) {
    repoContent.classList.remove("hidden");
    repo_name.textContent = item["name"];
    forks_count.textContent = item["forks_count"];
    stars_count.textContent = item["watchers_count"];
    issues.textContent = item["open_issues_count"];
    description.textContent = item["description"];
    language.textContent = item["language"];
  }
}
