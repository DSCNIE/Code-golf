// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(process.env.API_KEY);
    const { code } = req.body;
    let promises = testCases.map((testCase) =>
      axios.post(
        process.env.API_HOST,
        {
          stdin: testCase.stdin,
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
      )
    );
    const responses = await Promise.all(promises);
    const retArray = Array.from({ length: testCases.length });
    responses.forEach(({ data }, index) => {
      if (data.error === "" && data.stderr === "") {
        if (testCases[index].stdout === data.stdout.replace('\n', '')) {
          retArray[index] = {
            testCase: index + 1,
            pass: true,
            stdout: data.stdout,
          };
        } else {
          retArray[index] = {
            testCase: index + 1,
            pass: false,
            stdout: data.stdout,
            error: null,
          };
        }
      } else {
        console.log("reachhh");
        retArray[index] = {
          testCase: index + 1,
          pass: false,
          errText: data.error,
          error: data.stderr,
          stdin: testCases[index].stdin,
        };
      }
    });
    res.status(200).json(retArray);
  }
}

const testCases = [
  {
    stdin: "3 10 3 1 1",
    stdout: "46.666667",
  },
  {
    stdin: "4 3 4 3 2 1",
    stdout: "10.000000",
  },
  {
    stdin: "10 62 17423 15216 7041 15522 6517 30153 11795 27728 20345 4819",
    stdout: "532.244953",
  },
];
