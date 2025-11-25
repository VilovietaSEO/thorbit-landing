import { NextRequest, NextResponse } from "next/server";

// GoHighLevel API configuration
const GHL_API_URL = "https://services.leadconnectorhq.com/contacts/upsert";
const GHL_API_VERSION = "2021-07-28";

interface FormSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  businessSize: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

interface CustomField {
  id: string;
  field_value: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: FormSubmission = await request.json();

    // Validate required fields
    const requiredFields = ["firstName", "lastName", "email", "phone", "companyName", "businessSize"];
    for (const field of requiredFields) {
      if (!body[field as keyof FormSubmission]) {
        return NextResponse.json(
          { success: false, message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Get environment variables
    const apiToken = process.env.GHL_API_TOKEN;
    const locationId = process.env.GHL_LOCATION_ID;

    if (!apiToken || !locationId) {
      console.error("Missing GHL configuration:", { hasToken: !!apiToken, hasLocationId: !!locationId });
      return NextResponse.json(
        { success: false, message: "Server configuration error" },
        { status: 500 }
      );
    }

    // Build custom fields array for UTM parameters and business size
    const customFields: CustomField[] = [];

    // Business Size custom field
    const businessSizeFieldId = process.env.GHL_BUSINESS_SIZE_FIELD_ID;
    if (businessSizeFieldId && body.businessSize) {
      customFields.push({
        id: businessSizeFieldId,
        field_value: body.businessSize,
      });
    }

    // UTM custom fields
    const utmFieldMappings = [
      { param: "utm_source", envKey: "GHL_UTM_SOURCE_FIELD_ID" },
      { param: "utm_medium", envKey: "GHL_UTM_MEDIUM_FIELD_ID" },
      { param: "utm_campaign", envKey: "GHL_UTM_CAMPAIGN_FIELD_ID" },
      { param: "utm_term", envKey: "GHL_UTM_TERM_FIELD_ID" },
      { param: "utm_content", envKey: "GHL_UTM_CONTENT_FIELD_ID" },
    ];

    for (const mapping of utmFieldMappings) {
      const fieldId = process.env[mapping.envKey];
      const value = body[mapping.param as keyof FormSubmission];
      if (fieldId && value) {
        customFields.push({
          id: fieldId,
          field_value: value as string,
        });
      }
    }

    // Build GHL API request body
    const ghlPayload = {
      locationId,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      companyName: body.companyName,
      source: "Website - Book Demo",
      tags: ["website-lead", "demo-request"],
      customFields: customFields.length > 0 ? customFields : undefined,
    };

    // Send to GoHighLevel
    const ghlResponse = await fetch(GHL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
        Version: GHL_API_VERSION,
      },
      body: JSON.stringify(ghlPayload),
    });

    if (!ghlResponse.ok) {
      const errorData = await ghlResponse.json().catch(() => ({}));
      console.error("GHL API Error:", {
        status: ghlResponse.status,
        statusText: ghlResponse.statusText,
        error: errorData,
      });

      // Return user-friendly error messages based on status
      if (ghlResponse.status === 401) {
        return NextResponse.json(
          { success: false, message: "Server authentication error" },
          { status: 500 }
        );
      }
      if (ghlResponse.status === 422) {
        return NextResponse.json(
          { success: false, message: "Invalid form data" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { success: false, message: "Failed to submit form" },
        { status: 500 }
      );
    }

    const result = await ghlResponse.json();

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
      contactId: result.contact?.id,
    });
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
