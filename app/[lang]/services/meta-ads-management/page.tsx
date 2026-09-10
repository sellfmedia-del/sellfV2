import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("meta-ads-management");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
