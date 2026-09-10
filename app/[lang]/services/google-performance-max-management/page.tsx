import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("google-performance-max-management");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
