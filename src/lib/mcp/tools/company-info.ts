import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_company_info",
  title: "Get company info",
  description:
    "Return an overview of MORCCE Fashion Co., Limited including business scope, location, and contact channels.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            name: "MORCCE Fashion Co., Limited",
            established: 2006,
            location: "Guangzhou, China",
            businessModel: "OEM / ODM manufacturer",
            products: [
              "Ladies handbags",
              "Wallets & purses",
              "Belts",
              "Fashion accessories",
            ],
            website: "https://morccefashion.lovable.app",
          },
          null,
          2,
        ),
      },
    ],
  }),
});
