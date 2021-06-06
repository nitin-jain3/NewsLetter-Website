const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { post } = require("request");
const { json } = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function (req, res) {
    const firstname = req.body.first;
    const lastname = req.body.last;
    const uemail = req.body.email;

    const data = {
        members: [
            {
                email_address: uemail,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }

            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const options = {
        method: "POST",
        auth: "nitin:9662e72fcf86ac7fcf6d6c6448e2e773-us6"
    }

    const url = "https://us6.api.mailchimp.com/3.0/lists/607ecce06e";

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

});

app.post("/failure", function (res, req) {
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function () {
    console.log("server started at port 3000");
});


//Api key
//9662e72fcf86ac7fcf6d6c6448e2e773-us6

//list id
//607ecce06e