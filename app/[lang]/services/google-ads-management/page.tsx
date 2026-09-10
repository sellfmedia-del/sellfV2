import { getOperationMetadata, renderOperationPage } from "@/lib/operationRoute";

const operationSlug = "google-ads-management";

type RouteParams = {
  lang: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { lang } = await params;
  return getOperationMetadata(operationSlug, lang);
}

export default async function GoogleAdsManagementPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { lang } = await params;
  return renderOperationPage(operationSlug, lang);
}
