"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { createAction } from "@/app/actions";
import { startTransition, SyntheticEvent, useState } from "react";
import SubmitButton from "@/components/SubmitButton";

export default function NewInvoice() {
  const [state, setState] = useState("ready");

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    if (state === "pending") return;
    setState("pending");
    const target = e.target as HTMLFormElement;
    startTransition(async () => {
      const formData = new FormData(target);
      await createAction(formData);
      console.log("test");
    });
  }
  return (
    <main className="flex flex-col h-full justify-center  max-w-5l gap-6 mx-auto my-12">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Create Invoice</h1>
      </div>
      <form
        action={createAction}
        onSubmit={handleSubmit}
        className="grid gap-4 max-w-xs"
      >
        <div>
          <Label htmlFor="name" className="block mb-2 font-semibold text-sm">
            Billing Name
          </Label>
          <Input id="name" name="name" type="text" />
        </div>
        <div>
          <Label htmlFor="email" className="block mb-2 font-semibold text-sm">
            Billing Email
          </Label>
          <Input id="email" name="email" type="email" />
        </div>
        <div>
          <Label htmlFor="value" className="block mb-2 font-semibold text-sm">
            Value
          </Label>
          <Input name="value" id="value" type="text" />
        </div>
        <div>
          <Label
            htmlFor="description"
            className="block mb-2 font-semibold text-sm"
          >
            Description
          </Label>
          <Textarea id="description" name="description" />
        </div>
        <div>
          <SubmitButton />
        </div>
      </form>
    </main>
  );
}
