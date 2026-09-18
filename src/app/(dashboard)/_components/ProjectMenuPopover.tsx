import ProjectMenu from "./ProjectMenu";

export default function ProjectMenuPopover() {
  return (
    <div className="bg-surface-medium absolute top-0 -right-5 min-w-3xs translate-x-full rounded-e-sm">
      <ProjectMenu />
    </div>
  );
}
