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
  return (
    <>
      <RequestList />
      <NewRequestForm />
      <ViewRequestForm />
    </>
  );
}

// Component to display the list of leave requests
function RequestList() {
  return (
    <div>
      <ul>
        {initialRequestData.map((request) => (
          <Request key={request.id} request={request} />
        ))}
      </ul>
    </div>
  );
}

// Component to display individual leave requests
function Request({ request }) {
  return (
    <li>
      <p>{request.requestType}</p>
      <p>
        From {request.from} to {request.to}
      </p>
      <p>{request.status}</p>
    </li>
  );
}

function NewRequestForm() {
  return (
    <div>
      <h2>New Request Form</h2>
      {/* Form to create a new leave request will be displayed here */}
    </div>
  );
}

function ViewRequestForm() {
  return (
    <div>
      <h2>View Request Form</h2>
      {/* Form to view a specific leave request will be displayed here */}
    </div>
  );
}
