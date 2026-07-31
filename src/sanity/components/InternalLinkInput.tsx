import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { set, unset, useClient, useFormValue } from "sanity";
import type { StringInputProps } from "sanity";
import { Autocomplete, Card, Flex, Text } from "@sanity/ui";
import { PAGE_LIST_QUERY, SANITY_API_VERSION } from "@/sanity/lib/internalHref";

interface PageOption {
  value: string;
  title: string;
}

export interface InternalLinkInputConfig {
  /** When set, autocomplete only shows when a sibling field matches `value`. */
  gateOnSibling?: {
    field: string;
    value: string;
  };
}

function InternalLinkInputBase(
  props: StringInputProps & { config?: InternalLinkInputConfig }
) {
  const { value, onChange, path, renderDefault, config } = props;
  const id = useId();
  const client = useClient({ apiVersion: SANITY_API_VERSION });

  const { gateOnSibling } = config ?? {};
  const siblingValue = useFormValue(
    gateOnSibling
      ? [...path.slice(0, -1), gateOnSibling.field]
      : ["__internalLinkInputUnused"]
  ) as string | undefined;
  const showAutocomplete =
    !gateOnSibling || siblingValue === gateOnSibling.value;

  const [pages, setPages] = useState<PageOption[]>([]);

  useEffect(() => {
    if (!showAutocomplete) return;

    let cancelled = false;
    client
      .fetch<{ slug: string; title: string | null }[]>(PAGE_LIST_QUERY)
      .then((results) => {
        if (cancelled) return;
        setPages(
          results.map(({ slug, title }) => ({
            value: slug === "home" ? "/" : `/${slug}`,
            title: title ?? slug,
          }))
        );
      })
      .catch(() => {
        if (!cancelled) setPages([]);
      });

    return () => {
      cancelled = true;
    };
  }, [client, showAutocomplete]);

  const options = useMemo(
    () =>
      pages.slice().sort((a, b) => {
        if (a.value === "/") return -1;
        if (b.value === "/") return 1;
        return a.value.localeCompare(b.value);
      }),
    [pages]
  );

  const handleChange = useCallback(
    (nextValue: string) => {
      onChange(nextValue ? set(nextValue) : unset());
    },
    [onChange]
  );

  const filterOption = useCallback(
    (query: string, option: PageOption) =>
      option.value.toLowerCase().includes(query.toLowerCase()) ||
      option.title.toLowerCase().includes(query.toLowerCase()),
    []
  );

  const renderOption = useCallback(
    (option: PageOption) => {
      const selected = option.value === value;
      return (
        <Card as="button" padding={2} radius={2} tone={selected ? "primary" : undefined}>
          <Flex direction="column" gap={1}>
            <Text size={1} weight="medium">
              {option.value}
            </Text>
            {option.title !== option.value && (
              <Text size={0} muted>
                {option.title}
              </Text>
            )}
          </Flex>
        </Card>
      );
    },
    [value]
  );

  if (!showAutocomplete) return renderDefault(props);

  return (
    <Autocomplete
      id={id}
      options={options}
      value={value ?? ""}
      placeholder="/practice-performance-report"
      openButton
      openOnFocus
      renderOption={renderOption}
      filterOption={filterOption}
      onChange={handleChange}
    />
  );
}

export function createInternalLinkInput(config: InternalLinkInputConfig = {}) {
  return function BoundInternalLinkInput(props: StringInputProps) {
    return <InternalLinkInputBase {...props} config={config} />;
  };
}

/** Page-slug autocomplete for nav/footer links and other always-internal href fields. */
export const InternalLinkInput = createInternalLinkInput();

/** CTA href input — autocomplete only when `ctaType` is `internal`. */
export const CtaInternalLinkInput = createInternalLinkInput({
  gateOnSibling: { field: "ctaType", value: "internal" },
});
