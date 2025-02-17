export type FormattedText = { value: string; emphasize?: true };

export const TextFormatter = (props: FormattedText) =>
  props.emphasize ? <strong>{props.value}</strong> : props.value;
