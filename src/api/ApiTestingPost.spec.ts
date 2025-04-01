import { test, request, expect } from '@playwright/test';
import { json } from 'stream/consumers';

test('API Testing - Post call 1', async () => {
  const reqContext = await request.newContext({
    baseURL: 'https://restful-booker.herokuapp.com/',
    extraHTTPHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const resp1 = await reqContext.post('/booking', {
    data: {
      firstname: 'Jim',
      lastname: 'Brown',
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: '2018-01-01',
        checkout: '2019-01-01',
      },
      additionalneeds: 'Breakfast',
    },
  });

  const jsonResp1 = await resp1.json();
  console.log(jsonResp1);

  expect(resp1.status()).toBe(200);
  expect(resp1.statusText()).toBe('OK');
  expect(resp1.ok()).toBeTruthy();
  expect(jsonResp1.booking).toMatchObject({
    firstname: 'Jim',
    lastname: 'Brown',
    totalprice: 111,
    depositpaid: true,
    bookingdates: { checkin: '2018-01-01', checkout: '2019-01-01' },
    additionalneeds: 'Breakfast',
  });
  expect(jsonResp1.booking.additionalneeds).toEqual('Breakfast');
});

test('API with UI Verification', async ({ request }) => {
  const resp2 = request.post('https://api.demoblaze.com/addtocart', {
    data: {
      id: '4a73d58e-e418-a9fc-b459-0e65a7926bb1',
      cookie:
        'user=b19f34fa-9242-7ac6-359e-d8088ef13738; ext_name=ojplmecpdpgccookcobabopnaifgidhf',
      prod_id: 3,
      flag: false,
    },
  });

  expect((await resp2).status()).toBe(200);
});
