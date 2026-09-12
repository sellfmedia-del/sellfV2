import StepByStepVisualLoader from "@/components/StepByStepVisualLoader";

const IKIGAI_SVG = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDgwMCI+PGRlZnM+PHJhZGlhbEdyYWRpZW50IGlkPSJnIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMzMDM4M2MiIHN0b3Atb3BhY2l0eT0iLjQiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwNzEwMTQiIHN0b3Atb3BhY2l0eT0iMCIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjgwMCIgZmlsbD0iIzA3MTAxNCIvPjxlbGxpcHNlIGN4PSI2MDAiIGN5PSI0MDAiIHJ4PSI0MzAiIHJ5PSIzMDAiIGZpbGw9InVybCgjZykiLz48ZyBmaWxsPSJyZ2JhKDE2MCwxNzAsMTc1LC4xMikiIHN0cm9rZT0iI2E5YjFiNSIgc3Ryb2tlLXdpZHRoPSIzIj48Y2lyY2xlIGN4PSI2MDAiIGN5PSIyNjAiIHI9IjIyNSIvPjxjaXJjbGUgY3g9IjQ0MCIgY3k9IjQwMCIgcj0iMjI1Ii8+PGNpcmNsZSBjeD0iNzYwIiBjeT0iNDAwIiByPSIyMjUiLz48Y2lyY2xlIGN4PSI2MDAiIGN5PSI1NDAiIHI9IjIyNSIvPjwvZz48Y2lyY2xlIGN4PSI2MDAiIGN5PSI0MDAiIHI9IjExMiIgZmlsbD0iIzAyMDYwOCIgc3Ryb2tlPSIjYmRjM2M2IiBzdHJva2Utd2lkdGg9IjIiLz48dGV4dCB4PSI2MDAiIHk9IjQxNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNjAwIiBsZXR0ZXItc3BhY2luZz0iMTAiIGZpbGw9IiNlN2U5ZWEiPklLSUdBSTwvdGV4dD48L3N2Zz4=";

export default function StepByStepLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="stepByStepNativeVisuals">
      <style>{`
        .stepByStepNativeVisuals [class*="heroVisual"],
        .stepByStepNativeVisuals [class*="stage"] > [class*="visual"] {
          background-image: none !important;
          background-color: #071014 !important;
          border-left: 0 !important;
          border-right: 0 !important;
        }

        .stepByStepNativeVisuals .stepByStepDeferredImage {
          position: absolute;
          inset: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center;
          opacity: 0;
          animation: stepVisualIn .28s ease-out forwards;
        }

        @keyframes stepVisualIn {
          to { opacity: 1; }
        }

        .stepByStepNativeVisuals [data-step-visual="development"] {
          background-image: url("data:image/svg+xml;base64,${IKIGAI_SVG}") !important;
          background-repeat: no-repeat !important;
          background-size: cover !important;
          background-position: center !important;
        }

        .stepByStepNativeVisuals [class*="heroVisual"] {
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 13%, #000 96%, transparent 100%) !important;
          mask-image: linear-gradient(90deg, transparent 0%, #000 13%, #000 96%, transparent 100%) !important;
        }

        .stepByStepNativeVisuals [class*="stage"] > [class*="visual"] {
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 7%, #000 93%, transparent 100%) !important;
          mask-image: linear-gradient(90deg, transparent 0%, #000 7%, #000 93%, transparent 100%) !important;
          box-shadow:
            inset 0 26px 42px -34px #071014,
            inset 0 -26px 42px -34px #071014;
        }

        .stepByStepNativeVisuals [class*="heroVisual"]::after,
        .stepByStepNativeVisuals [class*="stage"] > [class*="visual"]::after {
          z-index: 2 !important;
          background:
            linear-gradient(90deg, rgba(7,16,20,.60) 0%, rgba(7,16,20,.16) 9%, transparent 24%, transparent 78%, rgba(7,16,20,.28) 94%, rgba(7,16,20,.56) 100%),
            linear-gradient(180deg, rgba(7,16,20,.34) 0%, transparent 13%, transparent 87%, rgba(7,16,20,.38) 100%) !important;
        }

        .stepByStepNativeVisuals [class*="visualLabel"] {
          z-index: 4 !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .stepByStepNativeVisuals .stepByStepDeferredImage { animation: none; opacity: 1; }
        }
      `}</style>
      <StepByStepVisualLoader />
      {children}
    </div>
  );
}
