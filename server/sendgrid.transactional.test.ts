import { describe, expect, it } from "vitest";
import { getSendGridOtpConfig } from "./sendgrid";

const hasSendGridConfig = Boolean(
  process.env.SENDGRID_API_KEY &&
    process.env.SENDGRID_FROM_EMAIL &&
    process.env.SENDGRID_OTP_TEMPLATE_ID
);

describe.skipIf(!hasSendGridConfig)("SendGrid transactional delivery configuration", () => {
  it("has the verified sender, API key, and template configuration required for OTP and transactional mail", () => {
    const config = getSendGridOtpConfig();
    expect(config).toMatchObject({
      from: expect.stringMatching(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      templateId: expect.stringMatching(/^d-[a-f0-9]{32}$/),
    });
    expect(config?.apiKey.length).toBeGreaterThan(20);
  });
});

// Configure SendGrid variables in the launch environment to enable this check.
