import { useCallback, useId, useMemo } from "react";
import { set, unset } from "sanity";
import type { StringInputProps } from "sanity";
import { Autocomplete, Card, Flex, Text } from "@sanity/ui";
import { getIcon } from "@/lib/icons";
import { ICON_NAMES } from "@/lib/iconNames";

interface IconOption {
  value: string;
}

const OPTIONS: IconOption[] = ICON_NAMES.map((name) => ({ value: name }));

export function IconPickerInput(props: StringInputProps) {
  const { value, onChange } = props;
  const id = useId();

  const handleChange = useCallback(
    (nextValue: string) => {
      onChange(nextValue ? set(nextValue) : unset());
    },
    [onChange]
  );

  const filterOption = useCallback(
    (query: string, option: IconOption) => option.value.toLowerCase().includes(query.toLowerCase()),
    []
  );

  const renderOption = useCallback(
    (option: IconOption) => {
      const Icon = getIcon(option.value);
      const selected = option.value === value;
      return (
        <Card as="button" padding={2} radius={2} tone={selected ? "primary" : undefined}>
          <Flex align="center" gap={3}>
            <Flex align="center" justify="center" style={{ width: 20, flex: "none" }}>
              <Icon size={16} />
            </Flex>
            <Text size={1}>{option.value}</Text>
          </Flex>
        </Card>
      );
    },
    [value]
  );

  const selectedIcon = useMemo(() => (value ? getIcon(value) : undefined), [value]);

  return (
    <Autocomplete
      id={id}
      icon={selectedIcon}
      options={OPTIONS}
      value={value ?? ""}
      placeholder="Search icons…"
      openButton
      openOnFocus
      renderOption={renderOption}
      filterOption={filterOption}
      onChange={handleChange}
    />
  );
}
