"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const store = new user_1.UserStore();
describe('User Model', () => {
    it('should create a user', async () => {
        const user = await store.create({
            firstname: "Test",
            lastname: "User",
            email: "test@test.com",
            password: "1234"
        });
        expect(user.email).toEqual("test@test.com");
    });
    it('should authenticate user', async () => {
        const user = await store.authenticate("test@test.com", "1234");
        expect(user).not.toBeNull();
    });
});
