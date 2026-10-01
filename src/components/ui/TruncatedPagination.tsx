import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination";
import { cn } from "@/lib/utils";

type PageType = number | "ellipsis";

function getPages(currentPage: number, totalPages: number): PageType[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage < 3) {
    return [1, 2, 3, "ellipsis", totalPages];
  }

  if (currentPage > totalPages - 2) {
    return [1, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
  }

  const pages: PageType[] = [1];

  if (currentPage === 4) {
    pages.push(2);
  } else if (currentPage !== 3) {
    pages.push("ellipsis");
  }

  pages.push(currentPage - 1, currentPage, currentPage + 1);

  if (currentPage === totalPages - 3) {
    pages.push(totalPages - 1);
  } else if (currentPage !== totalPages - 2) {
    pages.push("ellipsis");
  }

  pages.push(totalPages);

  return pages;
}

export default function TruncatedPagination({
  currentPage,
  totalPages,
  getHref,
}: {
  totalPages: number;
  currentPage: number;
  getHref: (page: number) => string;
}) {
  if (totalPages <= 1) return null;

  const pages = getPages(currentPage, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={getHref(currentPage - 1)}
            className={cn(
              currentPage === 1 && "pointer-events-none opacity-40",
            )}
          />
        </PaginationItem>

        {pages.map((page, index) => (
          <PaginationItem key={index}>
            {page === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={getHref(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={getHref(currentPage + 1)}
            className={cn(
              currentPage === totalPages && "pointer-events-none opacity-40",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
