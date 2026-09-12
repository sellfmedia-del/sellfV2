const CLEAN_VISUAL_SPRITE = "https://d2jqrm6oza8nb6.cloudfront.net/datasets/5f427e3f-7720-4246-8932-598b65ab3581.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZTU3MzE5NGZjNmE4Y2YwNiIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTMxNzU4M30.sjB8oWEy8Wnam2XG4-reIDhzGn98We18XG_nA7wt4zs";

export default function StepByStepLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="stepByStepCleanVisuals">
      <style>{`
        .stepByStepCleanVisuals [class*="heroVisual"],
        .stepByStepCleanVisuals [class*="stage"] > [class*="visual"] {
          background-image: url("${CLEAN_VISUAL_SPRITE}") !important;
        }
      `}</style>
      {children}
    </div>
  );
}
