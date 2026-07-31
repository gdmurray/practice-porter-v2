import type { ComponentType, ReactNode } from "react";
import { ComposeIcon, DocumentsIcon, ComponentIcon, CogIcon } from "@sanity/icons";
import { Box, Card, Flex, Heading, Stack, Text } from "@sanity/ui";
import { useCurrentUser } from "sanity";
import { IntentLink } from "sanity/router";

function GuideSection({
  icon: Icon,
  title,
  body,
  href,
  linkLabel,
}: {
  icon: ComponentType;
  title: string;
  body: ReactNode;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <Stack space={3}>
      <Flex align="center" gap={2}>
        <Text size={2}>
          <Icon />
        </Text>
        <Heading size={1}>{title}</Heading>
      </Flex>
      <Text size={1}>{body}</Text>
      {href && linkLabel && (
        <Text size={1}>
          <a href={href}>{linkLabel} →</a>
        </Text>
      )}
    </Stack>
  );
}

export function EditorGuide() {
  const user = useCurrentUser();

  return (
    <Flex align="center" justify="center" height="fill" padding={4}>
      <Card padding={5} radius={3} shadow={1} style={{ maxWidth: 640 }}>
        <Stack space={5}>
          <Stack space={3}>
            <Heading size={3}>
              Welcome{user?.name ? `, ${user.name}` : ""}
            </Heading>
            <Text muted>Quick guide to editing Practice Porter content.</Text>
          </Stack>

          <GuideSection
            icon={ComposeIcon}
            title="Visual editor"
            body={
              <>
                Open the <strong>Presentation</strong> tool in the top nav to
                preview the live site and click content to edit in context.
              </>
            }
            href="/studio/presentation"
            linkLabel="Open Presentation"
          />

          <GuideSection
            icon={DocumentsIcon}
            title="Pages"
            body={
              <>
                Under <strong>Page</strong> in the sidebar, edit site pages.
                The homepage is the page whose slug is <code>home</code>.
              </>
            }
            href="/studio/structure/content;page"
            linkLabel="Browse pages"
          />

          <GuideSection
            icon={CogIcon}
            title="Site settings"
            body={
              <>
                <strong>Site Settings</strong> holds navigation, footer links,
                and global SEO defaults used across the site.
              </>
            }
            href="/studio/structure/content;siteSettings"
            linkLabel="Open Site Settings"
          />

          <GuideSection
            icon={ComponentIcon}
            title="Design system"
            body={
              <>
                The <strong>Design System</strong> tool opens Storybook with UI
                components and page module patterns. Use it to see what each
                module looks like before building page content.
              </>
            }
            href="/studio/design-system"
            linkLabel="Open Design System"
          />

          <Box paddingTop={2}>
            <Text size={1} muted>
              New page? Use the + menu under <strong>Page</strong>, or{" "}
              <IntentLink intent="create" params={{ type: "page" }}>
                create one here
              </IntentLink>
              .
            </Text>
          </Box>
        </Stack>
      </Card>
    </Flex>
  );
}
