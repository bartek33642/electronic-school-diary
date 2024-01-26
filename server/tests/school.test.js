const request = require('supertest');
import createApp from '../app/app';
const app = createApp();

describe('School Endpoints', () => {
  // Given
  const newSchool = {
    school_name: 'Test School',
    town: 'Test Town',
    street: 'Test Street',
    building_number: '123',
    apartment_number: '1A',
    zip_code: '00-000'
  };

  // Test for GET /schools
  it('should fetch all schools', async () => {
    // When
    const res = await request(app).get('/schools');

    // Then
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

//   // Test for POST /add-school
//   it('should create a new school', async () => {
//     // When
//     const res = await request(app).post('/add-school').send(newSchool);

//     // Then
//     expect(res.statusCode).toEqual(201);
//     expect(res.body.message).toEqual('Szkoła dodana pomyślnie.');
//   });

//   // Test for PUT /edit-school
//   it('should update an existing school', async () => {
//     // Given
//     const existingSchool = { ...newSchool, school_id: 17 }; 

//     // When
//     const res = await request(app).put('/edit-school').send(existingSchool);

//     // Then
//     expect(res.statusCode).toEqual(201);
//     expect(res.body.message).toEqual('Szkoła zedytowana pomyślnie.');
//   });

//   // Test for DELETE /schools/:school_id
//   it('should delete an existing school', async () => {
//     // Given
//     const schoolId = 18; // replace 1 with an actual id from your database

//     // When
//     const res = await request(app).delete(`/schools/${schoolId}`);

//     // Then
//     expect(res.statusCode).toEqual(204);
//   });
});
