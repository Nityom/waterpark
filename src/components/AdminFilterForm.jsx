"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

function buildQueryString(entries) {
  const params = new URLSearchParams();

  Object.entries(entries).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  });

  return params.toString();
}

export default function AdminFilterForm({
  className,
  hiddenFields = {},
  fields = [],
  submitLabel,
  pendingLabel,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const entries = Object.fromEntries(formData.entries());
    const queryString = buildQueryString(entries);

    startTransition(() => {
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    });
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {Object.entries(hiddenFields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value || ""} />
      ))}

      {fields.map((field) => {
        if (field.type === "select") {
          return (
            <div key={field.name} className={field.wrapperClassName}>
              <label className={field.labelClassName}>{field.label}</label>
              <select
                name={field.name}
                defaultValue={field.defaultValue}
                className={field.inputClassName}
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        return (
          <div key={field.name} className={field.wrapperClassName}>
            <label className={field.labelClassName}>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              defaultValue={field.defaultValue}
              placeholder={field.placeholder}
              className={field.inputClassName}
            />
          </div>
        );
      })}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-[#175C42] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#104A35] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? pendingLabel || submitLabel : submitLabel}
      </button>
    </form>
  );
}
