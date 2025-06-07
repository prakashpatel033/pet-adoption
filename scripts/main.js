document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');

    // Toggle menu visibility when button is clicked
    button.addEventListener('click', function() {
        menu.classList.toggle('hidden');
        const expanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', !expanded);
    });

    // Close the menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!button.contains(event.target) && !menu.contains(event.target)) {
            menu.classList.add('hidden');
            button.setAttribute('aria-expanded', 'false');
        }
    });
});

//
function scrollToShop() {
    document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
}



//active btn functionality

const removeActiveClass = () =>{
    const buttons = document.getElementsByClassName("category-btn");
    for(let btn of buttons){
        btn.classList.remove('active');
    }
}

//Fetch categories

const loadCategories =()=>{
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then(res=>res.json())
    .then(data=>displayCategories(data.categories))
    .catch(error=>console.log(error))
}

//display categories

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories');
    categoryContainer.innerHTML = ''; // Clear previous content

    categories.forEach(pet => {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'flex'; // Ensure proper grid behavior
        buttonContainer.innerHTML = `
            <button id ="btn-${pet.category}" onclick="loadCategoriesPet('${pet.category}')" class="category-btn w-full flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 p-3 md:p-4 bg-white rounded-xl hover:rounded-full border border-gray-200 hover:border-teal-600 hover:bg-teal-50 transition-all duration-300 shadow-sm hover:shadow-md group">
                <img class="w-8 h-8 md:w-10 md:h-10 flex-shrink-0 object-contain transition-all duration-300 group-hover:scale-110" 
                     src="${pet.category_icon}" 
                     alt="${pet.category} icon">
                <span class="text-sm md:text-base font-medium text-gray-700 group-hover:text-teal-800">
                    ${pet.category}
                </span>
            </button>
        `;
        categoryContainer.appendChild(buttonContainer);
    });
};


// Fetch Pets by Category
const loadCategoriesPet = (categoryId) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryId}`)
    .then(res => res.json())
    .then(data => {
        removeActiveClass();
        const activeBtn = document.getElementById(`btn-${categoryId}`);

        activeBtn.classList.add('active');
        displayAllPets(data.data);
    })
    .catch(error => console.log(error));
};

//fetch pets detail

const loadDetails = async (pet) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${pet}`);
        const data = await res.json();
        displayDetails(data.petData);
    } catch (error) {
        console.error('Error loading details:', error);
    }
};

const displayDetails = (petData) =>{
    // console.log(petData)
    const detailsContainer = document.getElementById('modal-content');
    detailsContainer.innerHTML =`
    <img class="object-cover rounded-lg w-full" src =${petData.image}/>
   
    <div class="flex justify-between my-5">
            <h3 class="text-xl font-semibold text-teal-600">${petData.pet_name}</h3>
            <span class="badge px-3 py-2  ${petData.gender === 'Male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'} rounded-full text-sm">
                ${petData.gender}
            </span>
        </div>

   <p class="text-teal-800">Vaccinated: <span class="font-medium">${petData.vaccinated_status}</span></p>

    <p class="text-sm text-justify">${petData.pet_details}</p>
    `

    document.getElementById('customModal').showModal();

}

//fetch all pets

let allPets = [];
let ascendingOrder = true;

const loadAllPets =()=>{
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then((res)=>res.json())
    .then((data)=>{
        allPets = data.pets;
        displayAllPets(allPets)
    })
    .catch((error)=>{
        console.error(error);
        document.getElementById('pet-cards').innerHTML =`
        <p class="text-red-500 my-5 text-2xl font-bold text-center col-span-full">OOPS! Failed To Load Pets.Please Try Again</p>
        `
    })
}

//display all pets
const displayAllPets =(pets)=>{
    const petContainer = document.getElementById('pet-cards');
    petContainer.innerHTML = '';
    if(pets.length === 0){
        petContainer.classList.remove("grid");
        petContainer.innerHTML = `
        <div class ="min-h-[500px] flex flex-col justify-center items-center shadow-lg rounded-lg bg-gray-100 p-20">
        <img src ="images/error.webp"/>
        <h2 class ="md:text-4xl text-2xl font-extrabold text-center my-5">No Information Available</h2>
        <p class="text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
                its layout. The point of using Lorem Ipsum is that it has a.</p>
        </div>
        `
    }

    else{
        petContainer.classList.add("grid")
    }
 pets.forEach ((pet)=>{
    // console.log(pet)
    const card = document.createElement('div');
    card.className = 'card bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300';
    card.innerHTML = `
    <figure class="relative aspect-square overflow-hidden rounded-t-xl">
        <img class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            src="${pet.image}"
            alt="${pet.pet_name} - ${pet.breed}"
            loading="lazy">
    </figure>
    <div class="card-body p-4 md:p-6">
        <div class="flex items-start justify-between">
            <h3 class="text-xl font-semibold text-gray-800">${pet.pet_name}</h3>
            <span class="badge px-3 py-1 ${pet.gender === 'Male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'} rounded-full text-sm">
                ${pet.gender}
            </span>
        </div>
        
        <div class="space-y-2 mt-2">
            <p class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                ${pet.breed}
            </p>
            <p class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                </svg>
                ${new Date(pet.date_of_birth).toLocaleDateString()}
            </p>
            <p class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/>
                </svg>
                $${pet.price}
            </p>
        </div>

        <div class="mt-4 flex justify-end gap-2">
            <button onclick="updateSideGallery('${pet.image}')" class="btn btn-sm btn-ghost text-teal-600 hover:bg-teal-50">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
            </button>
           <button onclick="loadDetails(${pet.petId})" class="btn btn-sm bg-teal-600 hover:bg-teal-700 text-white px-4">
                details
            </button>
            <button class="btn btn-sm bg-teal-600 hover:bg-teal-700 text-white px-4">
                Adopt Now
            </button>
        </div>
    </div>
`;

    petContainer.appendChild(card)
 })
};

// handle Sort Change By Price
const handleSortChangeByPrice=(selectElement)=>{
    const selectedValue = selectElement.value;

    if(selectedValue === 'lowToHigh'){
        const sortedPets = [...allPets].sort((a,b)=>a.price-b.price);
        displayAllPets(sortedPets);
    }
    else if(selectedValue === 'highToLow'){
        const sortedPets = [...allPets].sort((a,b)=>b.price-a.price);
        displayAllPets(sortedPets);
    }
    
    selectElement.selectIndex = 0;
};

// upDate Side gallery

const updateSideGallery =(imageUrl)=>{
    const sideGallery = document.getElementById('side-gallery');
    //check if the image already exists in the gallery 
    if([...sideGallery.children].some(img => img.src === imageUrl)){
        return ; //if exists, don't add duplicate
    }

    //create image element

    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.className = "w-full h-auto rounded-lg shadow-md transition-transform duration-300 hover:scale-105";
    sideGallery.appendChild(imageElement);
}






loadCategories();
loadAllPets();

