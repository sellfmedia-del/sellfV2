import { createOperationRoute } from "@/lib/createOperationRoute";
const route = createOperationRoute("video-production");
export const generateMetadata = route.generateMetadata;
export default route.OperationPage;
