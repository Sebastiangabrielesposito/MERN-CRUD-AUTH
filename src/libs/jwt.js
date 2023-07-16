// import { promise, reject } from "bcrypt/promises";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../utils.js";


export async function createAccessToken(payload) {
    return new Promise((resolve,reject)=>{
        jwt.sign(payload,TOKEN_SECRET, { expiresIn: "1d" }, (err, token) => {
            if (err) reject(err);
            resolve(token)
          });
    })
}
