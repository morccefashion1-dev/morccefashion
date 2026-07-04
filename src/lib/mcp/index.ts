import { defineMcp } from "@lovable.dev/mcp-js";
import companyInfoTool from "./tools/company-info";
import listProductsTool from "./tools/list-products";
import submitInquiryTool from "./tools/submit-inquiry";

export default defineMcp({
  name: "morcce-fashion-mcp",
  title: "MORCCE Fashion MCP",
  version: "0.1.0",
  instructions:
    "Tools for MORCCE Fashion Co., Limited — an OEM/ODM handbag and leather goods manufacturer. Use `get_company_info` and `list_product_categories` to answer buyer questions, and `submit_inquiry` to record a new buyer inquiry.",
  tools: [companyInfoTool, listProductsTool, submitInquiryTool],
});
