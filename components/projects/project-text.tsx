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
          top: `${isMobile ? 70 * 7.9 : 90 * 4.55}vh`,
          right: isMobile ? "50%" : "5vw",
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
          fontSize: headingSize,
          color: "black",
          fontWeight: "normal",
          letterSpacing: "-0.05em",
          position: "absolute",
          top: `${isMobile ? 145 * 7.9 : 180 * 3}vh`,
          left: isMobile ? "50%" : "10vw",
          transform: isMobile ? "translateX(-50%)" : "none",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        hail
      </h1>
      <h1
        style={{
          fontSize: headingSize,
          color: "black",
          fontWeight: "normal",
          letterSpacing: "-0.05em",
          position: "absolute",
          top: `${isMobile ? 200 * 7.9 : 260 * 2.4}vh`,
          right: isMobile ? "50%" : "10vw",
          transform: isMobile ? "translateX(50%)" : "none",
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
          top: `${isMobile ? 250 * 7.9 : 350 * 2.03}vh`,
          left: isMobile ? "50%" : "10vw",
          transform: isMobile ? "translateX(-50%)" : "none",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        thoth
      </h1>
      <h1
        style={{
          fontSize: headingSize,
          color: "black",
          fontWeight: "normal",
          letterSpacing: "-0.05em",
          position: "absolute",
          top: `${isMobile ? 300 * 7.9 : 450 * 1.76}vh`,
          right: isMobile ? "50%" : "10vw",
          transform: isMobile ? "translateX(50%)" : "none",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        {isMobile ? (
          "her mes."
        ) : (
          <>
            her
            <br />
            mes.
          </>
        )}
      </h1>
    </>
  );
}
