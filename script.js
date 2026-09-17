const recommendations = [
  {
    title: "Maldives Beach",
    category: "beaches",
    tag: "Beach",
    description: "Crystal-clear water, white sand, and luxury island vibes make this a perfect getaway.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Bali Coast",
    category: "beaches",
    tag: "Beach",
    description: "A tropical paradise with surfing spots, sunsets, and relaxing beach clubs.",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Buddhist Temple",
    category: "temples",
    tag: "Temple",
    description: "A serene spiritual destination filled with culture, calm, and beautiful architecture.",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Ancient Temple Complex",
    category: "temples",
    tag: "Temple",
    description: "Explore grand stone structures and centuries-old rituals in this peaceful escape.",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Italy",
    category: "countries",
    tag: "Country",
    description: "Known for history, food, art, and romantic cities that inspire every traveler.",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Japan",
    category: "countries",
    tag: "Country",
    description: "Blend tradition and innovation with temples, landscapes, and futuristic cities.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80"
  }
];

const grid = document.getElementById("recommendationGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const heroButtons = document.querySelectorAll("[data-filter]");

let activeFilter = "all";

function renderCards() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filtered = recommendations.filter(item => {
    const matchesFilter = activeFilter === "all" || item.category === activeFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.tag.toLowerCase().includes(searchTerm);

    return matchesFilter && matchesSearch;
  });

  if (!filtered.length) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; background: white; border: 1px solid #e5e7eb; border-radius: 18px; padding: 32px; text-align: center; color: var(--muted);">
        No matching recommendations found.
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => `
    <article class="card">
      <img src="${item.image}" alt="${item.title}" />
      <div class="card-body">
        <span class="tag">${item.tag}</span>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    </article>
  `).join("");
}

function setActiveFilter(filterValue) {
  activeFilter = filterValue;

  filterButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.filter === filterValue);
  });

  heroButtons.forEach(btn => {
    if (btn.dataset.filter === filterValue) {
      btn.classList.remove("btn-secondary");
      btn.classList.add("btn-primary");
    } else {
      btn.classList.add("btn-secondary");
      btn.classList.remove("btn-primary");
    }
  });

  renderCards();
}

searchInput.addEventListener("input", renderCards);

filterButtons.forEach(button => {
  button.addEventListener("click", () => setActiveFilter(button.dataset.filter));
});

heroButtons.forEach(button => {
  button.addEventListener("click", () => setActiveFilter(button.dataset.filter));
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you! Your message has been sent successfully.");
  this.reset();
});

renderCards();
