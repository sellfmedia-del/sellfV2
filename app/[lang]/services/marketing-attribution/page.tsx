import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("marketing-attribution");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
