"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const store = new user_1.UserStore();
let createdUserId;
const email = `test${Date.now()}@test.com`;
describe('User Model', () => {
    it('should create a user', async () => {
        const user = await store.create({
            firstname: "Test",
            lastname: "User",
            email,
            password: "1234"
        });
        createdUserId = user.id;
        expect(user.email).toEqual(email);
    });
    it('should authenticate user', async () => {
        const user = await store.authenticate(email, "1234");
        expect(user).not.toBeNull();
        expect(user?.email).toEqual(email);
    });
    it('should get all users (index)', async () => {
        const users = await store.index();
        expect(users.length).toBeGreaterThan(0);
    });
    it('should get user by id (show)', async () => {
        const user = await store.show(createdUserId);
        expect(user).not.toBeNull();
        expect(user.id).toEqual(createdUserId);
    });
    it('should delete user', async () => {
        const deleted = await store.delete(createdUserId);
        expect(deleted).not.toBeNull();
        expect(deleted.id).toEqual(createdUserId);
    });
});
