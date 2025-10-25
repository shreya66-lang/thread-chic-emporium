import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface FeedbackRequest {
  name: string;
  email: string;
  rating: number;
  feedback: string;
  productName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, rating, feedback, productName }: FeedbackRequest = await req.json();
    console.log("Feedback submission from:", email);

    const stars = "⭐".repeat(rating);

    // Send thank you to customer
    const customerEmail = await resend.emails.send({
      from: "Priyasi <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for your feedback - Priyasi",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #9333ea; text-align: center;">Thank You, ${name}!</h1>
          <p style="font-size: 16px; color: #333;">We truly appreciate you taking the time to share your feedback with us.</p>
          <div style="background: linear-gradient(135deg, #9333ea, #ec4899, #f97316); padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: white; margin: 0;">Your Rating: ${stars}</h3>
          </div>
          ${productName ? `<p style="color: #666;"><strong>Product:</strong> ${productName}</p>` : ''}
          <p style="color: #666;"><strong>Your Feedback:</strong><br>${feedback}</p>
          <p style="font-size: 14px; color: #666; margin-top: 30px;">Your opinion helps us improve and serve you better.</p>
          <p style="font-size: 14px; color: #666;">Best regards,<br>The Priyasi Team</p>
        </div>
      `,
    });

    // Send notification to Priyasi team
    const adminEmail = await resend.emails.send({
      from: "Priyasi Feedback <onboarding@resend.dev>",
      to: ["onboarding@resend.dev"], // Replace with your actual email
      subject: `New Customer Feedback - ${rating} stars`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #9333ea;">New Customer Feedback</h1>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Rating:</strong> ${stars} (${rating}/5)</p>
            ${productName ? `<p><strong>Product:</strong> ${productName}</p>` : ''}
            <p><strong>Feedback:</strong><br>${feedback}</p>
          </div>
        </div>
      `,
    });

    console.log("Feedback emails sent successfully");

    return new Response(
      JSON.stringify({ success: true, customerEmail, adminEmail }), 
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending feedback emails:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
