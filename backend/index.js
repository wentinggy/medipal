import express from "express";
import axios from "axios";
import cors from "cors";
import bodyParser from "body-parser";
import { CookieJar } from 'tough-cookie';

const port = 8000


const app = express()
app.use(bodyParser.json());
app.use(cors());
app.use(express.json())

app.get('/login', async (req, res) => {


    try {
        const email = req.query.email;
        const password = req.query.password;

        var resp = await axios.post("http://ec2-46-137-202-117.ap-southeast-1.compute.amazonaws.com/api/login",
            {
                email: email,
                password: password
            }
        );

        console.log(resp.data)
        res.json({...resp.data,message:"Logged In"});

    }
    catch (e) {
        console.log("errored");
        console.log(e.error);
        res.json({message:"Please check all details"});
    }
})




app.get('/register', async (req, res) => {


    try {
        const email = req.query.email;
        const password = req.query.password;
        const firstName=req.query.firstName;
        const lastName=req.query.lastName;

        var resp = await axios.post("http://ec2-46-137-202-117.ap-southeast-1.compute.amazonaws.com/api/register",
            {
                first_name:firstName,
                last_name:lastName,
                email: email,
                password: password
            }
        );

        console.log(resp.data)
        res.json({...resp.data,message:"Registered"});

    }
    catch (e) {
        console.log("errored");
        console.log(e.error);
        res.json({message:e.message});
    }
})





app.get('/chat', async (req, res) => {


    try {
        const question = req.query.question;
        const sessionid = req.query.sessionid;
        var url="http://ec2-46-137-202-117.ap-southeast-1.compute.amazonaws.com/api/register"
        
        console.log("chat called");
        var cookie=`sessionid=  ${sessionid}`
        
        const cookieJar = new CookieJar();
        
        cookieJar.setCookieSync(cookie, url);

        const axiosInstance = axios.create({
            headers: {
                Cookie: cookie
              }
          });

        var resp = await axiosInstance.post(url,
            {
                question:question
            }
        );

        console.log(resp.data)
        res.json({...resp.data,message:"Answered"});
        // res.json({message:question})

    }
    catch (e) {
        console.log("errored");
        console.log(e);
        res.json({message:e.message});
    }
})





app.listen(port, () => { console.log(`Example app listening on port ${port}`) });