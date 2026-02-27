/* ─────────────────────────────────────────────────────────────────────────
   Mock API handlers using axios-mock-adapter.
   Imported in main.tsx only when VITE_USE_MOCK=true (or default in dev).
   ───────────────────────────────────────────────────────────────────────── */
import MockAdapter from "axios-mock-adapter";
import api from "./api";
import {
  MOCK_CITIZEN,
  MOCK_OFFICER,
  MOCK_TOKEN,
  MOCK_POLICE_TOKEN,
  MOCK_COMPLAINTS,
  MOCK_DASHBOARD_STATS,
  getMockAIResponse,
  generateTrackingId,
} from "./mockData";

/* Simulate network delay (ms) */
const DELAY = 400;

let submittedComplaints = [...MOCK_COMPLAINTS];

export function setupMockHandlers() {
  const mock = new MockAdapter(api, { delayResponse: DELAY, onNoMatch: "throwException" });

  /* ── Citizen Auth ──────────────────────────────────────────────────────── */

  // Send mobile OTP — accepts any 10-digit number
  mock.onPost("/api/auth/send-mobile-otp").reply(() => {
    return [200, { success: true, message: "OTP sent (mock: use 123456)" }];
  });

  // Verify mobile OTP — any number with OTP 123456
  mock.onPost("/api/auth/mobile/login").reply((config) => {
    const body = JSON.parse(config.data ?? "{}");
    if (body.otp !== "123456") {
      return [400, { error: "Invalid OTP. Use 123456 for demo." }];
    }
    return [
      200,
      {
        user: { ...MOCK_CITIZEN, mobileNumber: body.mobile ?? "9876543210" },
        accessToken: MOCK_TOKEN,
      },
    ];
  });

  // Send Aadhaar OTP
  mock.onPost("/api/auth/send-otp").reply((config) => {
    const body = JSON.parse(config.data ?? "{}");
    const raw: string = body.aadhaar ?? "000000000000";
    const masked = `XXXX-XXXX-${raw.slice(-4)}`;
    return [200, { success: true, aadhaarMasked: masked }];
  });

  // Verify Aadhaar OTP → register/login citizen
  mock.onPost("/api/auth/verify-otp").reply((config) => {
    const body = JSON.parse(config.data ?? "{}");
    if (body.otp !== "123456") {
      return [400, { error: "Invalid OTP. Use 123456 for demo." }];
    }
    return [
      200,
      {
        user: { ...MOCK_CITIZEN },
        accessToken: MOCK_TOKEN,
      },
    ];
  });

  // Citizen logout
  mock.onPost("/api/auth/logout").reply(200, { success: true });

  // Citizen token refresh — return 401 to let the interceptor clear state
  mock.onPost("/api/auth/refresh").reply(401, { error: "Session expired" });

  /* ── Police Auth ───────────────────────────────────────────────────────── */

  // Officer login — demo: admin@reva.gov.in / Admin@123
  mock.onPost("/api/police/auth/login").reply((config) => {
    const body = JSON.parse(config.data ?? "{}");
    if (
      body.email === "admin@reva.gov.in" &&
      body.password === "Admin@123"
    ) {
      return [200, { officer: MOCK_OFFICER, accessToken: MOCK_POLICE_TOKEN }];
    }
    return [401, { error: "Invalid credentials. Use admin@reva.gov.in / Admin@123" }];
  });

  // Officer logout
  mock.onPost("/api/police/auth/logout").reply(200, { success: true });

  // Officer token refresh — return 401
  mock.onPost("/api/police/auth/refresh").reply(401, { error: "Session expired" });

  /* ── Citizen Complaints ────────────────────────────────────────────────── */

  // Get my complaints
  mock.onGet("/api/complaints/my").reply(200, {
    complaints: submittedComplaints.map((c) => ({
      trackingId: c.trackingId,
      incidentType: c.incidentType,
      status: c.status,
      priorityLevel: c.priorityLevel,
      isEmergency: c.isEmergency,
      createdAt: c.createdAt,
    })),
  });

  // Track / detail for citizen
  mock.onGet(/\/api\/complaints\/track\/(.+)/).reply((config) => {
    const id = config.url?.split("/").pop();
    const complaint = submittedComplaints.find((c) => c.trackingId === id);
    if (!complaint) return [404, { error: "Complaint not found." }];
    return [200, { complaint }];
  });

  // Start AI chat session
  mock.onPost("/api/complaints/start-session").reply(200, {
    sessionId: `session-${Date.now()}`,
    greeting:
      "Hello! I'm your AI-guided incident reporting assistant. Please describe the incident in your own words — what happened, where, and when.",
  });

  // Chat turn
  mock.onPost("/api/complaints/chat").reply((config) => {
    const body = JSON.parse(config.data ?? "{}");
    const { response, isComplete } = getMockAIResponse(body.message ?? "");
    return [200, { response, isComplete }];
  });

  // Submit complaint
  mock.onPost("/api/complaints/submit").reply(() => {
    const trackingId = generateTrackingId();
    const newComplaint = {
      trackingId,
      incidentType: "GENERAL",
      status: "SUBMITTED",
      priorityLevel: "MEDIUM",
      isEmergency: false,
      createdAt: new Date().toISOString(),
      locationAddress: "",
      latitude: null,
      longitude: null,
      aiSummary: "Complaint submitted via AI chat. Under review.",
      station: null,
      updates: [
        {
          updateType: "COMPLAINT_RECEIVED",
          content: "Your complaint has been received and is under review.",
          createdAt: new Date().toISOString(),
        },
      ],
      evidences: [],
      _count: { evidences: 0 },
    };
    submittedComplaints = [newComplaint, ...submittedComplaints];
    return [200, { complaint: { trackingId } }];
  });

  /* ── Officer / Police endpoints ────────────────────────────────────────── */

  // Dashboard
  mock.onGet("/api/police/dashboard").reply(200, {
    stats: MOCK_DASHBOARD_STATS,
    recentComplaints: submittedComplaints.slice(0, 10).map((c) => ({
      trackingId: c.trackingId,
      incidentType: c.incidentType,
      status: c.status,
      priorityLevel: c.priorityLevel,
      isEmergency: c.isEmergency,
      createdAt: c.createdAt,
      _count: c._count,
    })),
  });

  // Officer case detail
  mock.onGet(/\/api\/police\/complaints\/(.+)/).reply((config) => {
    // Ignore PATCH requests, only handle GET
    const id = config.url?.split("/").pop();
    const complaint = submittedComplaints.find((c) => c.trackingId === id);
    if (!complaint) return [404, { error: "Case not found." }];
    return [200, { complaint }];
  });

  // Officer update status
  mock.onPatch(/\/api\/police\/complaints\/(.+)/).reply((config) => {
    const id = config.url?.split("/").pop()?.split("?")[0];
    const body = JSON.parse(config.data ?? "{}");
    submittedComplaints = submittedComplaints.map((c) =>
      c.trackingId === id ? { ...c, status: body.status ?? c.status } : c
    );
    return [200, { success: true }];
  });

  // Officer add note
  mock.onPost(/\/api\/police\/complaints\/.+\/notes/).reply((config) => {
    const parts = config.url?.split("/") ?? [];
    const id = parts[parts.length - 2]; // /api/police/complaints/:id/notes
    const body = JSON.parse(config.data ?? "{}");
    submittedComplaints = submittedComplaints.map((c) => {
      if (c.trackingId !== id) return c;
      return {
        ...c,
        updates: [
          ...c.updates,
          {
            updateType: "OFFICER_NOTE",
            content: body.note ?? "",
            createdAt: new Date().toISOString(),
          },
        ],
      };
    });
    return [200, { success: true }];
  });

  console.info(
    "%c[MOCK MODE] All API calls are intercepted — no backend required.",
    "color:#0F766E;font-weight:bold;"
  );
}
