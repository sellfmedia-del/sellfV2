import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("trendyol-management");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
