import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/"

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  await page.locator("//a[@data-test='Header__signIn']").click();

  await expect(page.getByTestId("SignIn__header")).toBeVisible()

  await page.getByTestId("SignIn__emailInputBox").fill("harry@gmail.com")
  await page.getByTestId("SignIn__passwordInputBox").fill("password")

  await page.getByTestId("SignIn__submitButton").click();

  await expect(page.getByTestId("Toast__SUCCESS")).toBeVisible()
  await expect(page.getByRole("link", {name: "My Bookings"})).toBeVisible()
});

test("should allow user to register", async ({page}) => {
  await page.goto(UI_URL)

  await page.locator("//a[@data-test='Header__signIn']").click();
  await page.getByTestId("SignIn__registerPageLink").click()

  await expect(page.getByRole("heading", {name: "Create account"})).toBeVisible();
  await page.getByTestId("Register__firstNameInput").fill(`test_${Date.now()}`)
  await page.getByTestId("Register__lastNameInput").fill(`test_${Date.now()}`)
  await page.getByTestId("Register__emailInput").fill(`test_${Date.now()}@gmail.com`)
  await page.getByTestId("Register__passwordInput").fill(`password`)
  await page.getByTestId("Register__confirmPasswordInput").fill(`password`)

  await page.getByTestId("Register__createAccountButton").click()

  await expect(page.getByTestId("Toast__SUCCESS")).toBeVisible()
  await expect(page.getByRole("link", {name: "My Bookings"})).toBeVisible()
})
