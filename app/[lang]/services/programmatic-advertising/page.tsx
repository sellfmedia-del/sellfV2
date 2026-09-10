import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("programmatic-advertising");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
