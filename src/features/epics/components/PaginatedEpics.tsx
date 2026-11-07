import TruncatedPagination from "@/components/ui/TruncatedPagination";
import { Epic } from "@/schemas/epicSchema";
import Link from "next/link";
import EpicCard from "./EpicCard";

export default function PaginatedEpics({
  initialEpics,
  projectId,
  currentPage,
  totalPages,
  searchTerm,
}: {
  initialEpics: Epic[];
  projectId: string;
  currentPage: number;
  totalPages: number;
  searchTerm: string;
}) {
  return (
    <>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 md:grid-cols-[repeat(auto-fill,minmax(340px,1fr))]">
        {initialEpics.map((epic) => (
          <li key={epic.id}>
            <Link href={`/projects/${projectId}/epics/view/${epic.id}`}>
              <EpicCard {...epic} />
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-auto hidden justify-end py-8 md:flex">
        <TruncatedPagination
          totalPages={totalPages}
          currentPage={currentPage}
          getHref={(page) =>
            `/projects/${projectId}/epics?page=${page}${searchTerm.length ? `&searchTerm=${searchTerm}` : ``}`
          }
        />
      </div>
    </>
  );
}
