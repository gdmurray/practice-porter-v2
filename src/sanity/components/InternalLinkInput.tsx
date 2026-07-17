import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { set, unset, useClient, useFormValue } from "sanity";
import type { StringInputProps } from "sanity";
import { Autocomplete, Card, Flex, Text } from "@sanity/ui";

interface PageOption {
  value: string;
  title: string;
}

const API_VERSION = "2026-03-10";

const PAGE_LIST_QUERY = `*[_type == "page" && defined(slug.current)]{
  "slug": slug.current,
  title
} | order(slug asc)`;

export function InternalLinkInput(props: StringInputProps) {
  const { value, onChange, path, renderDefault } = props;
  const id = useId();
  const client = useClient({ apiVersion: API_VERSION });

  // `href` and `ctaType` are sibling fields on the same `cta` object.
  const ctaType = useFormValue([...path.slice(0, -1), "ctaType"]) as
    | string
    | undefined;
  const isInternal = ctaType === "internal";

  const [pages, setPages] = useState<PageOption[]>([]);

  useEffect(() => {
    if (!isInternal) return;
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
  }, [client, isInternal]);

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

  // External links / Book Meeting / anything else keep the plain string input.
  if (!isInternal) return renderDefault(props);

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
