import React from "react";
import LinkCard from "@/components/LinkCard";
import { Heading } from "@/components/ui/heading";

function Uni() {
  return (
    <>
      <Heading>University Portal</Heading>

      <div className="text-xl text-center flex justify-center px-6 pb-2">
        Welcome to the University Portal. Here you can register your University and start creating tokens and NFTs!
      </div>

      <div className="mt-4 flex flex-col lg:flex-row gap-4">
        <LinkCard
          href="/uni/create"
          title="Register your University"
          description="Register your uni to start creating tokens and NFTs!"
        />
        <LinkCard
          href="/uni/manage"
          title="Manage your University"
          description="Register your uni to start creating tokens and NFTs!"
        />
      </div>
    </>
  );
}

export default Uni;