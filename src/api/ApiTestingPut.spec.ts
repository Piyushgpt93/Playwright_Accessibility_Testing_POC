import { expect, test } from '@playwright/test';

test('API Testing - PUT call 1', async ({ request }) => {
  const resput = await request.put(
    'https://restful-booker.herokuapp.com/booking/2',
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
  const jsonresp = await resput.json();
  console.log(jsonresp);

  expect(resput.status()).toBe(200);
  expect(resput.statusText()).toBe('OK');
  expect(resput.ok()).toBeTruthy();
  expect(jsonresp).toMatchObject({
    firstname: 'Sumit',
    lastname: 'Sharma',
    totalprice: 3000,
    depositpaid: true,
    bookingdates: { checkin: '2018-01-01', checkout: '2019-01-01' },
    additionalneeds: 'Dinner',
  });
  expect(jsonresp.additionalneeds).toEqual('Dinner');

  //Get call to just check the updated details.
  const respGET = await request.get(
    'https://restful-booker.herokuapp.com/booking/2'
  );
  console.log(respGET);
  expect(await respGET.json()).toMatchObject({
    firstname: 'Sumit',
    lastname: 'Sharma',
    totalprice: 3000,
    depositpaid: true,
    bookingdates: { checkin: '2018-01-01', checkout: '2019-01-01' },
    additionalneeds: 'Dinner',
  });
});
