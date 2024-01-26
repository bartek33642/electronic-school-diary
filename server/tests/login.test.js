// import { userManager } from '../app/business/user.manager';
// import { mockDeep, mockReset, MockProxy } from 'jest-mock-extended';
// import loginEndpoint from '../app/REST/login.endpoint';

// jest.mock('../business/user.manager');

// let mockUserManager: MockProxy<typeof userManager> & typeof userManager;
// let app: { post: jest.Mock<any, any>; delete: jest.Mock<any, any> };

// beforeEach(() => {
//   mockUserManager = mockDeep(userManager);
//   (userManager as any) = mockUserManager;

//   app = { post: jest.fn(), delete: jest.fn() };
// });

// afterEach(() => {
//   mockReset(mockUserManager);
// });

// describe('Login Endpoint', () => {
//   it('should call userManager.authenticate on POST /login', async () => {
//     // Given
//     const req = { body: { email: 'test@test.com', password: 'password' } };
//     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//     // When
//     loginEndpoint(app);
//     await app.post.mock.calls[0]1;

//     // Then
//     expect(mockUserManager.authenticate).toHaveBeenCalledWith(req.body.email, req.body.password);
//   });

//   it('should call userManager.removeHashSession on DELETE /logout/:user_id', async () => {
//     // Given
//     const req = { params: { user_id: '1' }, body: { email: 'test@test.com', password: 'password' } };
//     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//     // When
//     loginEndpoint(app);
//     await app.delete.mock.calls[0]1;

//     // Then
//     expect(mockUserManager.removeHashSession).toHaveBeenCalledWith(req.params.user_id);
//   });
// });

