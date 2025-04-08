import test, { expect } from '@playwright/test';

let tokenvalue;
test.beforeAll('Basic Auth', async ({ request }) => {
  const respToken = await request.post(
    'https://restful-booker.herokuapp.com/auth',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        username: 'admin',
        password: 'password123',
      },
    }
  );

  tokenvalue = (await respToken.json()).token;
  //console.log(await respToken.json());
});

test('Authentication of put call with token', async ({ request }) => {
  const resp = await request.put(
    'https://restful-booker.herokuapp.com/booking/1',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        cookie: 'token=' + tokenvalue,
      },
      data: {
        firstname: 'Sumit',
        lastname: 'Sharma',
        totalprice: 3000,
        depositpaid: true,
        bookingdates: {
          checkin: '2018-01-01',
          checkout: '2019-01-01',
        },
        additionalneeds: 'Dinner',
      },
    }
  );
  expect(resp.status()).toBe(200);
});

test('Authentication of Delete call with token', async ({ request }) => {
  const respDelete = await request.delete(
    'https://restful-booker.herokuapp.com/booking/2274',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        cookie: 'token=' + tokenvalue,
      },
    }
  );
  expect(respDelete.status()).toBe(201);
  expect(respDelete.statusText()).toMatch('Created');
});

/*test('Authentication with API Key', async ({ request }) => {
  const resp = await request.put(
    'https://restful-booker.herokuapp.com/booking/1',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Basic YWRtaW46cGFzc3dvcmQxMjM=',
      },
      data: {
        firstname: 'Sumit',
        lastname: 'Sharma',
        totalprice: 3000,
        depositpaid: true,
        bookingdates: {
          checkin: '2018-01-01',
          checkout: '2019-01-01',
        },
        additionalneeds: 'Dinner',
      },
    }
  );
  expect(resp.status()).toBe(200);
});*/
