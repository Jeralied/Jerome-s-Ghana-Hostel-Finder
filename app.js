const hostels = [

  {
    id: 1,
    name: "Tesano Comfort",
    area: "Tesano",
    price: 2500,
    location: "Near GCTU Gate",
    type: "Self-contain",
    availability: "Available",
    rating: 4.5,
    phone: "233506696454",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 2,
    name: "Abeka VIP",
    area: "Abeka",
    price: 2000,
    location: "Abeka Junction",
    type: "Chamber & Hall",
    availability: "Available",
    rating: 4.2,
    phone: "233506696454",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 3,
    name: "Abelemkpe Luxury",
    area: "Abelemkpe",
    price: 3500,
    location: "Abelemkpe",
    type: "Self-contain",
    availability: "Limited",
    rating: 4.8,
    phone: "233506696454",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 4,
    name: "Achimota Lodge",
    area: "Achimota",
    price: 1800,
    location: "New Station",
    type: "Single Room",
    availability: "Available",
    rating: 4.0,
    phone: "233506696454",
    image: "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 5,
    name: "Staff Area Hostel",
    area: "Tesano",
    price: 3000,
    location: "Tesano Staff Area",
    type: "Chamber & Hall",
    availability: "Available",
    rating: 4.4,
    phone: "233506696454",
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=80"
  }

];


let savedHostels =
  JSON.parse(localStorage.getItem("gctuSavedHostels")) || [];



function display(list, target = "hostelList") {

  const container =
    document.getElementById(target);

  container.innerHTML = "";

  if (list.length === 0) {

    container.innerHTML = `
      <div class="empty">
        <h3>No hostels found</h3>
        <p>Try changing your area or maximum price.</p>
      </div>
    `;

    return;
  }


  list.forEach(hostel => {

    const saved =
      savedHostels.includes(hostel.id);


    const mapsUrl =
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        hostel.location + " " + hostel.area + " Accra Ghana"
      )}`;


    const whatsappUrl =
      `https://wa.me/${hostel.phone}?text=${encodeURIComponent(
        `Hello, I am interested in ${hostel.name} on GCTU Hostel Finder. Is it still available?`
      )}`;


    container.innerHTML += `

      <article class="card">

        <div
          class="card-image"
          style="background-image:url('${hostel.image}')"
        >

          <span class="demo-label">
            DEMO LISTING
          </span>

          <button
            class="favorite"
            onclick="toggleSave(${hostel.id})"
            title="Save hostel"
          >
            ${saved ? "good" : "right"}
          </button>

        </div>


        <div class="card-content">

          <h3>${hostel.name}</h3>

          <p class="location">
             ${hostel.location}, ${hostel.area}
          </p>


          <div class="details">

            <span class="tag">
               ${hostel.type}
            </span>

            <span class="tag">
               ${hostel.rating}
            </span>

            <span class="tag">
               ${hostel.availability}
            </span>

          </div>


          <div class="price">
            GHS ${hostel.price.toLocaleString()}
            <span>/ month</span>
          </div>


          <div class="card-actions">

            <a
              class="map-btn"
              href="${mapsUrl}"
              target="_blank"
            >
               Map
            </a>

            <a
              class="whatsapp-btn"
              href="${whatsappUrl}"
              target="_blank"
            >
               WhatsApp
            </a>

          </div>

        </div>

      </article>

    `;

  });


  updateSavedCount();
}



function filterHostels() {

  const area =
    document.getElementById("areaFilter").value;

  const price =
    document.getElementById("priceFilter").value;


  let filtered = [...hostels];


  if (area !== "all") {

    filtered =
      filtered.filter(
        hostel => hostel.area === area
      );

  }


  if (price !== "") {

    filtered =
      filtered.filter(
        hostel =>
          hostel.price <= Number(price)
      );

  }


  display(filtered);


  document.getElementById("resultCount").textContent =
    `${filtered.length} hostel${filtered.length === 1 ? "" : "s"} found`;

}



function clearFilters() {

  document.getElementById("areaFilter").value = "all";

  document.getElementById("priceFilter").value = "";

  display(hostels);

  document.getElementById("resultCount").textContent =
    `${hostels.length} hostels found`;

}



function toggleSave(id) {

  if (savedHostels.includes(id)) {

    savedHostels =
      savedHostels.filter(
        hostelId => hostelId !== id
      );

  } else {

    savedHostels.push(id);

  }


  localStorage.setItem(
    "gctuSavedHostels",
    JSON.stringify(savedHostels)
  );


  display(hostels);

}



function updateSavedCount() {

  document.getElementById("savedCount").textContent =
    savedHostels.length;

}



function showSaved() {

  document
    .getElementById("savedSection")
    .classList.remove("hidden");


  document
    .getElementById("hostelList")
    .classList.add("hidden");


  const saved =
    hostels.filter(
      hostel => savedHostels.includes(hostel.id)
    );


  display(saved, "savedList");

}



function hideSaved() {

  document
    .getElementById("savedSection")
    .classList.add("hidden");


  document
    .getElementById("hostelList")
    .classList.remove("hidden");


  display(hostels);

}



display(hostels);

document.getElementById("resultCount").textContent =
  `${hostels.length} hostels found`;
