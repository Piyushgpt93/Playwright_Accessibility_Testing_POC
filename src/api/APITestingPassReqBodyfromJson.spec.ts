import test, { expect } from '@playwright/test';
import ApiJson from '../testdata/apidata.json';

test('API Testing  - Pass Request Body from Json for Post call', async ({
  request,
}) => {
  const reqPost = await request.post(
    'https://restful-booker.herokuapp.com/booking',
    {
      data: ApiJson.postcalldata,
    }
  );
  const respJson = await reqPost.json();
  expect(respJson.booking).toMatchObject(ApiJson.postcalldata);
  expect(respJson.booking.additionalneeds).toEqual(
    ApiJson.postcalldata.additionalneeds
  );
});

test('API Testing  - Pass Request payload from Json for put call', async ({
  request,
}) => {
  const resput = await request.put(
    'https://restful-booker.herokuapp.com/booking/2',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Basic YWRtaW46cGFzc3dvcmQxMjM=',
      },
      data: ApiJson.putcalldata,
    }
  );
  const jsonresp = await resput.json();
  console.log(jsonresp);

  expect(resput.status()).toBe(200);
  expect(resput.statusText()).toBe('OK');
  expect(resput.ok()).toBeTruthy();
  expect(jsonresp).toMatchObject(ApiJson.putcalldata);
  expect(jsonresp.additionalneeds).toEqual(ApiJson.putcalldata.additionalneeds);

  //Get call to just check the updated details.
  const respGET = await request.get(
    'https://restful-booker.herokuapp.com/booking/2'
  );
  console.log(respGET);
  expect(await respGET.json()).toMatchObject(ApiJson.putcalldata);
});
