import { useState } from "react";

// Initial data for leave requests
const initialRequestData = [
  {
    id: 1,
    requestType: "Vacation Leave",
    from: "07-01-2023",
    to: "07-02-2023",
    remarks: "Family vacation",
    status: "Approved",
  },
  {
    id: 2,
    requestType: "Sick Leave",
    from: "07-03-2023",
    to: "07-05-2023",
    remarks: "Medical reasons",
    status: "Pending",
  },
  {
    id: 3,
    requestType: "Absent",
    from: "07-06-2023",
    to: "07-06-2023",
    remarks: "Personal matters",
    status: "Rejected",
  },
];

export default function App() {
  const [viewRequestIsOpen, setViewRequestIsOpen] = useState(true);
  const [newRequestIsOpen, setNewRequestIsOpen] = useState(false);

  const [selectedRequest, setSelectedRequest] = useState(null);

  function handleSelectRequest(request) {
    setSelectedRequest((prevRequest) =>
      prevRequest?.id === request.id ? null : request
    );
  }

  return (
    <div className="app">
      <div className="sidebar">
        <RequestList onSelectRequest={handleSelectRequest} />
      </div>
      <div className="main-content">
        {newRequestIsOpen && <NewRequestForm />}
        {viewRequestIsOpen && <ViewRequestForm request={selectedRequest} />}
      </div>
    </div>
  );
}

// Component to display the list of leave requests
function RequestList({ onSelectRequest }) {
  return (
    <ul>
      {initialRequestData.map((request) => (
        <Request
          key={request.id}
          request={request}
          onSelectRequest={onSelectRequest}
        />
      ))}
    </ul>
  );
}

// Component to display individual leave requests
function Request({ request, onSelectRequest }) {
  return (
    <li onClick={() => onSelectRequest(request)}>
      <p>{request.requestType}</p>
      <p>
        From {request.from} to {request.to}
      </p>
      <p>{request.status}</p>
    </li>
  );
}

// Component for the new request form
function NewRequestForm() {
  return (
    <form>
      <label>Request Type :</label>
      <select>
        <option value="Vacation Leave">Vacation Leave</option>
        <option value="Sick Leave">Sick Leave</option>
        <option value="Absent">Absent</option>
      </select>

      <label>From :</label>
      <input type="date" name="from" />

      <label>To :</label>
      <input type="date" name="to" />

      <label>Remarks :</label>
      <textarea name="remarks" />

      <button>Submit</button>
      <button>Cancel</button>
    </form>
  );
}

// Component to view a specific leave request
function ViewRequestForm({ request }) {
  return (
    <div className="view-request">
      <h2>{request?.requestType}</h2>
      <label>From :</label>
      <span>{request?.from}</span>
      <label>To :</label>
      <span>{request?.to}</span>
      <label>Remarks :</label>
      <span>{request?.remarks}</span>
      <label>Status :</label>
      <span>{request?.status}</span>
      <button>Cancel Request</button>
    </div>
  );
}
