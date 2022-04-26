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

const testCases = [
  {
      stdin: '3 10 3 1 1',
      stdout: '46.666667'
  },
  {
      stdin: '4 3 4 3 2 1',
      stdout: '10.000000'
  },
  {
      stdin: '10 62 17423 15216 7041 15522 6517 30153 11795 27728 20345 4819',
      stdout: '532.244953'
  },
  {
      stdin: '6 98 30 20 10 33 90 21',
      stdout: '315.296970'
  },
  {
      stdin: '4 189 44 22 9 98',
      stdout: '541.636364'
  },
  {
      stdin: '8 100 10 20 40 11 20 38 291 38',
      stdout: '582.047058'
  }
]