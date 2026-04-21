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
});
