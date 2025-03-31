import { test, request, expect } from '@playwright/test';
import { Expect } from '@playwright/test';
import { json } from 'stream/consumers';

let reqContext2;
test.beforeAll('Before all the test', async () => {
  reqContext2 = await request.newContext({
    baseURL: 'https://restful-booker.herokuapp.com',
    extraHTTPHeaders: {
      Accept: 'application/json',
    },
  });
});

test('API Testing Get Practice 1', async ({ request }) => {
  const resp1 = await request.get(
    'https://restful-booker.herokuapp.com/booking'
  );

  console.log(await resp1.json());
});

test('API Testing Get Practice 2', async () => {
  const reqContext = await request.newContext({
    baseURL: 'https://restful-booker.herokuapp.com/',
  });

  const resp1 = await reqContext.get('/booking');

  console.log(await resp1.json());
});

/*test('API Testing Get Practice 3', async () => {
  const resp1 = await reqContext2.get('/booking');

  console.log(await resp1.json());
});*/

/*test('API Testing Get Practice 4', async () => {
  const resp1 = await reqContext2.get('/booking', {
    headers: {
      Accept: 'application/json',
    },
  });

  console.log(await resp1.json());
});*/

/*test('API Testing Get Practice 5', async () => {
  const reqContext = await request.newContext({
    baseURL: 'https://restful-booker.herokuapp.com/',
    extraHTTPHeaders: {
      Accept: 'application/json',
    },
  });

  const resp1 = await reqContext.get('/booking');

  console.log(await resp1.json());
});*/

test('API Testing Get Practice 6', async () => {
  const resp1 = await reqContext2.get('/booking/2402');
  console.log(await resp1.json());
});

test('API Testing Get Practice 7', async () => {
  const resp1 = await reqContext2.get('/booking?firstname=John&lastname=Smith');
  console.log(await resp1.json());
});

test('API Testing Get Practice 8', async () => {
  const resp1 = await reqContext2.get('/booking', {
    params: {
      firstname: 'John',
      lastname: 'Smith',
    },
  });
  console.log(await resp1.json());
});

test('API Testing Get Practice 9', async () => {
  const resp1 = await reqContext2.get('/booking/922');
  console.log(await resp1.json());

  //expect(resp1.status()).toBe(400);
  //expect(resp1.ok()).toBeTruthy();
  /*expect(await resp1.json()).toMatchObject({
    firstname: 'Josh',
    lastname: 'Allen',
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2018-01-01',
      checkout: '2019-01-01',
    },
    additionalneeds: 'super bowls',
  });*/

  const jsonresp = await resp1.json();

  expect(jsonresp.firstname).toEqual('Josh');
});

test('API with UI verification', async ({ request,page }) => {
  const resp2 = await request.get('https://api.demoblaze.com/entries');
  const jsonresp2 = await resp2.json();
  console.log(jsonresp2.Items[0].title);

  await page.goto("https://www.demoblaze.com/");
  await expect(page.getByRole('link',{name:'apple galaxy s6'})).toHaveText(jsonresp2.Items[0].title)


});
