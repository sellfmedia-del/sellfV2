const MOCKUP_VISUAL_SOURCE = "https://d2jqrm6oza8nb6.cloudfront.net/datasets/0bf4e4d5-ab99-4310-9638-d9fd6af75084.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiYjc4NjE1MWE4N2JkMzIyMyIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTMyNDk1NH0.hBQNU4euugEExhfa-qhrGZlD590hIw6Pj4mbnzYPiYw";

export default function StepByStepLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="stepByStepMockupVisuals">
      <style>{`
        .stepByStepMockupVisuals [class*="heroVisual"],
        .stepByStepMockupVisuals [class*="stage"] > [class*="visual"] {
          background-image: url("${MOCKUP_VISUAL_SOURCE}") !important;
          background-repeat: no-repeat !important;
          background-size: auto 535% !important;
          background-color: #071014 !important;
        }

        .stepByStepMockupVisuals [class*="heroVisual"] {
          background-position: 82% 5% !important;
        }
        .stepByStepMockupVisuals [class*="stage"]:nth-child(1) > [class*="visual"] {
          background-position: 57% 21% !important;
        }
        .stepByStepMockupVisuals [class*="stage"]:nth-child(2) > [class*="visual"] {
          background-position: 55% 32% !important;
        }
        .stepByStepMockupVisuals [class*="stage"]:nth-child(3) > [class*="visual"] {
          background-position: 54% 43% !important;
        }
        .stepByStepMockupVisuals [class*="stage"]:nth-child(4) > [class*="visual"] {
          background-position: 72% 53% !important;
        }
        .stepByStepMockupVisuals [class*="stage"]:nth-child(5) > [class*="visual"] {
          background-position: 58% 64% !important;
        }
        .stepByStepMockupVisuals [class*="stage"]:nth-child(6) > [class*="visual"] {
          background-position: 72% 75% !important;
        }
        .stepByStepMockupVisuals [class*="stage"]:nth-child(7) > [class*="visual"] {
          background-position: 57% 86% !important;
        }
      `}</style>
      {children}
    </div>
  );
}
