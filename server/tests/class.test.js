const request = require('supertest');
import createApp from '../app/app';
const app = createApp();

// Testy dla metody GET
describe('GET /classes', () => {
    // Given
    // When
    it('should return all classes', async () => {
        const res = await request(app)
            .get('/classes');

        // Then
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe('GET /classes/:school_id', () => {
    // Given
    const school_id = 14;

    // When
    it('should return classes for given school', async () => {
        const res = await request(app)
            .get(`/classes/${school_id}`);

        // Then
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
    });
});