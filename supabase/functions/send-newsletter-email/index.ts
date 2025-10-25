import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsletterRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: NewsletterRequest = await req.json();
    console.log("Newsletter subscription request for:", email);

    const emailResponse = await resend.emails.send({
      from: "Priyasi <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to Priyasi - 10% Off Your First Order!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #9333ea; text-align: center;">Welcome to Priyasi!</h1>
          <p style="font-size: 16px; color: #333;">Thank you for subscribing to our newsletter.</p>
          <p style="font-size: 16px; color: #333;">As a welcome gift, enjoy <strong>10% off your first order</strong> with code:</p>
          <div style="background: linear-gradient(135deg, #9333ea, #ec4899, #f97316); padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h2 style="color: white; margin: 0; font-size: 24px; letter-spacing: 2px;">WELCOME10</h2>
          </div>
          <p style="font-size: 16px; color: #333;">Discover our handcrafted khadi collections and celebrate sustainable fashion.</p>
          <p style="font-size: 14px; color: #666; margin-top: 30px;">We respect your privacy. You can unsubscribe anytime.</p>
          <p style="font-size: 14px; color: #666;">Best regards,<br>The Priyasi Team</p>
        </div>
      `,
    });

    console.log("Newsletter email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending newsletter email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
