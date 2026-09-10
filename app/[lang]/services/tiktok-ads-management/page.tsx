import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("tiktok-ads-management");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
