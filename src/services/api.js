import axios from 'axios';

const baseUrl = 'https://api.dev-example.com/v2a'; // Replace this with real end point later

function constructAuthorizationHeader() {
    const idToken = sessionStorage.getItem('id_token');
    return {
        headers: {
            Authorization: idToken,
        }
    }
}

const Api = {
    sessions: {
        signIn(email, password) {
            return axios.post(`${baseUrl}/sessions`, {
                email,
                password,
            });
        },

        signOut() {
            return axios.delete(`${baseUrl}/sessions`, {
                // This endpoint is not yet implemented on the API
            });
        }
    },

    zones: {
        // Get list of zones, with an optional search term
        get(applicationId, searchTerm) {
            let url = `${baseUrl}/zones?applicationId=${applicationId}`;

            if (searchTerm) {
                url = `${url}&fuzzySearch=${searchTerm}`;
            }

            return axios.get(url, constructAuthorizationHeader());
        },

        // Get a single zone for the zone management page
        getSingle(id) {
            const getZoneURL = `${baseUrl}/zones/${id}`;
            return axios.get(getZoneURL, constructAuthorizationHeader())
        },

        add(zoneData) {
            return axios.post(`${baseUrl}/zones`, zoneData, constructAuthorizationHeader());
        },

        update(updateZoneData) {
            const id = updateZoneData._id;
            return axios.put(`${baseUrl}/zones/${id}`, updateZoneData , constructAuthorizationHeader());
        },

        delete(id) {
            return axios.delete(`${baseUrl}/zones/${id}`, constructAuthorizationHeader());
        },
    }
};

export default Api;
