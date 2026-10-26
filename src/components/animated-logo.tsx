import deer from "@/assets/indriya-logo-deer.png";
import word from "@/assets/indriya-logo-word.png";
import deerLight from "@/assets/indriya-logo-light-deer.png";
import wordLight from "@/assets/indriya-logo-light-word.png";

/**
 * Indriya logo with the deer split from the wordmark so the deer can "walk":
 * it strides in from the left on load, then keeps a gentle walking bob.
 * Respects prefers-reduced-motion. Height is set with a Tailwind h-* class.
 */
export function AnimatedLogo({
  light = false,
  className = "h-10",
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label="Indriya"
      className={`deer-logo inline-flex items-center gap-2 sm:gap-2.5 ${className}`}
    >
      <span className="deer-walk-in inline-block h-full">
        <img
          src={light ? deerLight : deer}
          alt=""
          width={50}
          height={79}
          className="deer-stride block h-full w-auto"
        />
      </span>
      <img
        src={light ? wordLight : word}
        alt=""
        width={208}
        height={33}
        className="deer-word block h-[42%] w-auto"
      />
    </span>
  );
}
