const { test, expect, request } = require('@playwright/test');

const apiUrl = "https://hosted.where2getit.com/testtruevaluetest/index.html";

// const MapjsHeaders = {
//     "group": "maps-api-js",
//     "max_age": 2592000,
//     "endpoints": [
//         {
//             "url": "https://csp.withgoogle.com/csp/report-to/maps-api-js"
//         }
//     ]
// };

test("Test Google Maps API JS - common.js", async ({}) => {
     const apiContext = await request.newContext();

    const apiResponse = await apiContext.get(apiUrl)
//         headers: {
//             "Report-To": JSON.stringify(MapjsHeaders)
//         }
//     });

//     // Verify Status Code
//     await expect(apiResponse.status()).toBe(200);

//     // Verify Response Headers
//     const responseHeaders = apiResponse.headers();
//     expect(responseHeaders['content-type']).toMatch(/^text\/javascript/);
//     expect(responseHeaders['cache-control']).toMatch(/public, max-age=\d+/);
//     expect(responseHeaders['content-encoding']).toBe('br');

//     // Optionally, you can add more header checks here based on your requirements

//     // Close the context after test completes
//     //await apiContext.close();

//console.log(await apiResponse.body());
//console.log(await apiResponse.headers());
//console.log(apiResponse.headersArray());
console.log(apiResponse.url());
 });
