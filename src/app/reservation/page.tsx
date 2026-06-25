import type { Metadata } from "next";
import ReservationForm from "./ReservationForm";

export const metadata: Metadata = {
  title: "Réservation | Les 400 Geeks",
  description: "Réservez votre table au restaurant Les 400 Geeks. Une expérience gastronomique unique inspirée des univers vidéoludiques.",
  alternates: { canonical: "https://les-400-geeks.vercel.app/reservation" },
};

export default function ReservationPage() {
  return <ReservationForm />;
}
