const fetchPositions = () => {
    return fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong!');
        })
}

export default {fetchPositions};
