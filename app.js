const auth = '563492ad6f91700001000001d6af08b83ea64320bca28e7ca9302051';
const baseURL = 'https://api.pexels.com/v1/curated';
const divGallerry = document.querySelector('.gallery');

async function curatedPhotos() {
	const result = await fetch(baseURL, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Authorization: auth,
		},
	});
	const data = await result.json();
	data.photos.forEach((photo) => {
		const galleryImg = document.createElement('div');
		galleryImg.classList.add('gallery-img');
		galleryImg.innerHTML = `<img src="${photo.src.large}"></img>`;
		divGallerry.appendChild(galleryImg);
	});
}

curatedPhotos();
