const HERO_VISUAL = "https://d2jqrm6oza8nb6.cloudfront.net/datasets/4a6116d8-ec1e-4b3d-87b9-1e0c9dde65b6.jpg?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiY2E1ZDU0ZDA1YzY3ZTYwZiIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTM3MDE5Mn0.jMOkPMbsI0bQFUylBn1-_ROjS16WSioZqE6ZSel6KAw";
const DEVELOPMENT_VISUAL = "https://d2jqrm6oza8nb6.cloudfront.net/datasets/0a14da90-11fc-4670-93ae-2664e2c82aae.jpg?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiMGI2MjZiOTY0YTQ1MzZmNyIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTMxMzA0Nn0.m1aZYUVFVdMr-SgRyjqHzBzarZb4linXMseLRSjDKD4";
const SETUP_VISUAL = "https://d2jqrm6oza8nb6.cloudfront.net/datasets/36200c9e-8099-4f59-9f49-cdd2e55fb37e.jpg?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiYzAxNGRjMWIyNmUwNmJlZCIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTM4OTMzOX0.JN4RxeaJzrUqS4KWGx1AdWSF5TlGe_6EainDrH-2Flg";
const MATURITY_VISUAL = "https://d2jqrm6oza8nb6.cloudfront.net/datasets/f0083827-a037-4cf0-9b39-7866a317fb20.jpg?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiYzBkMTg0ZWI3NGViNzFiMSIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTMxMTcyM30.7zgyjvdAgs5Vk9BDflNF7TJ3qUV_6Y6x7391AwyV8Bc";
const PAIN_VISUAL = "https://dnznrvs05pmza.cloudfront.net/magnific_precision_upscaler_v2/e08ff0ed-78e7-441f-945d-5bea7b0d0a9b/e08ff0ed-78e7-441f-945d-5bea7b0d0a9b.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZmVkNjU1MTgxOGI1YTU4NyIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTM4NTc1Mn0.darnQrCmtk1Y5qVj_MBYrErwFtES1yehublZwbTD1No";
const EXPANSION_VISUAL = "https://d2jqrm6oza8nb6.cloudfront.net/datasets/34bb91ce-69e9-4275-a919-03e3650f4821.jpg?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiNjJkNjM0YTRkOTFmOTJiNCIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTM2MDU0OH0.EoXddmre44AgpdnweSJqyNjkFBZYhxjMect4ettHKtY";
const AGING_VISUAL = "https://d2jqrm6oza8nb6.cloudfront.net/datasets/c2b181b3-001a-4715-b5b6-5c4ff0d199e1.jpg?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiMmYzZDUxZTFhMTFjODRmNiIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTM0NDYwOX0.-5_AePwtPFjiFzLgjatcriIocpwjD2o0EaAOzr5l2Rk";
const REPEAT_VISUAL = "https://d2jqrm6oza8nb6.cloudfront.net/datasets/91797f2a-49be-44e7-b070-2fb273517dd0.jpg?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiM2U0NmMzOGFmYTNhYjY5YyIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTMzMzc3MH0.5ff46WGJSkRgOz6e_c32e_-2xJsUgijEswsBhnPr5jY";

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
