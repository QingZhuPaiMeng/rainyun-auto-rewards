const fetch = require("node-fetch");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const apikey = process.env.apikey;

const apis = [
    {
        path: "/daily-rewards",
        rainyun_apiurl : "https://api.v2.rainyun.com/user/reward/tasks",
        fetch_options: {
            method: "POST",
            headers: {
                "X-Api-Key": Rao5EVgRUWdCt5TIef3JlrTZSFAT1Jxm,
                "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                task_name: "每日签到",
            }),
            redirect: "follow",
        },
    },
];

apis.forEach((e) => {
    app.get(e.path, (req, res, next) => {
        (async (req, res) => {
            const rp = await fetch(e.rainyun_apiurl, e.fetch_options);
            const txt = await rp.text();
            console.log("Status", rp.status);
            console.log("Response", txt);
            res.status(rp.status).send(txt);
        })(req, res).catch(next);
    });
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`App started on port ${port}`);
    });
}

module.exports = app;