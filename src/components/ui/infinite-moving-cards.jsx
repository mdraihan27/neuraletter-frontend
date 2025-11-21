"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { DemoEmail } from "./landing/demo-email";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = false,
  className
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}>
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}>
        {/* demo email start  */}
        {titles.map((title, j) => (
          <DemoEmail key={j} title={title} updates={allUpdates[j]}></DemoEmail>
        ))}
        ;{/* demo email end  */}
      </ul>
    </div>
  );
};


const updates = [
  {
    heading: "Weight-sparse Transformers Have Interpretable Circuits",
    body: `Leo Gao et al. (arXiv, Nov 17 2025). This work introduces a
systematic approach to creating weight-sparse transformers
that reveal highly interpretable internal circuits. The
authors explore extreme sparsity in transformer architectures
by progressively pruning weights while preserving core
functional pathways. This pruning process exposes specialized
computational circuits that often align with conceptual
human-understandable functions.

The study demonstrates that sparsity does not simply reduce
redundancy but reorganizes representations into clearer
semantic units. However, performance tradeoffs emerge: while
interpretable circuits arise more clearly with heavy pruning,
the model’s accuracy degrades unless scale is increased. The
authors show that larger models maintain strong performance
even under extreme sparsity, suggesting that
sparsity-plus-scale leads to both interpretability and
capability. Potential applications include safety
interpretability research, automated circuit discovery, and
transparent LLM systems.`,
    link: "https://arxiv.org/abs/2511.13653?utm_source=chatgpt.com",
  },
  {
    heading: "MWSTM-ADRAN+: Hybrid DL for Climate Forecasting",
    body: `Shaheen M. S. Ahmed & Hakan H. Guneyli (arXiv, Nov 17 2025).
The paper proposes a hybrid modeling framework combining a
Multi-Mode Wavelet-Shifted Temporal Memory (MMWSTM) module
with an Anomaly Detection and Response Attention Network
(ADRAN+). The architecture features dual pathways: one models
evolution of climate regimes through wavelet-shifted memory
blocks, and the other detects anomalies using attention
amplification.

A specialized loss function, ExtremeWeatherLoss, penalizes
errors in rare climate events to increase forecasting
fidelity. The authors evaluate the system on long-term
temperature and extreme-weather datasets, where it outperforms
state-of-the-art baselines by capturing both global trends and
anomalous spikes. They also introduce novel time-series
augmentations to handle nonstationarity in climate signals.
This model is particularly effective for predicting heatwaves,
cold surges, and regional temperature deviations, offering
improved tools for climate risk analysis.`,
    link: "https://arxiv.org/abs/2511.13653?utm_source=chatgpt.com",
  },
  {
    heading:
      "Tab-PET: Graph-Based Positional Encodings for Tabular Transformers",
    body: `unze Leng et al. (arXiv, Nov 17, 2025) Tab-PET introduces a
new positional encoding method for tabular transformers by
incorporating structural knowledge from graphs representing
relationships among features. The authors propose both
association-based and causality-inspired graphs to inform how
tabular features are embedded for downstream tasks. This
approach addresses a longstanding limitation in tabular
transformers: unlike sequences or images, tabular data lacks
inherent positional order.

Experiments across 50 benchmark datasets show strong gains in
both classification and regression tasks. Tab-PET particularly
excels in settings with rich feature interactions, such as
healthcare diagnostics, financial risk modeling, and
scientific tabulation. The method is model-agnostic and can be
integrated into any transformer-based tabular encoder. By
enriching feature representations, Tab-PET improves
generalization, robustness to missing data, and cross-domain
transferability.`,
    link: "https://arxiv.org/abs/2511.13653?utm_source=chatgpt.com",
  },
];

const allUpdates = [updates, updates, updates]

const titles = ["Recent Advances in Deep Learning, Reinforcement Learning, NLP, and Computer Vision: Papers Published Recently", "Recent Advances in Deep Learning, Reinforcement Learning, NLP, and Computer Vision: Papers Published Recently", "Recent Advances in Deep Learning, Reinforcement Learning, NLP, and Computer Vision: Papers Published Recently"]

