
const postUser = (token: string, formData: FormData) => {
    return fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users',
        {
            method: 'POST',
            body: formData,
            headers: {
                'Token': token, // get token with GET api/v1/token method }, }) .then(function(response) { return response.json(); }) .then(function(data) { console.log(data); if(data.success) { // process success response } else { // proccess server errors } }) .catch(function(error) { // proccess network errors });
            }
        })
}
const fetchToken = () => {
    return fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                return data.token;
            }
        })
}

export default {fetchToken, postUser};
