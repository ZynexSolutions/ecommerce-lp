import { NextRequest, NextResponse } from "next/server";
import Airtable from "airtable";

export async function POST(request: NextRequest) {
  const { firstName, lastName, email, phone, subject, message } =
    await request.json();

  Airtable.configure({
    apiKey: process.env.AIRTABLE_PAT,
  });

  const base = Airtable.base(process.env.AIRTABLE_BASE_ID); // Replace with your Airtable base ID
  const table = base("Contact Forms"); // Replace with your Airtable table name

  try {
    const createdRecord = await table.create({
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
    });

    return NextResponse.json({ success: true, record: createdRecord });
  } catch (error) {
    console.error("Error creating record:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
