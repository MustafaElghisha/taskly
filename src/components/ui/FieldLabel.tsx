type FieldLabelProps = React.ComponentPropsWithoutRef<"label">;

export default function FieldLabel({ ...props }: FieldLabelProps) {
  return (
    <label
      className="text-label-sm ps-1 leading-4.25 font-bold tracking-wider text-slate-500 uppercase"
      {...props}
    />
  );
}
