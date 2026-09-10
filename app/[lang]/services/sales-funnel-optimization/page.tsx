import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("sales-funnel-optimization");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
