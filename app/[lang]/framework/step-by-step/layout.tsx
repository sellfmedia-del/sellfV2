import StepByStepVisualLoader from "@/components/StepByStepVisualLoader";

const IKIGAI_SVG = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDgwMCI+PGRlZnM+PHJhZGlhbEdyYWRpZW50IGlkPSJnIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMzMDM4M2MiIHN0b3Atb3BhY2l0eT0iLjQiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwNzEwMTQiIHN0b3Atb3BhY2l0eT0iMCIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjgwMCIgZmlsbD0iIzA3MTAxNCIvPjxlbGxpcHNlIGN4PSI2MDAiIGN5PSI0MDAiIHJ4PSI0MzAiIHJ5PSIzMDAiIGZpbGw9InVybCgjZykiLz48ZyBmaWxsPSJyZ2JhKDE2MCwxNzAsMTc1LC4xMikiIHN0cm9rZT0iI2E5YjFiNSIgc3Ryb2tlLXdpZHRoPSIzIj48Y2lyY2xlIGN4PSI2MDAiIGN5PSIyNjAiIHI9IjIyNSIvPjxjaXJjbGUgY3g9IjQ0MCIgY3k9IjQwMCIgcj0iMjI1Ii8+PGNpcmNsZSBjeD0iNzYwIiBjeT0iNDAwIiByPSIyMjUiLz48Y2lyY2xlIGN4PSI2MDAiIGN5PSI1NDAiIHI9IjIyNSIvPjwvZz48Y2lyY2xlIGN4PSI2MDAiIGN5PSI0MDAiIHI9IjExMiIgZmlsbD0iIzAyMDYwOCIgc3Ryb2tlPSIjYmRjM2M2IiBzdHJva2Utd2lkdGg9IjIiLz48dGV4dCB4PSI2MDAiIHk9IjQxNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNjAwIiBsZXR0ZXItc3BhY2luZz0iMTAiIGZpbGw9IiNlN2U5ZWEiPklLSUdBSTwvdGV4dD48L3N2Zz4=";
const MATURITY_SVG = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDgwMCI+PGRlZnM+PHJhZGlhbEdyYWRpZW50IGlkPSJiZyI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMTQyMTI3Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDcxMDE0Ii8+PC9yYWRpYWxHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgaWQ9ImNvcmUiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmZiIvPjxzdG9wIG9mZnNldD0iLjEyIiBzdG9wLWNvbG9yPSIjZGNlM2U2Ii8+PHN0b3Agb2Zmc2V0PSIuNDUiIHN0b3AtY29sb3I9IiM1NTYzNmEiIHN0b3Atb3BhY2l0eT0iLjM1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDcxMDE0IiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIGZpbGw9InVybCgjYmcpIi8+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNzc4NDhhIiBzdHJva2Utb3BhY2l0eT0iLjUiIHN0cm9rZS13aWR0aD0iMiIgdHJhbnNmb3JtPSJyb3RhdGUoLTggNjAwIDM2MCkiPjxlbGxpcHNlIGN4PSI2MDAiIGN5PSIzNjAiIHJ4PSIxMjAiIHJ5PSI1NSIvPjxlbGxpcHNlIGN4PSI2MDAiIGN5PSIzNjAiIHJ4PSIyMDUiIHJ5PSI5MCIvPjxlbGxpcHNlIGN4PSI2MDAiIGN5PSIzNjAiIHJ4PSIyOTUiIHJ5PSIxMjUiLz48ZWxsaXBzZSBjeD0iNjAwIiBjeT0iMzYwIiByeD0iMzkwIiByeT0iMTYwIi8+PC9nPjxjaXJjbGUgY3g9IjYwMCIgY3k9IjM2MCIgcj0iNTgiIGZpbGw9InVybCgjY29yZSkiLz48ZyBmaWxsPSIjZGZlNGU2Ij48Y2lyY2xlIGN4PSIzNjAiIGN5PSIzMTUiIHI9IjciLz48Y2lyY2xlIGN4PSI4MTUiIGN5PSIzMDUiIHI9IjYiLz48Y2lyY2xlIGN4PSI3MjAiIGN5PSI0NDgiIHI9IjUiLz48Y2lyY2xlIGN4PSI0NDgiIGN5PSI0MzAiIHI9IjQiLz48L2c+PHRleHQgeD0iNjAwIiB5PSI2NTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCxIZWx2ZXRpY2Esc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNSIgbGV0dGVyLXNwYWNpbmc9IjgiIGZpbGw9IiNjN2NmZDIiPlJFQUNUSU9OPC90ZXh0Pjx0ZXh0IHg9IjYwMCIgeT0iNjg4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjUiIGxldHRlci1zcGFjaW5nPSI4IiBmaWxsPSIjYzdjZmQyIj5CRUZPUkUgQUNUSU9OPC90ZXh0Pjwvc3ZnPg==";
const REPEAT_SVG = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDgwMCI+PGRlZnM+PHJhZGlhbEdyYWRpZW50IGlkPSJiZyI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMTIxZjI1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDcxMDE0Ii8+PC9yYWRpYWxHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgaWQ9ImNvcmUiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmZiIvPjxzdG9wIG9mZnNldD0iLjEzIiBzdG9wLWNvbG9yPSIjY2VkN2RhIi8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iIzU0NjE2OCIgc3RvcC1vcGFjaXR5PSIuMyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzA3MTAxNCIgc3RvcC1vcGFjaXR5PSIwIi8+PC9yYWRpYWxHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iODAwIiBmaWxsPSJ1cmwoI2JnKSIvPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzhhOTY5YiIgc3Ryb2tlLW9wYWNpdHk9Ii40NyIgc3Ryb2tlLXdpZHRoPSIyIiB0cmFuc2Zvcm09InJvdGF0ZSgtMTQgNjAwIDM2NSkiPjxlbGxpcHNlIGN4PSI2MDAiIGN5PSIzNjUiIHJ4PSIxMzAiIHJ5PSI2MiIvPjxlbGxpcHNlIGN4PSI2MDAiIGN5PSIzNjUiIHJ4PSIyMjAiIHJ5PSIxMDIiLz48ZWxsaXBzZSBjeD0iNjAwIiBjeT0iMzY1IiByeD0iMzIwIiByeT0iMTQ1Ii8+PGVsbGlwc2UgY3g9IjYwMCIgY3k9IjM2NSIgcng9IjQyNSIgcnk9IjE5MCIvPjwvZz48Y2lyY2xlIGN4PSI2MDAiIGN5PSIzNjUiIHI9IjYyIiBmaWxsPSJ1cmwoI2NvcmUpIi8+PGcgZmlsbD0iI2UxZTZlOCI+PGNpcmNsZSBjeD0iMzA5IiBjeT0iMzAwIiByPSI3Ii8+PGNpcmNsZSBjeD0iNDU1IiBjeT0iMjQ1IiByPSI1Ii8+PGNpcmNsZSBjeD0iNzkwIiBjeT0iMjcwIiByPSI2Ii8+PGNpcmNsZSBjeD0iODkwIiBjeT0iNDA1IiByPSI1Ii8+PGNpcmNsZSBjeD0iNjkwIiBjeT0iNTAwIiByPSI0Ii8+PC9nPjx0ZXh0IHg9IjYwMCIgeT0iNjU1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGxldHRlci1zcGFjaW5nPSI3IiBmaWxsPSIjYzRjY2QwIj5TQU1FIFNURVBTPC90ZXh0Pjx0ZXh0IHg9IjYwMCIgeT0iNjkyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGxldHRlci1zcGFjaW5nPSI3IiBmaWxsPSIjYzRjY2QwIj5BIEhJR0hFUiBZT1U8L3RleHQ+PC9zdmc+";

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

        @keyframes stepVisualIn { to { opacity: 1; } }

        .stepByStepNativeVisuals [data-step-visual="development"] {
          background-image: url("data:image/svg+xml;base64,${IKIGAI_SVG}") !important;
          background-repeat: no-repeat !important;
          background-size: cover !important;
          background-position: center !important;
        }
        .stepByStepNativeVisuals [data-step-visual="maturity"] {
          background-image: url("data:image/svg+xml;base64,${MATURITY_SVG}") !important;
          background-repeat: no-repeat !important;
          background-size: cover !important;
          background-position: center !important;
        }
        .stepByStepNativeVisuals [data-step-visual="repeat"] {
          background-image: url("data:image/svg+xml;base64,${REPEAT_SVG}") !important;
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

        .stepByStepNativeVisuals [class*="visualLabel"] { z-index: 4 !important; }

        @media (prefers-reduced-motion: reduce) {
          .stepByStepNativeVisuals .stepByStepDeferredImage { animation: none; opacity: 1; }
        }
      `}</style>
      <StepByStepVisualLoader />
      {children}
    </div>
  );
}
