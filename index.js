import { EventEmitter } from "events"
import { fileURLToPath } from "url"
import fs from "fs"
import path from "path"
import express from "express"

const __projdir = path.dirname(fileURLToPath(import.meta.url))

const public_port = process.env["PORT"] ?? process.env["$PORT"] ?? 9999
const pport = process.env["PORT"] ?? "PORT"
const dport = process.env["$PORT"] ?? "$PORT"
const local_port1 = 7777
const local_port2 = 8888

function buildJson(message, counter, ip) {
    return JSON.stringify({
        message: message,
        counter: counter,
        ip: ip
    }, null, 2)
}

//===========================================================================
let counter1 = 0
let local_app_1 = express()
local_app_1.get("/", (req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.send(buildJson("from app 1", counter1++, req.hostname))
})

//===========================================================================
let counter2 = 0
let local_app_2 = express()
local_app_2.get("/", (req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.send(buildJson("from app 2", counter2++, req.hostname))
})

//===========================================================================
let public_app = express();
let messages = [];
let ev = new EventEmitter();

public_app.get("/", async (req, res) => {

    let realIP = req.headers["x-forwarded-for"] ?? "real ip is not forwarded"

    let json1 = await fetch("http://localhost:" + local_port1, {
        method: "GET"
    }).then(resp => resp.json())
        .catch(err => { return JSON.stringify({ "error": "true", "message": err.message ?? "dummy error message" }) })

    let json2 = await fetch("http://localhost:" + local_port2, {
        method: "GET"
    }).then(resp => resp.json())
        .catch(err => { return JSON.stringify({ "error": "true", "message": err.message ?? "dummy error message" }) })


    let file_with_port = Buffer.from(fs.readFileSync(path.join(__projdir, "/saveport.sh"), { flag: "r+" })).toString("utf8")

    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify({
        "hello": realIP,
        "internal_ip": req.ip,
        json1,
        json2,
        envports: {
            pport,
            dport,
            gotenv: file_with_port
        }
    }, null, 2))
})


local_app_1.listen(local_port1, "localhost", () => {
    console.log("private server 1 is listening on port " + local_port1);
})


local_app_2.listen(local_port2, "localhost", () => {
    console.log("private server 2 is listening on port " + local_port2);
})


public_app.listen(public_port, "0.0.0.0", () => {
    console.log("public server is listening on port " + public_port);
})