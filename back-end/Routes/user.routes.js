import { userLogin, userRegistration } from "../Controller/user.controller.js";

export function userRoutes(app) {
    app.post("/register", userRegistration);
    app.post("/login", userLogin);
}