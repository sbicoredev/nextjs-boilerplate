import { Container } from "../container";

export const StatsSection = () => {
  return (
    <section className="py-16 md:py-32">
      <Container className="space-y-16">
        <div className="mx-auto max-w-xl space-y-6 text-center">
          <h2 className="font-medium text-4xl lg:text-5xl">Stats in numbers</h2>
          <p>
            Gemini is evolving to be more than just the models. It supports an entire to the APIs
            and platforms helping developers and businesses innovate.
          </p>
        </div>

        <div className="grid gap-12 divide-y *:text-center md:grid-cols-3 md:gap-2 md:divide-x md:divide-y-0">
          <div className="space-y-4 p-2">
            <div className="font-bold text-5xl">+1200</div>
            <p>Stars on GitHub</p>
          </div>
          <div className="space-y-4 p-2">
            <div className="font-bold text-5xl">22 Million</div>
            <p>Active Users</p>
          </div>
          <div className="space-y-4 p-2">
            <div className="font-bold text-5xl">+500</div>
            <p>Powered Apps</p>
          </div>
        </div>
      </Container>
    </section>
  );
};
