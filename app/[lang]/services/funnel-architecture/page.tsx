import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("funnel-architecture");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
