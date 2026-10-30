"use client";

import { DayPicker, DateRange, getDefaultClassNames } from "@daypicker/react";
import { useState, useRef, useEffect } from "react";
import {
  format,
  differenceInCalendarDays,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/Separator";
import Button from "@/components/ui/Button";
import { TASK_STATUSES } from "@/features/tasks/constants/tasks";
import { Project } from "@/schemas/projectSchema";

function getCurrentWeekRange(): DateRange {
  const today = new Date();

  return {
    from: startOfWeek(today, { weekStartsOn: 1 }),
    to: endOfWeek(today, { weekStartsOn: 1 }),
  };
}

const MAX_DAYS = 7;

function formatRangeLabel(range: DateRange | undefined): string {
  if (!range?.from) return "Select date range";
  if (!range.to) return format(range.from, "MMM d, yyyy");

  return `${format(range.from, "MMM d")} – ${format(range.to, "MMM d, yyyy")}`;
}

export default function StatsFilters({ projects }: { projects: Project[] }) {
  const defaultClassNames = getDefaultClassNames();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [appliedRange, setAppliedRange] = useState<DateRange | undefined>(
    getCurrentWeekRange,
  );

  const [draftRange, setDraftRange] = useState<DateRange | undefined>(
    getCurrentWeekRange,
  );

  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const dayCount =
    draftRange?.from && draftRange?.to
      ? differenceInCalendarDays(draftRange.to, draftRange.from) + 1
      : null;

  const isExceeded = dayCount !== null && dayCount > MAX_DAYS;
  const isComplete = !!draftRange?.from && !!draftRange?.to;

  function updateFilters(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        handleCancel();
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  function handleOpen() {
    setDraftRange(appliedRange);
    setOpen(true);
  }

  function handleCancel() {
    setDraftRange(appliedRange);
    setOpen(false);
  }

  function handleApply() {
    if (!isComplete || isExceeded) return;

    setAppliedRange(draftRange);

    updateFilters({
      from: format(draftRange.from!, "yyyy-MM-dd"),
      to: format(draftRange.to!, "yyyy-MM-dd"),
    });

    setOpen(false);
  }

  return (
    <div className="md:bg-surface-low relative grid grid-cols-2 gap-4 rounded-lg md:grid-cols-[1fr_auto_auto] md:items-center md:p-4">
      <div className="order-1 col-span-2 flex min-w-0 gap-2 md:contents">
        <button
          onClick={handleOpen}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="bg-surface-low relative min-w-0 flex-1 rounded-lg text-sm leading-5 font-bold text-slate-800 md:w-48 md:flex-none"
        >
          {formatRangeLabel(appliedRange)}
        </button>

        {open && (
          <div
            ref={popoverRef}
            role="dialog"
            aria-modal="true"
            aria-label="Select date range"
            className="shadow-edit-container absolute top-0 left-0 z-50 rounded-lg"
          >
            <DayPicker
              mode="range"
              weekStartsOn={1}
              showOutsideDays
              selected={draftRange}
              onSelect={setDraftRange}
              footer={
                <div className="flex flex-col">
                  <Separator className="mt-3 mb-4" />

                  <div className="flex items-center justify-between gap-2">
                    <Button
                      onClick={handleCancel}
                      variant="ghost"
                      className="flex-1"
                    >
                      Cancel
                    </Button>

                    <Button
                      onClick={handleApply}
                      disabled={!isComplete || isExceeded}
                      aria-disabled={!isComplete || isExceeded}
                      className="flex-1 rounded-xs px-0 py-2 text-xs leading-4 font-semibold"
                    >
                      Apply Range
                    </Button>
                  </div>

                  {isExceeded && (
                    <p className="mt-2 text-xs text-red-500" role="alert">
                      You can select a maximum of 7 calendar days.
                    </p>
                  )}
                </div>
              }
              classNames={{
                outside: "text-slate-200",
                month_grid: "border-separate border-spacing-1",
                range_start:
                  "rounded-s-md bg-primary-container/20 text-primary! font-bold",
                range_middle: "bg-primary-container/20 text-primary! font-bold",
                range_end:
                  "rounded-e-md bg-primary-container/20 text-primary! font-bold",
                day_button: "h-8 w-9 flex items-center justify-center",
                day: "leading-4 text-xs",
                root: `${defaultClassNames.root} bg-white w-fit relative p-5 rounded-lg text-slate-800`,
                chevron: `${defaultClassNames.chevron} fill-slate-500 scale-80 cursor-pointer`,
                weekday:
                  "text-3xs leading-4 font-bold tracking-tighter text-slate-300 uppercase",
                month_caption: "text-base leading-6 font-bold mb-4",
                nav: "absolute right-5",
              }}
            />
          </div>
        )}

        <select
          value={searchParams.get("status") ?? ""}
          onChange={(e) =>
            updateFilters({
              status: e.target.value || null,
            })
          }
          className="bg-surface-low min-w-0 flex-1 rounded-lg px-4 py-2.5 text-xs leading-4 font-bold text-slate-800 md:w-34 md:flex-none md:rounded-xs md:bg-white md:py-2 md:text-sm md:leading-5 md:font-medium"
        >
          <option value="">All Statuses</option>

          {TASK_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status.replaceAll("_", " ")}
            </option>
          ))}
        </select>
      </div>

      <select
        value={searchParams.get("projectId") ?? ""}
        onChange={(e) =>
          updateFilters({
            projectId: e.target.value || null,
          })
        }
        className="bg-surface-low order-0 col-span-2 w-full min-w-0 rounded-lg px-4 py-3 text-xs leading-4 font-bold text-slate-800 md:order-0 md:col-span-1 md:ml-auto md:w-51 md:rounded-xs md:bg-white md:py-2 md:text-sm md:leading-5 md:font-medium"
      >
        <option value="">All Projects</option>

        {projects.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}
