import { useState } from "react";

// Initial data for User Data
const initialUserData = [
  {
    employeeId: 15618,
    firstName: "Juan Bartolome",
    lastName: "Munoz",
    managerId: 15618,
  },
  {
    employeeId: 15617,
    firstName: "Ferdinand",
    lastName: "Escolar",
    managerId: 15618,
  },
  {
    employeeId: 15615,
    firstName: "Arvin",
    lastName: "Bonggal",
    managerId: 15617,
  },
];

// Initial data for Request Types
const initialRequestTypes = [
  {
    id: 1,
    requestType: "Vacation Leave",
  },
  {
    id: 2,
    requestType: "Sick Leave",
  },
  {
    id: 3,
    requestType: "Absent",
  },
  {
    id: 4,
    requestType: "Bereavement Leave",
  },
  {
    id: 5,
    requestType: "Maternity Leave",
  },
];

// Initial data for Requests
const initialRequestData = [
  {
    id: 1,
    employeeId: 15615,
    requestTypeId: 1,
    from: "07-01-2023",
    to: "07-02-2023",
    remarks: "Family vacation",
    status: "Approved",
  },
  {
    id: 2,
    employeeId: 15615,
    requestTypeId: 2,
    from: "07-03-2023",
    to: "07-05-2023",
    remarks: "Medical reasons",
    status: "Pending",
  },
  {
    id: 3,
    employeeId: 15615,
    requestTypeId: 3,
    from: "07-06-2023",
    to: "07-06-2023",
    remarks: "Personal matters",
    status: "Rejected",
  },
];

export default function App() {
  // State to manage the visibility of the view request and new request forms
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
    // Remove the request from the requestData state
    setRequestData((requestData) =>
      requestData.filter((request) => request.id !== id)
    );

    // Reset the selected request and close the view request form
    setSelectedRequest(null);
    setViewRequestIsOpen(false);
  }

  // Function to toggle the new request form
  function toogleNewRequestForm() {
    // Close the view request form if it is open
    setViewRequestIsOpen(false);

    // Toggle the new request form state
    setNewRequestIsOpen(true);
  }

  // Function to handle validation of the new request
  function handleNewRequestValidation(e, newRequest) {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Validate fields if it has data
    if (!newRequest.requestTypeId) {
      alert("Please select a request type.");
      return;
    }

    if (!newRequest.from) {
      alert("Please select a from date.");
      return;
    }

    if (!newRequest.to) {
      alert("Please select a to date.");
      return;
    }

    if (!newRequest.remarks) {
      alert("Please enter a remarks.");
      return;
    }

    // If all fields are valid, proceed to submit the new request
    handleSubmitNewRequest(newRequest);
  }

  // Function to handle the submission of a new request
  function handleSubmitNewRequest(newRequest) {
    // Update the requestData state with the new request
    setRequestData((prevRequestData) => [...prevRequestData, newRequest]);

    // Close the new request form
    setNewRequestIsOpen(false);
  }

  // Function to handle canceling the new request form
  function handleCancelNewRequest(e) {
    // Close the new request form without submitting
    e.preventDefault();

    // Reset the new request form state
    setNewRequestIsOpen(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <RequestList
          requestData={requestData}
          onSelectRequest={handleSelectRequest}
          toogleNewRequestForm={toogleNewRequestForm}
        />
      </div>
      <div className="main-content">
        {newRequestIsOpen && (
          <NewRequestForm
            onSubmit={handleNewRequestValidation}
            onCancel={handleCancelNewRequest}
          />
        )}
        {viewRequestIsOpen && (
          <ViewRequestForm
            request={selectedRequest}
            onCancelRequest={handleCancelRequest}
            initialRequestTypes={initialRequestTypes}
          />
        )}
      </div>
    </div>
  );
}

// Component to display the list of leave requests
function RequestList({ requestData, onSelectRequest, toogleNewRequestForm }) {
  return (
    <>
      <button onClick={toogleNewRequestForm}>Create New Request</button>
      <ul>
        {requestData.map((request) => (
          <Request
            key={request.id}
            request={request}
            onSelectRequest={onSelectRequest}
            initialRequestTypes={initialRequestTypes}
          />
        ))}
      </ul>
    </>
  );
}

// Component to display individual leave requests
function Request({ request, onSelectRequest }) {
  const requestTypes = initialRequestTypes;

  return (
    <li onClick={() => onSelectRequest(request)}>
      <p>
        {/* // Display the request type based on the requestTypeId */}
        {requestTypes
          .filter((requestType) => requestType.id === request.requestTypeId)
          .map((request) => request.requestType)}
      </p>
      <p>
        From {request.from} to {request.to}
      </p>
      <p>{request.status}</p>
    </li>
  );
}

// Component for the new request form
function NewRequestForm({ onSubmit, onCancel }) {
  const requestTypes = initialRequestTypes;

  // State to manage the form inputs
  const [requestTypeId, setRequestTypeId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [remarks, setRemarks] = useState("");

  // New request object to be submitted
  const newRequest = {
    id: Date.now() + Math.random(),
    requestTypeId: Number(requestTypeId),
    from: fromDate,
    to: toDate,
    remarks,
    status: "Pending",
  };

  return (
    <form>
      <label>Request Type :</label>
      <select
        value={requestTypeId}
        onChange={(e) => setRequestTypeId(e.target.value)}
      >
        <option value="" disabled>
          --select request type--
        </option>
        {/* // Map through requestTypes to create optionss */}
        {requestTypes.map((requestType) => (
          <option key={requestType.id} value={requestType.id}>
            {requestType.requestType}
          </option>
        ))}
      </select>

      <label>From :</label>
      <input
        placeholder="--select date--"
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")}
        name="from"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
      />

      <label>To :</label>
      <input
        placeholder="--select date--"
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")}
        name="to"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
      />

      <label>Remarks :</label>
      <textarea
        placeholder="--remarks--"
        name="remarks"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
      />

      <button onClick={(e) => onSubmit(e, newRequest)}>Submit</button>
      <button onClick={(e) => onCancel(e)}>Cancel</button>
    </form>
  );
}

// Component to view a specific leave request
function ViewRequestForm({ request, onCancelRequest }) {
  const requestTypes = initialRequestTypes;

  return (
    <div className="view-request">
      <h2>
        {/* // Display the request type based on the requestTypeId */}
        {requestTypes
          .filter((requestType) => requestType.id === request?.requestTypeId)
          .map((request) => request.requestType)}
      </h2>
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
