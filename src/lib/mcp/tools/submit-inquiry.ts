import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "submit_inquiry",
  title: "Submit inquiry",
  description:
    "Record a buyer inquiry for MORCCE Fashion. Returns follow-up contact channels the buyer should use to reach the sales team.",
  inputSchema: {
    name: z.string().min(1).describe("Buyer full name."),
    company: z.string().optional().describe("Buyer company name."),
    email: z.string().email().describe("Buyer email address."),
    country: z.string().optional().describe("Buyer country or region."),
    productInterest: z
      .string()
      .min(1)
      .describe("Product category or specific item the buyer is interested in."),
    quantity: z
      .string()
      .optional()
      .describe("Estimated order quantity (e.g. '500 pcs')."),
    message: z.string().min(1).describe("Detailed inquiry message."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async (input) => {
    const receivedAt = new Date().toISOString();
    console.log("[mcp] submit_inquiry", { ...input, receivedAt });
    return {
      content: [
        {
          type: "text",
          text: `Inquiry received for ${input.productInterest}. The sales team will follow up via email at ${input.email}. For faster response, please also contact us by email or WhatsApp as shown on morccefashion.lovable.app.`,
        },
      ],
      structuredContent: {
        status: "received",
        receivedAt,
        nextSteps: [
          "Sales team will reply by email within 1 business day.",
          "Prepare reference images, target price, and quantity for a quicker quote.",
        ],
      },
    };
  },
});
