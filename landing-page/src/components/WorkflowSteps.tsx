interface WorkflowStep {
  title: string;
  copy: string;
}

export function WorkflowSteps({ title, steps }: { title: string; steps: WorkflowStep[] }) {
  return (
    <section className="detail-section workflow-section" aria-labelledby="workflow-title">
      <div className="detail-heading">
        <p className="eyebrow">Step by step</p>
        <h2 id="workflow-title">{title}</h2>
      </div>
      <ol className="workflow-grid">
        {steps.map((step, index) => (
          <li key={step.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
