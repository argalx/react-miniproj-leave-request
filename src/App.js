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

// Initial data for Status
const initialStatusData = [
  {
    id: 1,
    status: "Pending For Approval",
  },
  {
    id: 2,
    status: "Approved",
  },
  {
    id: 3,
    status: "Rejected",
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
    statusId: 2,
  },
  {
    id: 2,
    employeeId: 15615,
    requestTypeId: 2,
    from: "07-03-2023",
    to: "07-05-2023",
    remarks: "Medical reasons",
    statusId: 1,
  },
  {
    id: 3,
    employeeId: 15615,
    requestTypeId: 3,
    from: "07-06-2023",
    to: "07-06-2023",
    remarks: "Personal matters",
    statusId: 3,
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

  // State to manage the user data
  const [user, setUser] = useState(null);

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

  // Function to handle user selection
  function handleUserSelect(employeeId) {
    setUser(employeeId);

    setViewRequestIsOpen(false);
    setNewRequestIsOpen(false);
  }

  // Function to filter request data based on the selected user
  function filterRequestData(currentUser, requestType) {
    const initialRequestData = requestData;
    const userData = initialUserData;

    let filteredData = [];

    if (requestType === "MyRequests") {
      filteredData = initialRequestData.filter(
        (request) => request.employeeId === currentUser
      );
    }

    if (requestType === "ForApproval") {
      filteredData = userData
        .filter((user) => user.managerId === currentUser)
        // flatMap = Maps over the array and flattens them into single array.
        .flatMap((user) =>
          requestData.filter(
            (request) =>
              request.employeeId === user.employeeId && request.statusId === 1
          )
        );
    }

    return filteredData;
  }

  // Function to handle request approval
  function handleRequestApproval(id, status) {
    // Update status of current request
    setRequestData((requestData) =>
      // Map through each request record
      requestData.map((request) =>
        // Check if currect request match the ID of request that needs to be updated and set its status to 2 = Approved, 3 = Rejected
        request.id === id ? { ...request, statusId: status } : request
      )
    );

    // Reset View Form
    setViewRequestIsOpen(false);

    // Alert based on approval action
    status === 2 && alert("Request Approved");
    status === 3 && alert("Request Rejected");
  }

  // Function to handle Request Type Look-Up
  function handleRequestTypeLookUp(requestTypeId) {
    const requestTypeData = initialRequestTypes;

    return requestTypeData
      .filter((requestType) => requestType.id === requestTypeId)
      .map((requestType) => requestType.requestType);
  }

  // Function to handle User Data Look-Up
  function handleUserLookUp(employeeId) {
    const userData = initialUserData;

    return userData
      .filter((user) => user.employeeId === employeeId)
      .map((user) => `${user.firstName} ${user.lastName}`);
  }

  // Function to handle Status Data Look-Up
  function handleStatusLookUp(statusId) {
    const statusData = initialStatusData;

    return statusData
      .filter((status) => status.id === statusId)
      .map((status) => status.status);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <User
          // Data
          initialUserData={initialUserData}
          // Function
          onUserSelect={handleUserSelect}
        />
        <br />
        {/* // Button to create a new request, only visible if a user is selected */}
        {user && (
          <button onClick={toogleNewRequestForm}>Create New Request</button>
        )}
        {/* My Request List */}
        <RequestList
          // Data
          requestData={filterRequestData(user, "MyRequests")}
          currentUser={user}
          // Function
          onSelectRequest={handleSelectRequest}
          toogleNewRequestForm={toogleNewRequestForm}
          onRequestTypeLookUp={handleRequestTypeLookUp}
          onStatusLookUp={handleStatusLookUp}
        >
          My Requests
        </RequestList>

        {/* For Approval Lists */}
        <RequestList
          // Data
          requestData={filterRequestData(user, "ForApproval")}
          // Function
          onSelectRequest={handleSelectRequest}
          toogleNewRequestForm={toogleNewRequestForm}
          onRequestTypeLookUp={handleRequestTypeLookUp}
          onUserLookUp={handleUserLookUp}
          onStatusLookUp={handleStatusLookUp}
        >
          For Approval
        </RequestList>
      </div>
      <div className="main-content">
        {newRequestIsOpen && (
          <NewRequestForm
            // Data
            currentUser={user}
            // Function
            onSubmit={handleNewRequestValidation}
            onCancel={handleCancelNewRequest}
          />
        )}
        {viewRequestIsOpen && (
          <ViewRequestForm
            // Data
            currentUser={user}
            request={selectedRequest}
            // Function
            onCancelRequest={handleCancelRequest}
            onRequestApproval={handleRequestApproval}
            onRequestTypeLookUp={handleRequestTypeLookUp}
            onStatusLookUp={handleStatusLookUp}
            onUserLookUp={handleUserLookUp}
          />
        )}
      </div>
    </div>
  );
}

// Component to manage user data
function User({
  // Data
  initialUserData,
  // Function
  onUserSelect,
}) {
  const userData = initialUserData;

  return (
    <select
      defaultValue=""
      onChange={(e) => onUserSelect(Number(e?.target.value))}
    >
      <option value="" disabled>
        --Select User--
      </option>
      {userData.map((user) => (
        <option
          key={user.employeeId}
          value={user.employeeId}
        >{`${user.firstName} ${user.lastName}`}</option>
      ))}
    </select>
  );
}

// Component to display the list of leave requests
function RequestList({
  // Function
  requestData,
  onSelectRequest,
  children,
  currentUser,
  onRequestTypeLookUp,
  onUserLookUp,
  onStatusLookUp,
}) {
  return (
    <>
      <h2>{children}</h2>
      <ul>
        {requestData.map((request) => (
          <Request
            key={request.id}
            request={request}
            onSelectRequest={onSelectRequest}
            onStatusLookUp={onStatusLookUp}
          >
            {/* // Display the request type based on the requestTypeId */}
            {currentUser !== request.employeeId
              ? `${onUserLookUp(request.employeeId)} ${onRequestTypeLookUp(
                  request.requestTypeId
                )} Request`
              : onRequestTypeLookUp(request.requestTypeId)}
          </Request>
        ))}
      </ul>
    </>
  );
}

// Component to display individual leave requests
function Request({
  // Data
  request,
  children,
  // Function
  onSelectRequest,
  onStatusLookUp,
}) {
  return (
    <li onClick={() => onSelectRequest(request)}>
      <p>{children}</p>
      <p>
        From {request.from} to {request.to}
      </p>
      <p>{onStatusLookUp(request.statusId)}</p>
    </li>
  );
}

// Component for the new request form
function NewRequestForm({
  // Data
  currentUser,
  // Function
  onSubmit,
  onCancel,
}) {
  const requestTypes = initialRequestTypes;

  // State to manage the form inputs
  const [requestTypeId, setRequestTypeId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [remarks, setRemarks] = useState("");

  // New request object to be submitted
  const newRequest = {
    id: Date.now() + Math.random(),
    employeeId: currentUser,
    requestTypeId: Number(requestTypeId),
    from: fromDate,
    to: toDate,
    remarks,
    statusId: 1,
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
function ViewRequestForm({
  // Data
  currentUser,
  request,
  // Function
  onCancelRequest,
  onRequestApproval,
  onStatusLookUp,
  onRequestTypeLookUp,
  onUserLookUp,
}) {
  return (
    <div className="view-request">
      <h2>
        {/* // Display the request type based on the requestTypeId */}
        {currentUser !== request?.employeeId
          ? `${onUserLookUp(request?.employeeId)} ${onRequestTypeLookUp(
              request?.requestTypeId
            )} Request`
          : onRequestTypeLookUp(request?.requestTypeId)}
      </h2>
      <label>From :</label>
      <span>{request?.from}</span>
      <label>To :</label>
      <span>{request?.to}</span>
      <label>Remarks :</label>
      <span>{request?.remarks}</span>
      <label>Status :</label>
      <span>{onStatusLookUp(request?.statusId)}</span>
      {/* // Conditional rendering of buttons based on request status current user viewing the request */}
      {currentUser !== request?.employeeId
        ? request?.statusId === 1 && (
            <>
              <button onClick={() => onRequestApproval(request.id, 2)}>
                Approve
              </button>
              <button onClick={() => onRequestApproval(request.id, 3)}>
                Reject
              </button>
            </>
          )
        : request?.statusId === 1 && (
            <button onClick={() => onCancelRequest(request?.id)}>
              Cancel Request
            </button>
          )}
    </div>
  );
}
