import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("social-media-management");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
