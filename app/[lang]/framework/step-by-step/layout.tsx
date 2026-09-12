const HERO_VISUAL = "https://dnznrvs05pmza.cloudfront.net/magnific_precision_upscaler_v2/7025a255-7d53-4b90-8848-63a6cea4fdb8/7025a255-7d53-4b90-8848-63a6cea4fdb8.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiOWYzOGVjZTcxZGE2YTNhNiIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTMzNjgwN30.-GAF16jU234lwLI4cNZJ01HK1s2PaFa8v--S1xOarhM";
const DEVELOPMENT_VISUAL = "https://d2jqrm6oza8nb6.cloudfront.net/datasets/66684856-f7b3-42fe-8c84-51a333d19977.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiMWNlZjkxZjYwOTA0MjE3NCIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTMyNDkxOH0.OTgBN-izMJiK3PN2z6qpraAsO8gacET5kRR5B9afgWM";
const SETUP_VISUAL = "https://dnznrvs05pmza.cloudfront.net/magnific_precision_upscaler_v2/b8823618-a090-4e98-ae61-c587a7520f1c/b8823618-a090-4e98-ae61-c587a7520f1c.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiYzBkMzI4YTBjYWQ1YjFhZiIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTMzMjc2OH0.04saSd3BRu4sEcgrSozh0UhB32Vb3xE76RCkezvFAp4";
const MATURITY_VISUAL = "https://d2jqrm6oza8nb6.cloudfront.net/datasets/73b8c793-9698-4636-b3f5-f357c23da172.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiNjUyZTVhMmFkMzFmM2EwMyIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTM3OTc1NH0.dQdRpDvI7SpWsYi-kopBIUwi0gfgHGSlsmB3st1bVHw";
const PAIN_VISUAL = "https://dnznrvs05pmza.cloudfront.net/magnific_precision_upscaler_v2/e08ff0ed-78e7-441f-945d-5bea7b0d0a9b/e08ff0ed-78e7-441f-945d-5bea7b0d0a9b.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZmVkNjU1MTgxOGI1YTU4NyIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTM4NTc1Mn0.darnQrCmtk1Y5qVj_MBYrErwFtES1yehublZwbTD1No";
const EXPANSION_VISUAL = "https://d2jqrm6oza8nb6.cloudfront.net/datasets/6ce8b096-f07d-41af-a697-2b5502515133.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiNzQwOWE5MzgxOWVmZmM0OSIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTM2OTQwMH0.BFfa-8FBVfte5rFBjx2kMsjS2UN3gLxwQ38dPNGruC4";
const AGING_VISUAL = "https://d2jqrm6oza8nb6.cloudfront.net/datasets/ec8fb010-6207-419e-83c6-6ee3f4214c93.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiOTA5Y2Q4ODhlYzQwNWFiZiIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTM0Mzc1Mn0.D0qc6fmr36ZMRM2yxCmbHX7W4Wcql4xJYIhGJya7cfE";
const REPEAT_VISUAL = "https://d2jqrm6oza8nb6.cloudfront.net/datasets/4ba430a9-4713-4e91-8ea2-f4211f5ef87a.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiMjMzOTIzOTdmMjIyNjUyOSIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTMxNTIyM30._zTN6WVPBuXga2uBXI-ZHySXSOY5Z722z9Acr8aoFWU";

export default function StepByStepLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="stepByStepNativeVisuals">
      <style>{`
        .stepByStepNativeVisuals [class*="heroVisual"],
        .stepByStepNativeVisuals [class*="stage"] > [class*="visual"] {
          background-repeat: no-repeat !important;
          background-size: cover !important;
          background-position: center !important;
          border-left: 0 !important;
          border-right: 0 !important;
        }

        .stepByStepNativeVisuals [class*="heroVisual"] {
          background-image: url("${HERO_VISUAL}") !important;
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 13%, #000 96%, transparent 100%) !important;
          mask-image: linear-gradient(90deg, transparent 0%, #000 13%, #000 96%, transparent 100%) !important;
        }

        .stepByStepNativeVisuals [class*="stage"]:nth-child(1) > [class*="visual"] {
          background-image: url("${DEVELOPMENT_VISUAL}") !important;
        }
        .stepByStepNativeVisuals [class*="stage"]:nth-child(2) > [class*="visual"] {
          background-image: url("${SETUP_VISUAL}") !important;
        }
        .stepByStepNativeVisuals [class*="stage"]:nth-child(3) > [class*="visual"] {
          background-image: url("${MATURITY_VISUAL}") !important;
        }
        .stepByStepNativeVisuals [class*="stage"]:nth-child(4) > [class*="visual"] {
          background-image: url("${PAIN_VISUAL}") !important;
        }
        .stepByStepNativeVisuals [class*="stage"]:nth-child(5) > [class*="visual"] {
          background-image: url("${EXPANSION_VISUAL}") !important;
        }
        .stepByStepNativeVisuals [class*="stage"]:nth-child(6) > [class*="visual"] {
          background-image: url("${AGING_VISUAL}") !important;
        }
        .stepByStepNativeVisuals [class*="stage"]:nth-child(7) > [class*="visual"] {
          background-image: url("${REPEAT_VISUAL}") !important;
        }

        .stepByStepNativeVisuals [class*="stage"] > [class*="visual"] {
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 7%, #000 93%, transparent 100%) !important;
          mask-image: linear-gradient(90deg, transparent 0%, #000 7%, #000 93%, transparent 100%) !important;
        }

        .stepByStepNativeVisuals [class*="heroVisual"]::after,
        .stepByStepNativeVisuals [class*="stage"] > [class*="visual"]::after {
          background:
            linear-gradient(90deg, rgba(7,16,20,.60) 0%, rgba(7,16,20,.16) 9%, transparent 24%, transparent 78%, rgba(7,16,20,.28) 94%, rgba(7,16,20,.56) 100%),
            linear-gradient(180deg, rgba(7,16,20,.34) 0%, transparent 13%, transparent 87%, rgba(7,16,20,.38) 100%) !important;
        }

        .stepByStepNativeVisuals [class*="stage"] > [class*="visual"] {
          box-shadow:
            inset 0 26px 42px -34px #071014,
            inset 0 -26px 42px -34px #071014;
        }
      `}</style>
      {children}
    </div>
  );
}
