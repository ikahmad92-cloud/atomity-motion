type LoaderProps = {
  size?: number;
};

export default function Loader({ size = 40 }: LoaderProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        style={{ width: size, height: size }}
        className="animate-spin rounded-full border-t-4 border-accentPrimary"
      />
    </div>
  );
}
