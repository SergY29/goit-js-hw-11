import axios from 'axios';

const KEY_API = '31232052-ebca7977e423ff0aad3113109';
const URL = 'https://pixabay.com';
const params = {
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
};

async function fetchPictures(inputValue) {
    try {
        const response = await axios.get(`${URL}/api/?key=${KEY_API}&q=${inputValue}`, { params },);
        return response.data.hits;
    } catch (error) {
        console.error(error);
    }


}

export { fetchPictures };
