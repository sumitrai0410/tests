// // const { chromium } = require('playwright');

const { test, expect } = require('@playwright/test');

test('Verify postal codes starting with 50', async ({ page }) => {

  await page.goto('https://hosted.meetsoci.com/att/index.html');

 
  await page.fill('#search_input', '50266');


  await page.click('.button-search');

  await page.waitForTimeout(5000);


  const addressElements = await page.$$('div[class="address-inner"]');
  for (const el of addressElements) {
    const addText = await el.innerText();
    const add = addText.trim().split(',');
    const code = add[add.length - 1].trim().split(' ');
    console.log(await code);
    const postalCode = code[1];
    console.log(await postalCode);

    expect(postalCode.startsWith('50')).toBe(true);
  }
});

// const { test, expect } = require('@playwright/test');

// test.only('Verify user input postal code starts with specific digits', async ({ page }) => {
//     await page.goto('https://hosted.meetsoci.com/att/index.html');

//   const userInputPostalCode = await page.prompt(

//   );

 
//   const firstTwoDigits = userInputPostalCode.slice(0, 2);
//   //expect(firstTwoDigits).toBe('50'); 


//   await page.fill('#search_input', userInputPostalCode);


//   await page.click('.button-search');

  
//   await page.waitForTimeout(5000);


//   const addressElements = await page.$$('div[class="address-inner"]');
//   for (const el of addressElements) {
//     const addText = await el.innerText();
//     const add = addText.trim().split(',');
//     const code = add[add.length - 1].trim().split(' ');
//     const extractedPostalCode = code[1];

    
//     expect(extractedPostalCode.startsWith(firstTwoDigits)).toBe(true);
//   }
// });
//fghjkldfghjkldfghj