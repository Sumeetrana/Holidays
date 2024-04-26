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
