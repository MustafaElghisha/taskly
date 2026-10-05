import { cn } from "@/lib/utils";

function Table({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"table">) {
  return (
    <div className="outline-surface-low max-w-xl rounded-lg outline-0 md:outline-4">
      <table
        className={cn(
          "md:bg-blue-150/30 w-full table-fixed border-separate border-spacing-y-3 rounded-lg md:border-collapse md:border-spacing-y-0",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function TableHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"thead">) {
  return (
    <thead className={cn("sr-only md:not-sr-only", className)} {...props} />
  );
}

function TableBody({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"tbody">) {
  return <tbody className={cn("", className)} {...props} />;
}

function TableRow({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"tr">) {
  return (
    <tr
      className={cn("border-blue-150 md:not-last:border-b", className)}
      {...props}
    />
  );
}

function TableHead({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"th">) {
  return (
    <th
      className={cn(
        "text-2xs px-8 py-5 text-start font-bold tracking-widest text-slate-600 uppercase",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"td">) {
  return (
    <td
      className={cn("bg-white p-4 md:rounded-none md:px-8 md:py-5", className)}
      {...props}
    />
  );
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };
