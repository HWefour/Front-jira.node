import { useEffect, useState } from "react";
import { format } from "date-fns"; // Importer la fonction de formatage de date
import "./TableData.css";

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

  // Fonction pour formater la date et l'heure
  const formatDateTime = (isoDate) => {
    const date = new Date(isoDate);
    return format(date, "dd/MM/yyyy HH:mm:ss");
  };

  return (
    <div>
      {issues.length > 0 ? (
        <div className="issue-table-container">
          <table className="issue-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Creation date and hour</th>
                <th>Creator Display Name</th>
                <th>Summary</th>
                <th>Description</th>
                <th>Status</th>
                <th>Thumbnail</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.id}>
                  <td>{issue.id}</td>
                  <td>{formatDateTime(issue.fields?.created)}</td>
                  <td>{issue.fields?.creator.displayName}</td>
                  <td>{issue.fields?.summary}</td>
                  <td>{issue.fields?.description}</td>
                  <td>{issue.fields?.status?.name}</td>
                  <td>
                    {issue.fields?.attachment?.length > 0 && (
                      <a href={issue.fields?.attachment[1]?.thumbnail}>
                        voir image
                      </a>
                    )}
                  </td>
                  <td>
                    {issue.fields?.attachment?.length > 0 && (
                      <a
                        target="_blank"
                        href={issue.fields?.attachment[0]?.content}
                      >
                        telecharger
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading issues...</p>
      )}
    </div>
  );
};

export default TableData;
