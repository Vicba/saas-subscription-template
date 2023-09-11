"use client";
import React, { useEffect } from "react";

export const StripePricingTable = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return React.createElement("stripe-pricing-table", {
    "pricing-table-id": "prctbl_1NpEe7J1122dmgZ59NeC1fK8",
    "publishable-key":
      "pk_test_51IkBR4J1122dmgZ5JGA1UlHzCdnttSnE5yfQCDHNHQRL49FLItw6j57z0CuBiJZO0kTlMN5C1o13KsiMWNvtKatF00h0IlvEti", // ok to share
  });
};
