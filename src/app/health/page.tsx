import HealthPage from "@/components/HealthPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ИИ-терапевт",
  description: "ИИ-терапевт, проверяемый врачами",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function Page() {

  return <HealthPage />
}
