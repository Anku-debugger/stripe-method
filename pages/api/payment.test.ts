import request from 'supertest';
import app from './payment'; 
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('API tests', () => {
  test('it should handle a POST request', async () => {
    const response = await request(app)
      .post('/api/payment')
      .send({
        amount: 2500,
        token: '_token__43645tgtg56ty54t3yg5t',
        formData: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          mobile: '1234567890',
          pinCode: '123456',
          address: '123 Main St',
          locality: 'Some Locality',
        },
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
  });

});
