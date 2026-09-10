import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("corporate-website-development");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
