import { GastoForm } from "../components/GastoForm";
import { GastoList } from "../components/GastoList";
import { FiltroBar } from "../components/FiltroBar";

export function Home() {
  return (
    <div className="flex flex-col gap-6">
      <GastoForm />
      <FiltroBar />
      <GastoList />
    </div>
  );
}