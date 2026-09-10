import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("custom-software-development");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
