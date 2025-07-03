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
  const [viewRequestIsOpen, setViewRequestIsOpen] = useState(false);
  const [newRequestIsOpen, setNewRequestIsOpen] = useState(false);

  // State to manage the request data
  const [requestData, setRequestData] = useState(initialRequestData);

  // State to manage the selected request for viewing
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Function to handle viewing a request
  function handleSelectRequest(request) {
    // Set the selected request based on the clicked item
    setSelectedRequest((prevRequest) =>
      prevRequest?.id === request.id ? null : request
    );

    // Toggle the viewRequestIsOpen state based on the selected request
    request.id === selectedRequest?.id
      ? setViewRequestIsOpen(false)
      : setViewRequestIsOpen(true);

    // Close the new request form if it is open
    setNewRequestIsOpen(false);
  }

  // Function to handle canceling a request
  function handleCancelRequest(id) {
    // Logic to cancel the request can be added here

    // Remove the request from the requestData state
    setRequestData((requestData) =>
      requestData.filter((request) => request.id !== id)
    );

    // Reset the selected request and close the view request form
    setSelectedRequest(null);
    setViewRequestIsOpen(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <RequestList
          requestData={requestData}
          onSelectRequest={handleSelectRequest}
        />
      </div>
      <div className="main-content">
        {newRequestIsOpen && <NewRequestForm />}
        {viewRequestIsOpen && (
          <ViewRequestForm
            request={selectedRequest}
            onCancelRequest={handleCancelRequest}
          />
        )}
      </div>
    </div>
  );
}

// Component to display the list of leave requests
function RequestList({ onSelectRequest, requestData }) {
  return (
    <ul>
      {requestData.map((request) => (
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
function ViewRequestForm({ request, onCancelRequest }) {
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
      {/* // Conditional rendering based on request status */}
      {request?.status === "Pending" && (
        <button onClick={() => onCancelRequest(request?.id)}>
          Cancel Request
        </button>
      )}
    </div>
  );
}
