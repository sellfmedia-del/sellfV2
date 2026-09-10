import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("landing-page-development");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
