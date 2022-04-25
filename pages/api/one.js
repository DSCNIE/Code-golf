// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(process.env.API_KEY);
    const { code } = req.body;
    const { data } = await axios.post(
      process.env.API_HOST,
      {
        stdin: "3 4",
        files: [
          {
            name: "main.c",
            content: code,
          },
        ],
      },
      {
        headers: {
          Authorization: `Token ${process.env.API_KEY}`,
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    console.log(data);
    if (data.error === "" && data.stderr === "" && data.stdout === "Sum = 7") {
      res.status(200).json({ pass: "pass" });
    } else {
      res
        .status(200)
        .json({ pass: "error", stderr: data.stderr, error: data.error });
    }
  }
}
