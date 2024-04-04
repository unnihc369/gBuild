import axios from "axios";
import React, { useEffect, useState } from "react";

const TestScorePage = () => {
  const [changes, setchanges] = useState(true);
  const [testName, setTestName] = useState("");
  const [testScore, setTestScore] = useState([]);
  const [subjects, setSubjects] = useState("");
  const [sem, setSem] = useState("");
  const [marks, setMarks] = useState("");
  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJrUHRMczZFQjc0ZHdyd1pqbThHUSIsImlhdCI6MTcxMjA3OTM4MiwiZXhwIjoxNzEyOTQzMzgyfQ.ZEFj7a27rO0Wz-2SN2N7vLehagFQ6MgZAEB7GCvtzR4`,
    },
  };
  const handleSubmit = async (e) => {
    //  fetchAllScore();
    e.preventDefault();
    if (!testName || !subjects || !sem || !marks) {
      window.alert("please provide all the information");
      return;
    }
    const subarr = subjects.split(",");
    const marksarr = marks.split(",");
    if (subarr.length !== marksarr.length) {
      window.alert("no of marks and subjects must equal");
      return;
    }
    const { data } = await axios.post(
      "http://127.0.0.1:8000/test/add",
      {
        testname: testName,
        subjects: subarr,
        marks: marksarr,
        sem,
      },
      config
    );
    if (data) {
      setchanges(!changes);
      window.alert("added successfull");
    }

    setMarks("");
    setSem("");
    setSubjects("");
    setTestName("");
    // console.log(data);
  };

  const fetchAllScore = async () => {
    const userdata = JSON.parse(window.localStorage.getItem("user"));
    // console.log(userdata.sem);

    const { data } = await axios.get("http://127.0.0.1:8000/test/getSemTest", {
      params: { sem: parseInt(`${userdata.sem}`, 10) },
      headers: config.headers,
    });
    //   console.log(data);
    setTestScore(data.data);
  };
  //   console.log(testScore);

  useEffect(() => {
    // fetchAllScore();
  }, [changes]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>add test score</h1>
        <input
          type="text"
          placeholder="Test Name"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
        />
        <input
          type="number"
          placeholder="sem"
          value={sem}
          onChange={(e) => setSem(e.target.value)}
        />

        <input
          type="text"
          placeholder="Please enter the subject names separated by commas "
          value={subjects}
          onChange={(e) => setSubjects(e.target.value)}
        />
        <input
          type="text"
          placeholder="Please enter the marks  separated by commas "
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
        />

        <button type="submit">add Test</button>
      </form>
      <h1 className="xscore-title">Current Semester Test Information</h1>
      {testScore && testScore.length !== 0 && (
        <div
          className="xscore-container"
          style={{
            width: "800px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {testScore.map((el, index) => (
            <div
              key={index}
              className="xscore-test"
              style={{ border: "2px solid black" ,padding:"20px"}}
            >
              <h2>{el.testname}</h2>
              <div>
                <h3>Subjects:</h3>
                <ul>
                  {el.subjects.map((subject, i) => (
                    <li key={i}>{subject}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Marks:</h3>
                <ul>
                  {el.marks.map((mark, i) => (
                    <li key={i}>{mark}</li>
                  ))}
                </ul>
              </div>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestScorePage;
