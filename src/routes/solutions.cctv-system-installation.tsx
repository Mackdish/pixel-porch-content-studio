import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { SERVICES } from "@/lib/services";
import { pageHead } from "@/lib/seo";

const service = SERVICES.find((item) => item.slug === "cctv-system-installation")!;

export const Route = createFileRoute("/solutions/cctv-system-installation")({
  head: () => pageHead(
    `${service.title} | Clisanco Technologies`,
    service.summary
  ),
  component: () => <ServiceDetailPage slug="cctv-system-installation" />,
});
