const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../app');

require('dotenv').config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.CONNECTION_STRING);
});

describe('GET all blogs', () => {
  it('should return all blogs', async () => {
    const res = await request(app).get('/blogs/getAll');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});
