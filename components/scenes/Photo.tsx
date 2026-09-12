import Image from "next/image";

export function Photo({
  src,
  alt,
  className = "",
  rounded = "rounded-[24px]",
  sizes = "(max-width: 768px) 90vw, 400px",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  rounded?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
