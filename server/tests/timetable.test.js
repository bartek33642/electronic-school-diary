const request = require('supertest');
import createApp from '../app/app';
const app = createApp();

describe('GET /timetable/:school_id/:class_id', () => {
    // Given
    const school_id = 14;
    const class_id = 39;

    // When
    it('should return timetable for given school and class', async () => {
        const res = await request(app)
            .get(`/timetable/${school_id}/${class_id}`);

        // Then
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe('GET /teacher-timetable/:school_id/:teacher_id', () => {
    // Given
    const school_id = 14;
    const teacher_id = 12;

    // When
    it('should return timetable for given school and teacher', async () => {
        const res = await request(app)
            .get(`/teacher-timetable/${school_id}/${teacher_id}`);

        // Then
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
    });
});

// Testy dla metody POST
// describe('POST /add-timetable', () => {
//     // Given
//     const newTimetable = {
//         day_of_week: 'monday',
//         start_time: '2023-09-04T12:00',
//         end_time: '2023-09-04T12:45',
//         classroom: '101',
//         is_substitution: false,
//         is_canceled: false,
//         is_recurring: true,
//         class_id: 39,
//         subject_id: 10,
//         teacher_id: 12,
//         lesson_number: 5,
//         end_recurring_date: '2024-02-10'
//     };

//     // When
//     it('should add a new timetable', async () => {
//         const res = await request(app)
//             .post('/add-timetable')
//             .send(newTimetable);

//         // Then
//         expect(res.statusCode).toEqual(201);
//         expect(res.body).toHaveProperty('message', 'Zajęcie do planu lekcji dodany pomyślnie.');
//     });
// });
