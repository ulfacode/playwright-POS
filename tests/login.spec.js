import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test('Empty Field', async ({ page }) => {
    await page.goto('https://poskasir.vercel.app/login');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Email tidak boleh kosong')).toBeVisible();
    await expect(page.getByText('Kata sandi tidak boleh kosong')).toBeVisible();
  });

  test('Not Registered', async ({ page }) => {
    await page.goto('https://poskasir.vercel.app/login');
    await page.getByRole('textbox', { name: 'example@kasirkita.com' }).click();
    await page.getByRole('textbox', { name: 'example@kasirkita.com' }).fill('tidak.terdaftar@yopmail.com');
    await page.getByRole('textbox', { name: '********' }).click();
    await page.getByRole('textbox', { name: '********' }).fill('12345678');
    await page.getByRole('textbox', { name: '********' }).press('CapsLock');
    await page.getByRole('textbox', { name: '********' }).fill('12345678A');
    await page.getByRole('textbox', { name: '********' }).press('CapsLock');
    await page.getByRole('textbox', { name: '********' }).fill('12345678Aa*');
    await page.getByRole('button', { name: 'Login' }).click();

    // Add an assertion to check for the expected error message
    await expect(page.getByText('Email atau Password tidak sesuai').first()).toBeVisible();
  });

  test('Invalid Account', async ({ page }) => {
    await page.goto('https://poskasir.vercel.app/login');
    await page.getByRole('textbox', { name: 'example@kasirkita.com' }).click();
    await page.getByRole('textbox', { name: 'example@kasirkita.com' }).fill('web.kasirkita40@yopmail.com');
    await page.getByRole('textbox', { name: '********' }).click();
    await page.getByRole('textbox', { name: '********' }).fill('12345678');
    await page.getByRole('textbox', { name: '********' }).press('CapsLock');
    await page.getByRole('textbox', { name: '********' }).fill('12345678A');
    await page.getByRole('textbox', { name: '********' }).press('CapsLock');
    await page.getByRole('textbox', { name: '********' }).fill('12345678Aa.');
    await page.getByRole('button', { name: 'Login' }).click();

    // Add an assertion to check for the expected error message
    await expect(page.getByText('Email atau Password tidak sesuai').first()).toBeVisible();
  });


test('Valid Account', async ({ page }) => {
  await page.goto('https://poskasir.vercel.app/login');
  await page.getByRole('textbox', { name: 'example@kasirkita.com' }).click();
  await page.getByRole('textbox', { name: 'example@kasirkita.com' }).fill('web.kasirkita40@yopmail.com');
  await page.getByRole('textbox', { name: '********' }).click();
  await page.getByRole('textbox', { name: '********' }).fill('12345678Aa*');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Main' }).first()).toBeVisible();
});

test('Field Check', async ({ page }) => {
  await page.goto('https://poskasir.vercel.app/login');
  await page.getByRole('textbox', { name: 'example@kasirkita.com' }).click();
  await page.getByRole('textbox', { name: 'example@kasirkita.com' }).fill('a');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Format email tidak valid').first()).toBeVisible();

  await page.getByRole('textbox', { name: 'example@kasirkita.com' }).click();
  await page.getByRole('textbox', { name: 'example@kasirkita.com' }).fill('emailvalid@yopmail.com');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Format email tidak valid').first()).toBeHidden();

  await page.getByRole('textbox', { name: '********' }).click();
  await page.getByRole('textbox', { name: '********' }).fill('1');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Minimal kata sandi adalah 8').first()).toBeVisible();

  await page.getByRole('textbox', { name: '********' }).click();
  await page.getByRole('textbox', { name: '********' }).fill('11111111');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Mengandung huruf, angka dan simbol').first()).toBeVisible();

  await page.getByRole('textbox', { name: '********' }).click();
  await page.getByRole('textbox', { name: '********' }).fill('aaaaaaaa');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Mengandung huruf, angka dan simbol').first()).toBeVisible();

  await page.getByRole('textbox', { name: '********' }).click();
  await page.getByRole('textbox', { name: '********' }).fill('@@@@@@@@');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Mengandung huruf, angka dan simbol').first()).toBeVisible();

  await page.getByRole('textbox', { name: '********' }).click();
  await page.getByRole('textbox', { name: '********' }).fill('11111111a');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: '********' }).click();
  await expect(page.getByText('Mengandung huruf, angka dan simbol').first()).toBeVisible();

  await page.getByRole('textbox', { name: '********' }).click();
  await page.getByRole('textbox', { name: '********' }).fill('11111111.');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Mengandung huruf, angka dan simbol').first()).toBeVisible();

  await page.getByRole('textbox', { name: '********' }).click();
  await page.getByRole('textbox', { name: '********' }).fill('11111111A');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Mengandung huruf, angka dan simbol').first()).toBeVisible();

  await page.getByRole('textbox', { name: '********' }).click();
  await page.getByRole('textbox', { name: '********' }).fill('11111111a.');
  await page.getByRole('button', { name: 'Login' }).click();

  // Add an assertion to check that no warning message is visible
  await expect(page.getByText('Mengandung huruf, angka dan simbol')).toBeHidden();


});

});