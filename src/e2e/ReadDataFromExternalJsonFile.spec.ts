import { expect, test } from '@playwright/test';
import { link } from 'fs';
import dataArray from '../testdata/testData1.json';
import logindetails from '../testdata/logindata.json';

test.beforeEach(async ({ page }) => {
  //login
  await page.goto(
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
    { waitUntil: 'domcontentloaded' }
  );
  //await page.getByPlaceholder('Username').fill(logindetails.username);
  //await page.getByPlaceholder('Password').fill(logindetails.password);

  await expect(page.getByPlaceholder('Username')).toBeVisible();
  await page.getByPlaceholder('Username').fill(logindetails.username);

  await expect(page.getByPlaceholder('Password')).toBeVisible();
  await page.getByPlaceholder('Password').fill(logindetails.password);

  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL(
    'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'
  );
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});

test('Verify timesheet card navigation on Dashboard page', async ({
  page,
  context,
}) => {
  await expect(page.locator('#app')).toContainText('Quick Launch');
  await expect(page.getByRole('button', { name: 'Timesheets' })).toBeVisible();
  await page.getByRole('link', { name: 'Time' }).click();
  await expect(page.getByLabel('Topbar Menu').getByRole('list')).toContainText(
    'Timesheets'
  );
});

dataArray.forEach((data) => {
  test(`Add candidate for Recruitment  ${data.fname}`, async ({ page }) => {
    await page.getByRole('link', { name: 'Recruitment' }).click();
    await page.getByRole('button', { name: ' Add ' }).click();
    await expect(page.locator('#app')).toContainText('Add Candidate');
    await page.getByPlaceholder('First Name').fill(data.fname);
    await page.getByPlaceholder('Last Name').fill(data.lname);
    await page.getByPlaceholder('Middle Name').fill(data.mname);
    await page.getByPlaceholder('Type here').first().fill(data.email);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Application Stage')).toBeVisible({ timeout: 10000 });
  });
});
