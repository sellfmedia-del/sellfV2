import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("email-marketing");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
