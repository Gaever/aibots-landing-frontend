import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { contact, type } = data; // type: 'phone' | 'telegram'

    // Validation
    if (!contact) {
      return NextResponse.json({ error: 'Contact is required' }, { status: 400 });
    }

    const AMOCRM_API_TOKEN = process.env.AMOCRM_API_TOKEN;
    const AMOCRM_BASE_URL = process.env.AMOCRM_BASE_URL; // e.g., https://yoursubdomain.amocrm.ru

    // Field IDs from Environment - crucial for robust integration
    const PHONE_FIELD_ID = Number(process.env.AMOCRM_PHONE_FIELD_ID || 0);
    const TELEGRAM_FIELD_ID = Number(process.env.AMOCRM_TELEGRAM_FIELD_ID || 0);

    if (!AMOCRM_API_TOKEN || !AMOCRM_BASE_URL) {
      console.error('AmoCRM credentials not configured');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    if (type === 'phone' && !PHONE_FIELD_ID) {
      console.warn('AMOCRM_PHONE_FIELD_ID is not set. Contact will be created without phone number.');
    }
    if (type === 'telegram' && !TELEGRAM_FIELD_ID) {
      console.warn('AMOCRM_TELEGRAM_FIELD_ID is not set. Contact will be created without telegram username.');
    }

    // Prepare Custom Fields for the CONTACT
    const contactCustomFields = [];

    if (type === 'phone' && PHONE_FIELD_ID) {
      contactCustomFields.push({
        field_id: PHONE_FIELD_ID,
        values: [{ value: contact }]
      });
    } else if (type === 'telegram' && TELEGRAM_FIELD_ID) {
      contactCustomFields.push({
        field_id: TELEGRAM_FIELD_ID,
        values: [{ value: contact }]
      });
    } else {
      // Fallback if IDs are missing but we want to save *something*
      // Note: Without IDs, you can try field_code='PHONE' or 'EMAIL' for standard fields, but custom fields require IDs usually.
      // For Phone, standard code is 'PHONE'.
      if (type === 'phone') {
        contactCustomFields.push({
          field_code: 'PHONE',
          values: [{ value: contact }]
        });
      }
      // Telegram has no standard code, usually.
    }

    // Construct the "Complex" payload
    // This creates a Lead + Linked Contact in one atomic request

    // Check for Consent Field ID
    const CONSENT_FIELD_ID = Number(process.env.AMOCRM_CONSENT_FIELD_ID || 0);

    // If consent is true and we have a field ID, add it to custom fields
    if (CONSENT_FIELD_ID) {
      contactCustomFields.push({
        field_id: CONSENT_FIELD_ID,
        values: [{ value: true }] // Adjust value format as needed for checkbox/boolean in Amo
      });
    }

    const leadData = [
      {
        name: `Early Access: ${contact}`,
        price: 0,
        _embedded: {
          contacts: [
            {
              first_name: type === 'telegram' ? contact : 'New User',
              custom_fields_values: contactCustomFields
            }
          ]
        }
      }
    ];

    const response = await fetch(`${AMOCRM_BASE_URL}/api/v4/leads/complex`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AMOCRM_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(leadData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AmoCRM API Error:', response.status, errorText);
      return NextResponse.json({ error: 'Failed to send to CRM' }, { status: response.status });
    }

    const responseData = await response.json();
    return NextResponse.json({ success: true, id: responseData[0]?.id });

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
