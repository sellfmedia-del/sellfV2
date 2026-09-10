import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("ab-testing");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
