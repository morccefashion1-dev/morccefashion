import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "list_product_categories",
  title: "List product categories",
  description: "List the product categories MORCCE Fashion manufactures via OEM/ODM.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(
          [
            { slug: "ladies-handbags", name: "Ladies Handbags" },
            { slug: "wallets-purses", name: "Wallets & Purses" },
            { slug: "belts", name: "Belts" },
            { slug: "fashion-accessories", name: "Fashion Accessories" },
          ],
          null,
          2,
        ),
      },
    ],
  }),
});
