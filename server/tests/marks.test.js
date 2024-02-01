const request = require('supertest');
import createApp from '../app/app';
const app = createApp();

  // Test for GET /marks
describe(' GET /marks endpoint', () => {

  it('should fetch all marks', async () => {
    //Given

    // When
    const res = await request(app).get('/marks');

    // Then
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });


});
