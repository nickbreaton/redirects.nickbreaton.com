import { For } from "solid-js";
import { TextFormatter, type FormattedText } from "./TextFormatter";

const filter = (parts: FormattedText[]) => parts.filter((part) => part.value);

export const ResultCard = (props: {
  title: string;
  from: FormattedText[];
  to: FormattedText[];
}) => {
  return (
    <article class="border rounded-lg border-neutral-300 py-2 px-3">
      <h3>{props.title}</h3>
      <div>
        <p class="inline">
          <For each={filter(props.from)}>
            {(part) => <TextFormatter {...part} />}
          </For>
        </p>
        <span> → </span>
        <p class="inline">
          <For each={filter(props.to)}>
            {(part) => <TextFormatter {...part} />}
          </For>
        </p>
      </div>
    </article>
  );
};
