import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ success: false, message: 'reCAPTCHA token is missing.' }, { status: 400 });
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY is not set in environment variables.');
      return NextResponse.json({ success: false, message: 'Server configuration error.' }, { status: 500 });
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    const verificationResponse = await fetch(verifyUrl, {
      method: 'POST',
    });

    if (!verificationResponse.ok) {
      console.error('Failed to fetch reCAPTCHA verification API:', verificationResponse.statusText);
      return NextResponse.json({ success: false, message: 'Failed to verify reCAPTCHA with Google.' }, { status: 500 });
    }

    const verificationData = await verificationResponse.json();

    // New logic: Only reject if a score is present and below 0.6
    // In all other cases (verification failed, no score, score >= 0.6), allow.
    if (verificationData.success && typeof verificationData.score === 'number' && verificationData.score < 0.6) {
      console.log(`reCAPTCHA score too low: ${verificationData.score}. Rejecting.`);
      return NextResponse.json({
        success: false,
        message: `Your activity score (${verificationData.score.toFixed(2)}) is below the required threshold (0.6). Please try again.`,
        score: verificationData.score
      }, { status: 403 }); // Forbidden due to low score
    }

    // If verificationData.success is false, or score is not a number, or score >= 0.6,
    // or any other scenario not explicitly caught above, consider it a pass for redirection.
    let successMessage = 'reCAPTCHA check passed.';
    if (!verificationData.success) {
        successMessage = 'reCAPTCHA verification did not succeed, but proceeding as per rules.';
        console.warn('reCAPTCHA verification failed with Google, but allowing user through:', verificationData['error-codes']);
    } else if (typeof verificationData.score === 'number') {
        successMessage = `reCAPTCHA score (${verificationData.score.toFixed(2)}) is acceptable.`;
    } else {
        successMessage = 'reCAPTCHA score not available, proceeding as per rules.';
    }
    
    console.log(successMessage, "Score:", verificationData.score);
    return NextResponse.json({
        success: true,
        message: successMessage,
        score: verificationData.score // Include score if available
    });

  } catch (error) {
    // If there's an error fetching from Google or any other unexpected error
    console.error('Error during reCAPTCHA verification process:', error);
    // As per new rules, even if the verification process itself fails, allow redirection.
    return NextResponse.json({
        success: true, // Allow redirection even on server-side error with Google API
        message: 'Proceeding despite a server-side issue during reCAPTCHA check.',
        error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}