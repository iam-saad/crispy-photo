const auth = '563492ad6f91700001000001d6af08b83ea64320bca28e7ca9302051';
const baseURL = 'https://api.pexels.com/v1/curated';
const queryURL = 'https://api.pexels.com/v1/search?query=';
const divGallery = document.querySelector('.gallery');
const input = document.querySelector('.search');
const searchBtn = document.querySelector('.search-btn');
const moreBtn = document.querySelector('.more');
let searchValue;
let nextPage;

const showImages = (data) => {
	console.log(data);
	nextPage = data.next_page;
	data.photos.forEach((photo) => {
		const galleryImg = document.createElement('div');
		galleryImg.classList.add('gallery-img');
		galleryImg.innerHTML = `
    <img src="${photo.src.large}"></img>
    <div class="gallery-info">
    <p>${photo.photographer}</p>
    <a href=${photo.src.original} target="_blank">Download</a>
    </div>
    `;
		divGallery.appendChild(galleryImg);
	});
};

const clear = () => {
	divGallery.innerHTML = '';
};

async function fetchAPI(URL) {
	const result = await fetch(URL, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Authorization: auth,
		},
	});
	const data = await result.json();
	return data;
}

async function getImages(URL = baseURL) {
	const data = await fetchAPI(URL);
	showImages(data);
}

searchBtn.addEventListener('click', (e) => {
	e.preventDefault();
	if (!input.value) {
		alert('Nothing to Search');
	} else {
		clear();
		getImages(queryURL + input.value);
		input.value = '';
	}
});

moreBtn.addEventListener('click', () => {
	getImages(nextPage);
});

getImages();
