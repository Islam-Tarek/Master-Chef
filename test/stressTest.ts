async function sendLikePostTrigger(numberOfRequests: number){
    console.log(`creating  ${numberOfRequests}  GET REQUEST (Get All posts (1000 post))`)
    const START = Date.now();
    console.log('PROCESS STRTED AT  = '+ START);
    let i = 1;

     while(i <= numberOfRequests){
        await sendLikePostRequest('http://localhost:3000/like/0e7b233a-5b54-43bb-8048-4c4a07573ac1',  {
            "userId": "0277917c-a8ad-4a39-8a5e-57e2b8093d5d"
        });
    
        i++;
    }
    const END = Date.now();
    console.log('PROCESS ENDED AT  = '+END);
    console.log('ALL REQUESTS FULLFILLED AT   =  ' + (END-START)/1000 + ' sec');
}


// Function to send a single POST request
async function sendLikePostRequest(url: string, data: any) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error in request:', error);
        throw error;
    }
}




async function sendGetTrigger(numberOfRequests: number){
        console.log(`creating  ${numberOfRequests}  GET REQUEST (Get All posts (1000 post))`)
        const START = Date.now();
        console.log('PROCESS STRTED AT  = '+ START);
        let i = 1;

        while(i <= numberOfRequests){
           await sendGetRequest('http://localhost:3000/homepage') // for get all posts
        //    await sendGetRequest('http://localhost:3000/getpost/:postId') // for get specific posts

            i++;
        }
        const END = Date.now();
        console.log('PROCESS ENDED AT  = '+END);
        console.log('ALL REQUESTS FULLFILLED AT   =  ' + (END-START)/1000 + ' sec');
}




// Function to send a single GET request
async function sendGetRequest(url: string) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error in request:', error);
        throw error;
    }
}




async function sendPostTrigger(numberOfRequests: number){
    console.log(`creating  ${numberOfRequests}  GET REQUEST (Get All posts (1000 post))`)
    const START = Date.now();
    console.log('PROCESS STRTED AT  = '+ START);
    let i = 1;

    while(i <= numberOfRequests){
        await sendPostRequest('http://localhost:3000/createpost',  {
            "title": `TEST ${i}`,
            "content": `POST ${i}`,
            "userId": "0277917c-a8ad-4a39-8a5e-57e2b8093d5d"
        });
    
        i++;
    }
    const END = Date.now();
    console.log('PROCESS ENDED AT  = '+END);
    console.log('ALL REQUESTS FULLFILLED AT   =  ' + (END-START)/1000 + ' sec');
}

// Function to send a single POST request

async function sendPostRequest(url: string, data: any) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error in request:', error);
        throw error;
    }
}



// Function to create multiple POST requests USING (Promise.all())
async function stressTest(url:string, numRequests: number, data:any){
    const requests: Promise<any>[] = [];
    for (let i = 0; i < numRequests; i++) {
        requests.push(sendPostRequest(url, {
                                            title: `TEST ${i}`,
                                            content: `POST ${i}`,
                                            userId: `0277917c-a8ad-4a39-8a5e-57e2b8093d5d`
                                            }
                                    )
                    );
    }
    console.time('Stress Test Duration'); // Start the timer
    console.log('PROCESS STRTED AT  = '+ Date.now())

    try {
        const results = await Promise.all(requests);
        console.timeEnd('Stress Test Duration'); // End the timer
        console.log('PROCESS ENDED AT  = '+ Date.now())
        console.log('All requests completed:', results);
    } catch (error) {
        console.timeEnd('Stress Test Duration'); // End the timer
        console.error('One or more requests failed:', error);
    }
}




// console.log('Stress Test Start at  =   '+ Date.now()); // Start the timer

// await stressTest('http://localhost:3000/createpost', numberOfRequests);

// console.log('Stress Test Ended  =   '+ Date.now()); // End the timer


