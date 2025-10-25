import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, subject, message }: ContactRequest = await req.json();
    console.log("Contact form submission from:", email);

    // Send confirmation to customer
    const customerEmail = await resend.emails.send({
      from: "Priyasi <onboarding@resend.dev>",
      to: [email],
      subject: "We received your message - Priyasi",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #9333ea; text-align: center;">Thank You, ${name}!</h1>
          <p style="font-size: 16px; color: #333;">We've received your message and will get back to you as soon as possible.</p>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #9333ea; margin-top: 0;">Your Message:</h3>
            <p style="color: #666;"><strong>Subject:</strong> ${subject}</p>
            <p style="color: #666;"><strong>Message:</strong><br>${message}</p>
          </div>
          <p style="font-size: 14px; color: #666; margin-top: 30px;">Best regards,<br>The Priyasi Team</p>
        </div>
      `,
    });

    // Send notification to Priyasi team (change to your actual email)
    const adminEmail = await resend.emails.send({
      from: "Priyasi Contact Form <onboarding@resend.dev>",
      to: ["onboarding@resend.dev"], // Replace with your actual email
      subject: `New Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #9333ea;">New Contact Form Submission</h1>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong><br>${message}</p>
          </div>
        </div>
      `,
    });

    console.log("Contact emails sent successfully");

    return new Response(
      JSON.stringify({ 
        success: true, 
        customerEmail, 
        adminEmail 
      }), 
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending contact emails:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
