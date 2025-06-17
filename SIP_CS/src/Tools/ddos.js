import axios from 'axios';

const testData = JSON.stringify({
    "userName": "Test Authentication",
    "passWord": "CoderRackJ97"
});

const config = {
    method: 'POST',
    url: 'http://localhost:10000/private_Service',
    headers: {
        'Content-Type': 'application/json'
    },
    data: testData,
    timeout: 10000 * 6  // Tăng thời gian chờ lên 10 giây
};

async function sendRequest() {
    try {
        const response = await axios.request(config);
        const data = response.statusText
        console.log(`Response Code: ${data}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        if (error.response) {
            console.error(`Response Data: ${JSON.stringify(error.response.data)}`);
            console.error(`Response Status: ${error.response.status}`);
            console.error(`Response Headers: ${JSON.stringify(error.response.headers)}`);
        }
    }
}

function runDdosTest(url, numRequests) {
    const requests = [];
    for (let i = 0; i < numRequests; i++) {
        requests.push(sendRequest());
    }
    Promise.all(requests).then(() => {
        console.log('All requests completed');
    }).catch(err => {
        console.error('Error completing requests:', err);
    });
}

const targetUrl = "http://localhost:10000/private_Service";
const numberOfRequests = 300;
runDdosTest(targetUrl, numberOfRequests);
