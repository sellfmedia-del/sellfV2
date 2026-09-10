import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("retail-media-management");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
