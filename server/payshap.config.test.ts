import { describe, expect, it } from "vitest";

const hasPayShapConfig = Boolean(
  process.env.PAYSHAP_SHAP_ID && process.env.PAYSHAP_RECIPIENT_NAME
);

describe.skipIf(!hasPayShapConfig)("PayShap recipient configuration", () => {
  it("has a configured recipient identifier and can reach the PayShap public service endpoint", async () => {
    const shapId = process.env.PAYSHAP_SHAP_ID;
    const recipientName = process.env.PAYSHAP_RECIPIENT_NAME;
    expect(shapId, "PAYSHAP_SHAP_ID must be configured").toMatch(/^\+?[0-9-]+@CAPITEC$/i);
    expect(recipientName, "PAYSHAP_RECIPIENT_NAME must be configured").toMatch(/\S/);

    const response = await fetch("https://www.payshap.co.za/", {
      headers: { "User-Agent": "Kamvai configuration verifier" },
    });
    expect(
      [200, 403],
      "PayShap public service endpoint should be reachable; a 403 is an expected anti-bot response"
    ).toContain(response.status);
  }, 15_000);
});

// Configure PAYSHAP_SHAP_ID and PAYSHAP_RECIPIENT_NAME in the launch environment
// to enable this production-readiness check.
