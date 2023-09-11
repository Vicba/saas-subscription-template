import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route"; // pull authoptions in another file so you dont use this wacky import
import Stripe from "stripe";
import {
  createCheckoutLink,
  createCustomerIfNull,
  generateCustomerPortalLink,
  hasSubscription,
} from "../helpers/billing";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

import { PrismaClient } from "@prisma/client";
import Link from "next/link";
const prisma = new PrismaClient();

export default async function Page() {
  const session = await getServerSession(authOptions);

  await createCustomerIfNull();

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });

  const manage_link = await generateCustomerPortalLink(
    user?.stripe_customer_id!
  );

  const hasSub = await hasSubscription();
  const checkout_link = await createCheckoutLink(user?.stripe_customer_id!);

  return (
    <div className="max-w-4xl m-auto w-full h-screen px-4">
      <div className="flex flex-col">
        <p className="text-2xl font-medium">{session?.user?.name}</p>

        <div className="py-6">
          <Link
            href={"" + manage_link}
            className="bg-black ml-auto text-white rounded-md px-2 py-1"
          >
            Manage Billing
          </Link>
        </div>

        <div className="">
          {hasSub ? (
            <div className="p-6 rounded-md border-emerald-400 border shadow-sm font-medium">
              Subscribed
            </div>
          ) : (
            <div className="p-6 rounded-md border-zinc-400 border shadow-sm font-medium flex items-center gap-2">
              Free Plan
              <Link
                href={"" + checkout_link}
                className="bg-black ml-auto text-white rounded-md px-2 py-1"
              >
                Upgrade
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
