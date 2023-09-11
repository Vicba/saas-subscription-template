import Link from "next/link";
import { StripePricingTable } from "./components/pricing-table";

export default function Home() {
  return (
    <main className="max-w-2xl h-screen m-auto p-4">
      <Link
        href={"/sign-in"}
        className="bg-black ml-auto text-white rounded-md px-2 py-1"
      >
        Sign In
      </Link>
      <div className="flex flex-col my-4">
        <h1 className="text-5xl font-bold">My Saas</h1>
        <p className="text-black/80 pb-5">Subscribe to the Saas</p>
        <StripePricingTable />
      </div>
    </main>
  );
}
