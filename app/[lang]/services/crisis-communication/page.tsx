import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("crisis-communication");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
