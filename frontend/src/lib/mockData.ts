/* ─────────────────────────────────────────────────────────────────────────
   Mock data for frontend-only development / testing
   ───────────────────────────────────────────────────────────────────────── */

export const MOCK_CITIZEN = {
  id: "citizen-001",
  name: "Ravi Kumar",
  mobileNumber: "9876543210",
  isVerified: true,
  language: "en",
  isAnonymous: false,
};

export const MOCK_OFFICER = {
  id: "officer-001",
  name: "Inspector Priya Sharma",
  email: "admin@reva.gov.in",
  role: "OFFICER" as const,
  station: {
    id: "station-001",
    stationName: "Reva Central Police Station",
    district: "Rewa",
    state: "Madhya Pradesh",
  },
};

export const MOCK_TOKEN = "mock.access.token.dev";
export const MOCK_POLICE_TOKEN = "mock.police.token.dev";

/* ── Complaints ─────────────────────────────────────────────────────────── */
export const MOCK_COMPLAINTS = [
  {
    trackingId: "PJ-2025-00001",
    incidentType: "THEFT",
    status: "INVESTIGATING",
    priorityLevel: "HIGH",
    isEmergency: false,
    createdAt: "2025-02-10T08:30:00Z",
    locationAddress: "MG Road, Rewa, MP",
    latitude: 24.533,
    longitude: 81.3,
    aiSummary:
      "Citizen reports theft of motorcycle near MG Road. Vehicle left unattended for 20 minutes. No witnesses.",
    station: {
      id: "station-001",
      stationName: "Reva Central Police Station",
      district: "Rewa",
      state: "Madhya Pradesh",
    },
    updates: [
      {
        updateType: "COMPLAINT_RECEIVED",
        content: "Complaint has been registered and assigned.",
        createdAt: "2025-02-10T08:35:00Z",
      },
      {
        updateType: "OFFICER_ASSIGNED",
        content: "Inspector Sharma has been assigned to your case.",
        createdAt: "2025-02-10T10:00:00Z",
      },
    ],
    evidences: [
      { fileName: "cctv_frame_001.jpg", url: "#" },
      { fileName: "witness_statement.pdf", url: "#" },
    ],
    _count: { evidences: 2 },
  },
  {
    trackingId: "PJ-2025-00002",
    incidentType: "HARASSMENT",
    status: "SUBMITTED",
    priorityLevel: "MEDIUM",
    isEmergency: false,
    createdAt: "2025-02-18T14:15:00Z",
    locationAddress: "Station Road, Rewa, MP",
    latitude: null,
    longitude: null,
    aiSummary: "Verbal harassment reported near Station Road. Complainant requests confidential handling.",
    station: null,
    updates: [
      {
        updateType: "COMPLAINT_RECEIVED",
        content: "Complaint received and under initial review.",
        createdAt: "2025-02-18T14:20:00Z",
      },
    ],
    evidences: [],
    _count: { evidences: 0 },
  },
  {
    trackingId: "PJ-2025-00003",
    incidentType: "ROAD_ACCIDENT",
    status: "RESOLVED",
    priorityLevel: "CRITICAL",
    isEmergency: true,
    createdAt: "2025-01-25T06:45:00Z",
    locationAddress: "NH-7, Near Bypass, Rewa",
    latitude: 24.55,
    longitude: 81.32,
    aiSummary:
      "Multi-vehicle road accident on NH-7. Two persons injured; ambulance dispatched. FIR filed. Case closed after medical recovery.",
    station: {
      id: "station-001",
      stationName: "Reva Central Police Station",
      district: "Rewa",
      state: "Madhya Pradesh",
    },
    updates: [
      {
        updateType: "COMPLAINT_RECEIVED",
        content: "Emergency complaint received.",
        createdAt: "2025-01-25T06:47:00Z",
      },
      {
        updateType: "OFFICER_ASSIGNED",
        content: "Sub-Inspector Mehta deployed to accident site.",
        createdAt: "2025-01-25T07:00:00Z",
      },
      {
        updateType: "STATUS_CHANGED",
        content: "Case resolved. Victims discharged from hospital.",
        createdAt: "2025-02-01T12:00:00Z",
      },
    ],
    evidences: [
      { fileName: "accident_photo_1.jpg", url: "#" },
      { fileName: "fir_copy.pdf", url: "#" },
      { fileName: "medical_report.pdf", url: "#" },
    ],
    _count: { evidences: 3 },
  },
  {
    trackingId: "PJ-2025-00004",
    incidentType: "DOMESTIC_VIOLENCE",
    status: "IN_PROGRESS",
    priorityLevel: "HIGH",
    isEmergency: false,
    createdAt: "2025-02-22T19:30:00Z",
    locationAddress: "Civil Lines, Rewa, MP",
    latitude: 24.52,
    longitude: 81.29,
    aiSummary:
      "Domestic violence reported. Victim seeking shelter and legal support. Assigned to women's cell.",
    station: {
      id: "station-001",
      stationName: "Reva Central Police Station",
      district: "Rewa",
      state: "Madhya Pradesh",
    },
    updates: [
      {
        updateType: "COMPLAINT_RECEIVED",
        content: "Complaint received and escalated to women's cell.",
        createdAt: "2025-02-22T19:35:00Z",
      },
    ],
    evidences: [],
    _count: { evidences: 0 },
  },
  {
    trackingId: "PJ-2025-00005",
    incidentType: "CYBER_CRIME",
    status: "SUBMITTED",
    priorityLevel: "MEDIUM",
    isEmergency: false,
    createdAt: "2025-02-25T11:00:00Z",
    locationAddress: "Online / Digital",
    latitude: null,
    longitude: null,
    aiSummary:
      "Victim received fraudulent UPI payment requests claiming to be from bank. Financial loss of ₹12,000.",
    station: null,
    updates: [
      {
        updateType: "COMPLAINT_RECEIVED",
        content: "Cyber complaint registered. Forwarded to Cyber Crime Cell.",
        createdAt: "2025-02-25T11:05:00Z",
      },
    ],
    evidences: [{ fileName: "transaction_screenshot.png", url: "#" }],
    _count: { evidences: 1 },
  },
];

/* ── Officer dashboard stats ────────────────────────────────────────────── */
export const MOCK_DASHBOARD_STATS = {
  total: 142,
  highPriority: 18,
  pending: 34,
  inProgress: 27,
  resolved: 81,
  closed: 12,
};

/* ── AI Chat conversation script ────────────────────────────────────────── */
const CHAT_SCRIPT = [
  {
    keywords: ["hello", "hi", "start", "begin"],
    response:
      "I understand. Could you briefly describe what happened? For example: type of incident, location, and time.",
    isComplete: false,
  },
  {
    keywords: ["theft", "stolen", "robbery", "steal"],
    response:
      "I'm sorry to hear that. Was there any physical harm involved? Can you describe the items stolen or the person responsible?",
    isComplete: false,
  },
  {
    keywords: ["accident", "crash", "collision", "hit"],
    response:
      "That sounds serious. Were there any injuries? Can you confirm the exact location and approximate time of the accident?",
    isComplete: false,
  },
  {
    keywords: ["harassment", "bother", "threat", "threaten"],
    response:
      "Your safety is a priority. Would you like to report this confidentially? Please provide the time, location, and a brief description.",
    isComplete: false,
  },
  {
    keywords: ["help", "please", "need"],
    response:
      "I'm here to help. Please describe the incident — including what happened, where it happened, and when.",
    isComplete: false,
  },
];

const COMPLETION_KEYWORDS = ["done", "submit", "finish", "complete", "that's all", "thats all", "end"];

const GENERIC_RESPONSES = [
  "Thank you for sharing that. Can you provide any additional details — such as time, location, or description of the person involved?",
  "Noted. Is there anything else you'd like to add to your report?",
  "I've recorded that information. Do you have any witnesses or evidence like photos or videos to attach?",
  "Got it. Your report is taking shape. Any more details would help the investigation.",
];

let genericIdx = 0;

export function getMockAIResponse(message: string): { response: string; isComplete: boolean } {
  const lower = message.toLowerCase();

  if (COMPLETION_KEYWORDS.some((k) => lower.includes(k))) {
    return {
      response:
        "Thank you. I have collected all the necessary details. Please click 'Submit Report' to file your complaint and receive your tracking ID.",
      isComplete: true,
    };
  }

  for (const entry of CHAT_SCRIPT) {
    if (entry.keywords.some((k) => lower.includes(k))) {
      return { response: entry.response, isComplete: entry.isComplete };
    }
  }

  const resp = GENERIC_RESPONSES[genericIdx % GENERIC_RESPONSES.length];
  genericIdx++;
  return { response: resp, isComplete: false };
}

/* ── Utility: generate a tracking ID ───────────────────────────────────── */
let caseCounter = 6;
export function generateTrackingId(): string {
  const id = `PJ-2025-0000${caseCounter}`;
  caseCounter++;
  return id;
}
