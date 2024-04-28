import { test, expect } from "@playwright/test";
import path from 'path';

const UI_URL = "http://localhost:5173/"

test.beforeEach(async ({page}) => {
    await page.goto(UI_URL);

    await page.locator("//a[@data-test='Header__signIn']").click();
  
    await expect(page.getByTestId("SignIn__header")).toBeVisible()
  
    await page.getByTestId("SignIn__emailInputBox").fill("harry@gmail.com")
    await page.getByTestId("SignIn__passwordInputBox").fill("password")
  
    await page.getByTestId("SignIn__submitButton").click();
  
})
 
test("Should allow user to add a hotel", async ({page}) => {
    await page.goto(`${UI_URL}hotel`);

    await page.locator('[name="name"]').fill("Test hotel");
    await page.locator('[name="city"]').fill("Test city");
    await page.locator('[name="country"]').fill("Test country");
    await page.locator('[name="description"]').fill("Test description");
    await page.locator('[name="pricePerNight"]').fill("100");
    await page.selectOption('select[name="starRating"]', "3");
    
    await page.getByText("Budget").click();
    
    await page.getByLabel("Free Wifi").check()
    await page.getByLabel("Parking").check()
    await page.getByLabel("Spa").check()

    await page.locator('[name="adultCount"]').fill("2")
    await page.locator('[name="childCount"]').fill("4")

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "1.jpg"),
        path.join(__dirname, "files", "2.jpg"),
    ])

    await page.getByRole('button', {
        name: 'Save'
    }).click();

    await expect(page.getByTestId("Toast__SUCCESS")).toBeVisible();
})