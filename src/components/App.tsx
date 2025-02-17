import {
  createEffect,
  createSignal,
  For,
  Show,
  type JSXElement,
} from "solid-js";
import { ResultCard } from "./ResultCard";

export const App = () => {
  const placeholder = "example.com";
  const [value, setValue] = createSignal("");
  const presentedValue = () =>
    value().length > 0 ? value().replace(/^www\./, "") : placeholder;

  const checkCanonical = () => true;
  const isCanonical = () => value().startsWith("www.");

  const isValid = () => {
    const parts = value()?.split(".");
    return parts.length > 1 && parts.every((part) => part.length > 0);
  };

  return (
    <div class="p-4 text-neutral-900 flex flex-col min-h-dvh gap-6 max-w-xl m-auto">
      <header class="grid gap-2 cursor-default">
        <h1 class="text-3xl font-bold">Redirect Validator</h1>
        <p>Quickly check that common redirects are working as expected.</p>
      </header>
      <form>
        <div class="grid gap-2">
          <label for="destination" class="font-semibold text-lg">
            Destination
          </label>
          <div
            class="grid grid-cols-[1fr_max-content] border rounded-lg border-neutral-300
            outline-neutral-900 has-[input:focus]:border-neutral-900  has-[input:focus]:outline-1"
          >
            <input
              id="destination"
              name="destination"
              placeholder={placeholder}
              value={value()}
              onInput={(event) => setValue(event.target.value)}
              onFocus={(event) => event.target.select()}
              class="py-3 px-3 placeholder-neutral-400 outline-none"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="none"
              spellcheck={false}
              inputMode="url"
            />
            <button
              disabled={!isValid()}
              class="
                px-3 m-1.5 bg-[#007AFF] font-medium rounded cursor-pointer touch-manipulation text-white text-sm transition-opacity duration-100
                disabled:cursor-default disabled:bg-neutral-200 disabled:text-neutral-400
                not-disabled:active:opacity-75
              "
            >
              Validate →
            </button>
          </div>
        </div>
      </form>
      <div class="grid gap-2">
        <h2 class="font-semibold text-lg cursor-default">Results</h2>
        <ResultCard
          title="Protocol redirect"
          from={[
            { value: "http", emphasize: true },
            { value: "://" },
            { value: isCanonical() ? "www." : "" },
            { value: presentedValue() },
          ]}
          to={[
            { value: "https", emphasize: true },
            { value: "://" },
            { value: isCanonical() ? "www." : "" },
            { value: presentedValue() },
          ]}
        />
        <Show when={checkCanonical}>
          <ResultCard
            title="Canonical redirect"
            from={[
              { value: "https://" },
              { value: isCanonical() ? "" : "www", emphasize: true },
              { value: isCanonical() ? "" : "." },
              { value: presentedValue() },
            ]}
            to={[
              { value: "https://" },
              { value: isCanonical() ? "www" : "", emphasize: true },
              { value: isCanonical() ? "." : "" },
              { value: presentedValue() },
            ]}
          />
          <ResultCard
            title="Combination redirect"
            from={[
              { value: "http", emphasize: true },
              { value: "://" },
              { value: isCanonical() ? "" : "www", emphasize: true },
              { value: isCanonical() ? "" : "." },
              { value: presentedValue() },
            ]}
            to={[
              { value: "https", emphasize: true },
              { value: "://" },
              { value: isCanonical() ? "www" : "", emphasize: true },
              { value: isCanonical() ? "." : "" },
              { value: presentedValue() },
            ]}
          />
        </Show>
      </div>
      <div class="grow flex items-end justify-center text-center">
        <footer class="text-sm text-neutral-500 underline-offset-3">
          <ul>
            <li class="inline">
              Fork on{" "}
              <a
                href="https://github.com/nickbreaton/redirects.nickbreaton.com"
                target="_blank"
                class="underline"
              >
                GitHub
              </a>
            </li>
            &nbsp;•&nbsp;
            <li class="inline">
              Created by{" "}
              <a
                href="https://nickbreaton.com"
                target="_blank"
                class="underline"
              >
                Nick Breaton
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
};
