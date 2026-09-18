import { cn } from "@/lib/utils";
import ProjectMenu from "./ProjectMenu";

type ProjectMenuAccordionProps = { isAccordionOpen: boolean };

export default function ProjectMenuAccordion({
  isAccordionOpen,
}: ProjectMenuAccordionProps) {
  return (
    <div
      className={cn(
        "absolute bottom-0 grid w-full translate-y-full rounded-b-sm bg-white",
        isAccordionOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
    >
      <ProjectMenu className="overflow-hidden" />
    </div>
  );
}
