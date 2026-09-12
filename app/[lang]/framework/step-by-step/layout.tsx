const PHOTO_SPRITE = "/images/framework/step-by-step/visual-sprite.webp";
const HERO_VISUAL = "https://dnznrvs05pmza.cloudfront.net/magnific_precision_upscaler_v2/7025a255-7d53-4b90-8848-63a6cea4fdb8/7025a255-7d53-4b90-8848-63a6cea4fdb8.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiOWYzOGVjZTcxZGE2YTNhNiIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTMzNjgwN30.-GAF16jU234lwLI4cNZJ01HK1s2PaFa8v--S1xOarhM";
const PAIN_VISUAL = "https://dnznrvs05pmza.cloudfront.net/magnific_precision_upscaler_v2/e08ff0ed-78e7-441f-945d-5bea7b0d0a9b/e08ff0ed-78e7-441f-945d-5bea7b0d0a9b.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZmVkNjU1MTgxOGI1YTU4NyIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTM4NTc1Mn0.darnQrCmtk1Y5qVj_MBYrErwFtES1yehublZwbTD1No";
const EXPANSION_VISUAL = "https://d2jqrm6oza8nb6.cloudfront.net/datasets/6ce8b096-f07d-41af-a697-2b5502515133.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiNzQwOWE5MzgxOWVmZmM0OSIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTM2OTQwMH0.BFfa-8FBVfte5rFBjx2kMsjS2UN3gLxwQ38dPNGruC4";
const AGING_VISUAL = "https://d2jqrm6oza8nb6.cloudfront.net/datasets/ec8fb010-6207-419e-83c6-6ee3f4214c93.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiOTA5Y2Q4ODhlYzQwNWFiZiIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTM0Mzc1Mn0.D0qc6fmr36ZMRM2yxCmbHX7W4Wcql4xJYIhGJya7cfE";

export default function StepByStepLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="stepByStepNativeVisuals">
      <style>{`
        .stepByStepNativeVisuals [class*="heroVisual"],
        .stepByStepNativeVisuals [class*="stages"] > [class*="stage"] > [class*="visual"] {
          background-repeat: no-repeat !important;
          border-left: 0 !important;
          border-right: 0 !important;
          background-color: #071014 !important;
        }

        .stepByStepNativeVisuals [class*="heroVisual"] {
          background-image: url("${HERO_VISUAL}"), url("${PHOTO_SPRITE}") !important;
          background-size: cover, auto 800% !important;
          background-position: center, center 0% !important;
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 13%, #000 96%, transparent 100%) !important;
          mask-image: linear-gradient(90deg, transparent 0%, #000 13%, #000 96%, transparent 100%) !important;
        }

        .stepByStepNativeVisuals [class*="stages"] > [class*="stage"]:nth-child(1) > [class*="visual"] {
          background-image: url("/images/framework/step-by-step/hd/development.svg") !important;
          background-size: cover !important;
          background-position: center !important;
        }

        .stepByStepNativeVisuals [class*="stages"] > [class*="stage"]:nth-child(2) > [class*="visual"] {
          background-image: url("/images/framework/step-by-step/hd/setup.svg"), url("${PHOTO_SPRITE}") !important;
          background-size: cover, auto 800% !important;
          background-position: center, center 28.5714% !important;
        }

        .stepByStepNativeVisuals [class*="stages"] > [class*="stage"]:nth-child(3) > [class*="visual"] {
          background-image: url("/images/framework/step-by-step/hd/maturity.svg") !important;
          background-size: cover !important;
          background-position: center !important;
        }

        .stepByStepNativeVisuals [class*="stages"] > [class*="stage"]:nth-child(4) > [class*="visual"] {
          background-image: url("${PAIN_VISUAL}"), url("${PHOTO_SPRITE}") !important;
          background-size: cover, auto 800% !important;
          background-position: center, center 57.1429% !important;
        }

        .stepByStepNativeVisuals [class*="stages"] > [class*="stage"]:nth-child(5) > [class*="visual"] {
          background-image: url("${EXPANSION_VISUAL}"), url("${PHOTO_SPRITE}") !important;
          background-size: cover, auto 800% !important;
          background-position: center, center 71.4286% !important;
        }

        .stepByStepNativeVisuals [class*="stages"] > [class*="stage"]:nth-child(6) > [class*="visual"] {
          background-image: url("${AGING_VISUAL}"), url("${PHOTO_SPRITE}") !important;
          background-size: cover, auto 800% !important;
          background-position: center, center 85.7143% !important;
        }

        .stepByStepNativeVisuals [class*="stages"] > [class*="stage"]:nth-child(7) > [class*="visual"] {
          background-image: url("/images/framework/step-by-step/hd/repeat.svg") !important;
          background-size: cover !important;
          background-position: center !important;
        }

        .stepByStepNativeVisuals [class*="stages"] > [class*="stage"] > [class*="visual"] {
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 7%, #000 93%, transparent 100%) !important;
          mask-image: linear-gradient(90deg, transparent 0%, #000 7%, #000 93%, transparent 100%) !important;
          box-shadow:
            inset 0 26px 42px -34px #071014,
            inset 0 -26px 42px -34px #071014;
        }

        .stepByStepNativeVisuals [class*="heroVisual"]::after,
        .stepByStepNativeVisuals [class*="stages"] > [class*="stage"] > [class*="visual"]::after {
          z-index: 2 !important;
          background:
            linear-gradient(90deg, rgba(7,16,20,.44) 0%, rgba(7,16,20,.10) 9%, transparent 24%, transparent 80%, rgba(7,16,20,.18) 94%, rgba(7,16,20,.34) 100%),
            linear-gradient(180deg, rgba(7,16,20,.20) 0%, transparent 13%, transparent 87%, rgba(7,16,20,.25) 100%) !important;
        }

        .stepByStepNativeVisuals [class*="visualLabel"] { z-index: 4 !important; }
      `}</style>
      {children}
    </div>
  );
}
