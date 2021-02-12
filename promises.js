
// Javascript Async await
// https://www.youtube.com/watch?v=V_Kr9OSfDeU&ab_channel=WebDevSimplified
function makeRequest(location) {
    return new Promise((resolve, reject) => {
        console.log(`Making Request to ${location}`)
        if (location === 'Google') {
            resolve('Google says hi')
        } else {
            reject('We can only talk to Google')
        }
    })
}

function processRequest(response) {
    return new Promise((resolve, reject) => {
        console.log('Processing response')
        resolve(`Extra Information + ${response}`)
    })
}

// The Promise method. Not as clean as async await.
// if we needed to use a parameter from the first .then in the second .then, it can't be done that easily with promises (async await solves this)
makeRequest('Google').then(response => {
    console.log('Response Recieved')
    // The processRequest promise needs to be returned to use it
    return processRequest(response)
}).then(processedResponse => {
    console.log(processedResponse)
}).catch(err => {
    // this will be triggered if location != 'Google'
    console.log(err)
})

// async await method
// you need to have some type of function your awaiting code is inside of
// async: tells js that this function is asynchronous so it knows how to handle the await sequences that we put inside of it.
// When the doWork function is fetching data, js will continue with other functions outside the doWork function.
async function doWork(){
    // all the code that could fail goes here.
    try {
        // await: the 'doWork' function will wait until the 'makeRequest' function has returned before moving forward. if 'await' is not used, it will
        //        return the promise and not the result of the promise.
        // this will only return the resolve section of the promise
        const response = await makeRequest('Google')
        console.log('Response Recieved')
        const processedResponse = await processRequest(response)
        console.log(processedResponse)
    // catch takes a single parameter 'err' which is collected from the reject statement in the promise.
    } catch (err) {
        console.log(err)
    }
}
// call the function
doWork()
