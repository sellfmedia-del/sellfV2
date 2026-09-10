import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("performance-creative");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
