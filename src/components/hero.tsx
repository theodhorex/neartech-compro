import { PrismStage } from "@/components/prism/prism-stage";
import { HeroNav } from "@/components/hero/hero-nav";
import { HeroTabs } from "@/components/hero/hero-tabs";

export function Hero() {
  return (
    <section className="hero" aria-label="Hero NearTech">
      <PrismStage />
      <HeroNav />
      <div className="copy" data-hero-copy>
        <h1 className="wordmark rise">neartech</h1>
        <p className="lede rise">
          <span>Teknologi yang dekat,</span>
          <span>untuk bisnis yang tumbuh.</span>
        </p>
        <HeroTabs />
      </div>
    </section>
  );
}
