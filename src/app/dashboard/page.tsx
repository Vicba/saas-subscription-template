import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "../api/auth/[...nextauth]/route"; // pull authoptions in another file so you dont use this wacky import
import {
  createCheckoutLink,
  createCustomerIfNull,
  generateCustomerPortalLink,
  hasSubscription,
} from "../helpers/billing";

import Link from "next/link";
import { prisma } from "../lib/prisma";
import { mustBeLoggedIn } from "../lib/auth";

export default async function Page() {
  await mustBeLoggedIn();

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

        <div className="pb-6">
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

        <div className="pb-6">
          {hasSub ? (
            <Image src="/doge.jpg" width={500} height={500} alt={""} />
          ) : (
            <div className="p-6 rounded-md border-zinc-400 border shadow-sm font-medium flex items-center gap-2">
              You dont have access to the image
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
