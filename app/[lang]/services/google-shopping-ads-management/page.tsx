import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("google-shopping-ads-management");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
