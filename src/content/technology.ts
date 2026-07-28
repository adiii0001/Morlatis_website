/** Technology & standards the Group engineers against. */

export const protocolStack = [
  {
    code: "IEC 61850",
    name: "Substation Automation",
    body: "Station bus architecture, GOOSE messaging and IED interoperability for digital protection schemes.",
  },
  {
    code: "IEC 60870-5",
    name: "Telecontrol",
    body: "101 and 104 profiles carrying telemetry and control between remote terminal units and control centres.",
  },
  {
    code: "DNP3",
    name: "Distributed Network Protocol",
    body: "Event-driven data acquisition across mixed-vendor distribution automation estates.",
  },
  {
    code: "Modbus",
    name: "Field Device Interface",
    body: "Serial and TCP interfacing to meters, drives, relays and auxiliary field instrumentation.",
  },
] as const;

export const capabilities = [
  {
    title: "Protection & Control",
    body: "Coordination studies, relay setting calculation, scheme design and injection testing.",
    points: ["Fault level analysis", "Grading & coordination", "Scheme verification"],
  },
  {
    title: "Telemetry & Supervision",
    body: "RTU and FRTU deployment feeding centralised SCADA with alarm, event and historian layers.",
    points: ["Point list engineering", "Comms architecture", "Historian & reporting"],
  },
  {
    title: "Field Execution",
    body: "Erection, termination, testing and commissioning under live-network outage governance.",
    points: ["Outage planning", "Safety protocol", "Documented handover"],
  },
  {
    title: "Lifecycle Support",
    body: "Multi-year maintenance covering preventive schedules, breakdown response and firmware management.",
    points: ["Preventive schedules", "Breakdown response", "Asset condition data"],
  },
] as const;
