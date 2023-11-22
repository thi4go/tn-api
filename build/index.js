"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000; // You can set the port to any you prefer
app.get("/ping", (req, res) => {
    res.send("pong");
});
app.listen(port, () => {
    console.log(`Truenorth API running on port :${port}!`);
});
