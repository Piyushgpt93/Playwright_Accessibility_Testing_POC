import test, { expect } from '@playwright/test';

test('Delete call for API Testing', async ({ request }) => {
  const respDelete = await request.delete(
    'https://restful-booker.herokuapp.com/booking/9',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Basic YWRtaW46cGFzc3dvcmQxMjM=',
      },
    }
  );
  expect(respDelete.status()).toBe(201);
  const respDelText = await respDelete.text();
  console.log(respDelText);
  expect(respDelText).toEqual('Created');

  const respGet = await request.get(
    'https://restful-booker.herokuapp.com/booking/6'
  );
  expect(respGet.status()).toBe(404);
});
