import { useMediaQuery } from "@/hooks/use-media-query";

export function ProjectText() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  // Adjust font sizes based on device size
  const titleSize = isMobile ? "4em" : isTablet ? "8em" : "12em";
  const headingSize = isMobile ? "3em" : isTablet ? "6em" : "13em";

  return (
    <>
      <h1
        style={{
          position: "absolute",
          top: `${isMobile ? 60 * 8.5 : 90 * 4.55}vh`,
          right: isMobile ? "50%" : "9vw",
          transform: isMobile
            ? "translate3d(50%,-100%,0)"
            : "translate3d(0,-100%,0)",
          fontSize: titleSize,
          color: "black",
          fontWeight: "normal",
          letterSpacing: "-0.05em",
          zIndex: 0,
          textAlign: isMobile ? "center" : "right",
        }}
      >
        projects
      </h1>
      <h1
        style={{
          position: "absolute",
          top: `${isMobile ? 70 * 8.4 : 180 * 3}vh`,
          left: isMobile ? "50%" : "10vw",
          transform: isMobile ? "translate3d(-50%,-100%,0)" : "none",
          fontSize: headingSize,
          color: "black",
          fontWeight: "normal",
          letterSpacing: "-0.05em",
          zIndex: 0,
          textAlign: isMobile ? "center" : "left",
        }}
      >
        hail
      </h1>
      <h1
        style={{
          fontSize: headingSize,
          top: `${isMobile ? 70 * 9.12 : 260 * 2.4}vh`,
          color: "black",
          fontWeight: "normal",
          letterSpacing: "-0.05em",
          position: "absolute",
          right: isMobile ? "50%" : "10vw",
          transform: isMobile ? "translate3d(50%,-100%,0)" : "none",
          textAlign: isMobile ? "center" : "right",
        }}
      >
        thee,
      </h1>
      <h1
        style={{
          fontSize: headingSize,
          color: "black",
          fontWeight: "normal",
          letterSpacing: "-0.05em",
          position: "absolute",
          top: `${isMobile ? 70 * 9.83 : 350 * 2.03}vh`,
          left: isMobile ? "50%" : "10vw",
          transform: isMobile ? "translate3d(-50%,-100%,0)" : "none",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        i trust
      </h1>
      <h1
        style={{
          fontSize: headingSize,
          color: "black",
          fontWeight: "normal",
          letterSpacing: "-0.05em",
          position: "absolute",
          top: `${isMobile ? 70 * 10.45 : 450 * 1.78}vh`,
          right: isMobile ? "50%" : "10vw",
          transform: isMobile ? "translateX(50%)" : "none",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        thou
      </h1>
      <h1
        style={{
          fontSize: headingSize,
          color: "black",
          fontWeight: "normal",
          letterSpacing: "-0.05em",
          position: "absolute",
          top: `${isMobile ? 70 * 11.26 : 450 * 2.1}vh`,
          right: isMobile ? "50%" : "10vw",
          transform: isMobile ? "translate3d(50%,-100%,0)" : "none",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        shalt
      </h1>
      <h1
        style={{
          fontSize: headingSize,
          color: "black",
          fontWeight: "normal",
          letterSpacing: "-0.05em",
          position: "absolute",
          top: `${isMobile ? 70 * 11.97 : 450 * 2.27}vh`,
          left: isMobile ? "50%" : "10vw",
          transform: isMobile ? "translate3d(-50%,-100%,0)" : "none",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        enjoy.
      </h1>
    </>
  );
}
