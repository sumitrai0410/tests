import { test, expect } from '@playwright/test';

test('Simulate mouse actions on map element', async ({ page }) => {

    await page.goto('https://hosted.meetsoci.com/att/index.html');

    
    await page.fill('#search_input', '50266');
    await page.click('.button-search');

    const locationArray = await page.locator('.address-inner').allTextContents();
    console.log(locationArray);


    const mapLocator = page.locator('.ol-unselectable');
    const mapElement = await mapLocator.first();
    const box = await mapElement.boundingBox();

    if (!box) {
        throw new Error('Map element not found or not visible');
    }

   
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down(); 

   
    await page.mouse.move(box.x + box.width / 2 + 500000, box.y + box.height / 2 + 600000); 
    await page.mouse.move(box.x + box.width / 2 + 900000, box.y + box.height / 2 + 200000);
    await page.mouse.move(box.x + box.width / 2 + 1000000, box.y + box.height / 2 + 500000);


    await page.waitForTimeout(20000);

    
    const newLocationArray = await page.locator('.address-inner').allTextContents();
    console.log(newLocationArray);

    
    await expect(locationArray).not.toEqual(newLocationArray);
});


test('Simulate mouse actions on map elements', async ({ page }) => {
    await page.goto('https://hosted.meetsoci.com/att/index.html');

    await page.fill('#search_input', '50266');
    await page.click('.button-search');

    const locationArray = await page.locator('.address-inner').allTextContents();
    console.log(locationArray);

    const mapLocator = page.locator('.ol-unselectable');
    const mapElement = await mapLocator.nth(0); 
    const box = await mapElement.boundingBox();

    if (!box) {
        throw new Error('Map element not found or not visible');
    }

    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();

    await page.mouse.move(box.x + box.width / 2 - 5078, box.y + box.height / 2 + 60);
    await page.mouse.move(box.x + box.width / 2 - 9000, box.y + box.height / 2 + 2000);
    await page.mouse.move(box.x + box.width / 2 - 1080, box.y + box.height / 2 + 5080);

    await mapElement.click();

    await page.waitForTimeout(20000);

    const newLocationArray = await page.locator('.address-inner').allTextContents();
    console.log(newLocationArray);

    await expect(locationArray).not.toEqual(newLocationArray);
});


