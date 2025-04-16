import Link from "next/link";

export function ActionButton({ label, href }: { label: string; href?: string }) {
  const buttonContent = (
    <>
      <div className="absolute inset-0 rounded-lg bg-[#fcecc5] opacity-80" />
      <div className="absolute inset-0 border rounded-lg border-white/20 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="absolute inset-0 border rounded-lg border-white/40 [mask-image:linear-gradient(to_top,black,transparent)]" />
      <div className="absolute inset-0 rounded-lg shadow-[0px_0px_12px_#fcecc5]" />
      <span className="relative z-10 text-black">{label}</span>
    </>
  );

  return (
    <button className="relative py-2 px-4 rounded-lg font-medium text-sm text-black bg-[#fcecc5] shadow-[0px_0px_12px_#fcecc5] hover:brightness-110 transition">
      {href ? <Link href={href}>{buttonContent}</Link> : buttonContent}
    </button>
  );
}
