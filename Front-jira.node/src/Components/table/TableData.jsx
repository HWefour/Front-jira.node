import { useEffect, useState } from "react";

const TableData = () => {
  const [issues, setIssues] = useState([]);
  const DemandeSupportId = 18;

  useEffect(() => {
    fetch(`http://localhost:7000/issue/${DemandeSupportId}`)
      .then((response) => response.json())
      .then((data) => setIssues(data.issues)) 
      .catch((error) => console.log(error));
  }, []);

  console.log("contenue issues", issues);

  return (
    <div>
      {issues.length > 0 ? (
        <div className="issue-card">
          {issues.map((issue) => (
            <div key={issue.id}>
              <h1>{issue.id}</h1>
              <p>{issue.fields?.creator.accountId} : {issue.fields?.creator.displayName}</p>
              <h1>{issue.fields?.summary}</h1>
              <p>{issue.fields?.description}</p>
              <p>{issue.fields?.status?.name}</p>
              {issue.fields?.attachment.length > 0 && (
                <>
              <a href={issue.fields?.attachment[1]?.thumbnail}>voir image</a><br></br>
              <a href={issue.fields?.attachment[0]?.filename}>telecharger</a>
              </>
            )}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading issues...</p>
      )}
    </div>
  );
};

export default TableData;
