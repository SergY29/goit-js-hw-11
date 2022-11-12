import axios from 'axios';

const KEY_API = '31232052-ebca7977e423ff0aad3113109';
const URL = 'https://pixabay.com';
const params = {
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    per_page: 40,
    page: 1,
};



async function fetchPictures(inputValue) {
    let maxQuery = params.page * params.per_page;
    // console.log(maxQuery);

    try {
        const response = await axios.get(`${URL}/api/?key=${KEY_API}&q=${inputValue}`, { params },);
        params.page += 1;
        // console.log(response.data);
        // console.log(response.data.totalHits);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

function resetPage() {
    params.page = 1;
}

export { fetchPictures, resetPage };
