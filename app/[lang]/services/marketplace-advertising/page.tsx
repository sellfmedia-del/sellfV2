import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("marketplace-advertising");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
