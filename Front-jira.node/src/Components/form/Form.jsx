import { useState } from "react";
import "./Form.css";

const Form = () => {
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const key = "SR";
  const name = "Tâche";

  const handleSubmit = (e) => {
    e.preventDefault();
    location.reload();

    const bodyData = {
      summary: summary,
      description: description,
      projectKey: key,
      issueType: name,
    };

    fetch(`http://localhost:7000/createIssue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    })
      .then((response) => {
        console.log(response.json());

        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSummaryChange = (e) => {
    setSummary(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <>
      <form className="formulaire" onSubmit={handleSubmit}>
        <label htmlFor="Summary">Summary</label>
        <input
          name="Summary"
          type="text"
          value={summary}
          onChange={handleSummaryChange}
          className="summary_text"
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          className="description_text"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Form;
