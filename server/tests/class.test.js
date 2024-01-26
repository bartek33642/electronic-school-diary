const request = require('supertest');
import createApp from '../app/app';
const app = createApp();

describe('Class Endpoints', () => {
  // Given
  const newClass = {
    class_name: 'Test Class',
    school_id: 1
  };

  // Test for GET /classes
  it('should fetch all classes', async () => {
    // When
    const res = await request(app).get('/classes');

    // Then
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  // // Test for DELETE /classes/:class_id
  // it('should delete an existing class', async () => {
  //   // Given
  //   const classId = 55; 

  //   // When
  //   const res = await request(app).delete(`/classes/${classId}`);

  //   // Then
  //   expect(res.statusCode).toEqual(204);
  // });
});
